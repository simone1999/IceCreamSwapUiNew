import { z } from 'zod'
import { isKyc, isMod } from '../session'
import { publicProcedure, router } from '../trpc'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { prisma } from '../prisma'
import { Listed, Token } from '@icecreamswap/database'
import v2factoryAbi from '../../abi/v2factory.json'
import v2pairAbi from '../../abi/v2pair.json'
import { BigNumber, Contract, providers, utils } from "ethers";
import { ChainId, getChain } from "@icecreamswap/constants";
import { ICE, USD } from '@pancakeswap/tokens'
import { getAddress } from "ethers/lib/utils";
import { WETH9 } from "@pancakeswap/sdk";

export const tokenRouter = router({
  add: publicProcedure
    .input(
      z.object({
        tokenAddress: z.string(),
        tokenName: z.string(),
        tokenSymbol: z.string(),
        tokenDecimals: z.number(),
        chainId: z.number(),
        logo: z.string().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const tokenAddress = getAddress(input.tokenAddress) // checksum address
      const mod = isMod(ctx.session?.user)
      if (!input.logo) {
        throw new Error('MissingLogo')
      } else if (!ctx.session?.user) {
        throw new Error('MissingLogin')
      } else if (!isKyc(ctx.session.user)) {
        throw new Error('MissingKYC')
      } else if (await checkListed(tokenAddress, input.chainId)) {
        throw new Error('AlreadyListed')
      } else if (!mod && !checkDelegate(tokenAddress, ctx.session.user.wallet)) {
        throw new Error('MissingDelegation')
      } else if (!mod && !(await checkLiquidity(tokenAddress, input.chainId))) {
        throw new Error('InsufficientLiquidity')
      }

      const s3Client = new S3Client({})
      const binary = Buffer.from(input.logo, 'base64')
      await s3Client.send(
        new PutObjectCommand({
          Bucket: process.env.S3_BUCKET_NAME,
          Key: `token/${input.chainId}/${tokenAddress}.png`,
          Body: binary,
          ContentType: 'image/png',
          GrantRead: 'uri=http://acs.amazonaws.com/groups/global/AllUsers',
        }),
      )

      await prisma.token.create({
        data: {
          name: input.tokenName,
          symbol: input.tokenSymbol,
          address: tokenAddress,
          decimals: input.tokenDecimals,
          chainId: input.chainId,
          listed: Listed.DEFAULT_LIST,
          addedBy: {
            connect: {
              wallet: ctx.session.user.wallet,
            },
          },
        },
      })
    }),

  defaultList: publicProcedure.query(async () => {
    const tokens: (Token & { tags?: string[] })[] = await prisma.token.findMany({
      where: {
        listed: Listed.DEFAULT_LIST,
      },
    })
    const kycs = await prisma.delegation.findMany({
      where: {
        target: {
          in: tokens.map((token) => token.address),
          mode: 'insensitive',
        },
        status: 'MINTED',
      },
    })
    kycs.forEach((kyc) => {
      const token = tokens.find((t) => t.address.toLowerCase() === kyc.target.toLowerCase())
      if (token) {
        token.tags = token.tags || []
        token.tags.push('KYCed')
      }
    })
    const kycedTokens = tokens.filter(token => token.tags?.includes('KYCed'))
    const nonKycedTokens = tokens.filter(token => !(token.tags?.includes('KYCed')))
    const tokensSorted = kycedTokens.concat(nonKycedTokens)

    return {
      name: 'IceCreamSwap Default',
      timestamp: new Date().toISOString(),
      version: {
        major: 1,
        minor: 0,
        patch: 0,
      },
      tags: {},
      logoURI: 'https://icecreamswap.com/logo.png',
      keywords: ['icecreamswap', 'default'],
      tokens: tokensSorted.map((token) => ({
        name: token.name,
        symbol: token.symbol,
        address: token.address,
        chainId: token.chainId,
        decimals: token.decimals,
        logoURI: `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/token/${token.chainId}/${token.address}.png`,
        tags: token.tags || [],
      })),
    }
  }),
})

const checkListed = async (tokenAddress: string, chainId: number) => {
  const token = await prisma.token.findFirst({
    where: {
      address: {
        equals: tokenAddress,
        mode: 'insensitive',
      },
      chainId: {
        equals: chainId,
      },
    }
  })
  return !!token
}

const checkDelegate = async (tokenAddress: string, wallet: string) => {
  const kyc = await prisma.delegation.findFirst({
    where: {
      target: {
        equals: tokenAddress,
        mode: 'insensitive',
      },
      status: 'MINTED',
      source: {
        address: {
          equals: wallet,
          mode: 'insensitive',
        },
      },
    },
  })
  return !!kyc
}

const usdThreshold = 4000

const checkLiquidity = async (tokenAddress: string, chainId: number) => {
  const chain = getChain(chainId)
  if (!chain) {
    return false
  }
  const provider = new providers.JsonRpcProvider(chain.rpcUrls.default)

  const iceAddress = ICE[chainId].address
  const usdAddress = USD[chainId].address
  const wethAddress = WETH9[chainId].address

  const tokenIceLiquidity = await getPairLiquidity(provider, iceAddress, tokenAddress, chainId)
  const tokenWethLiquidity = await getPairLiquidity(provider, wethAddress, tokenAddress, chainId)
  const tokenUsdLiquidity = await getPairLiquidity(provider, usdAddress, tokenAddress, chainId)

  const summedLiquidity = tokenIceLiquidity * 2 + tokenWethLiquidity + tokenUsdLiquidity

  return summedLiquidity >= usdThreshold
}

const getPairLiquidity = async (provider: providers.JsonRpcProvider, baseAddress: string, quoteAddress: string, chainId: ChainId) => {
  const usdAddress = USD[chainId].address

  const baseQuoteAddress = await getPairAddress(quoteAddress, baseAddress, chainId)
  if (!baseQuoteAddress) {
    return 0
  }
  const baseQuotePair = new Contract(baseQuoteAddress, v2pairAbi, provider)

  let basePrice
  if (baseAddress.toLowerCase() !== usdAddress.toLowerCase()) {
    const baseUsdAddress = await getPairAddress(baseAddress, usdAddress, chainId)
    if (!baseUsdAddress) {
      return 0
    }
    const baseUsdPair = new Contract(baseUsdAddress, v2pairAbi, provider)

    basePrice = await getPairPrice(baseUsdPair, usdAddress)
  } else {
    basePrice = utils.parseUnits('1', 18)
  }

  if (!basePrice) {
    return 0
  }

  const baseQuoteReserves = await baseQuotePair.getReserves()
  let baseReserves
  if ((await baseQuotePair.token0()).toLowerCase() === baseAddress.toLowerCase()) {
    baseReserves = baseQuoteReserves[0]
  } else {
    baseReserves = baseQuoteReserves[1]
  }

  const baseValue = basePrice.mul(baseReserves).div(utils.parseUnits('1', 18))
  const liquidity = Number(utils.formatUnits(baseValue, 18)) * 2
  return liquidity
}

const getPairAddress = async (tokenA: string, tokenB: string, chainId: number): Promise<string|undefined> => {
  const chain = getChain(chainId)
  if (!chain || !chain.swap?.factoryAddress) {
    throw new Error('Invalid chainId')
  }
  const provider = new providers.JsonRpcProvider(chain.rpcUrls.default)
  const factory = new Contract(chain.swap?.factoryAddress, v2factoryAbi, provider)
  try {
    const pairAddress = await factory.getPair(tokenA, tokenB)
    if (pairAddress === "0x0000000000000000000000000000000000000000") {
      return undefined
    }
    return pairAddress
  } catch {
    return undefined
  }
}

const getPairPrice = async (pair: Contract, baseToken: string): Promise<BigNumber|undefined> => {
  const reserves = await pair.getReserves()
  const token0: string = await pair.token0()
  const token1: string = await pair.token1()
  if (token0.toLowerCase() === baseToken.toLowerCase()) {
    return utils.parseUnits('1', 18).mul(reserves[0]).div(reserves[1])
  }
  if (token1.toLowerCase() === baseToken.toLowerCase()) {
    return utils.parseUnits('1', 18).mul(reserves[1]).div(reserves[0])
  }
  return undefined
}
