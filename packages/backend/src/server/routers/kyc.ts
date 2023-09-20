/* eslint-disable no-await-in-loop */
/* eslint-disable no-loop-func */
import { z } from 'zod'
import { prisma } from '../prisma'
import { isKyc } from '../session'
import { sendTelegramMessage } from '../telegram'
import { publicProcedure, router } from '../trpc'
import { getChain } from '@icecreamswap/constants'
import { Contract, providers, Wallet, utils, BigNumber } from 'ethers'
import crypto from 'crypto'
import kycAbi from '../../abi/kyc.json'
import contractKycAbi from '../../abi/contractKyc.json'
import { getDeploymentUrl } from '../getDeploymentUrl'
import { solidityKeccak256 } from 'ethers/lib/utils'

const core = getChain(1116)!
const provider = new providers.JsonRpcProvider(core.rpcUrls.default as any)
export const kycRouter = router({
  delegate: publicProcedure
    .input(
      z.object({
        targetAddress: z.string(),
        sourceAddress: z.string(),
        chainId: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      if (!ctx.session?.user || !isKyc(ctx.session.user)) {
        throw new Error('Unauthorized')
      }
      const { targetAddress, sourceAddress, chainId } = input
      const chain = getChain(chainId)
      if (!chain) {
        throw new Error('Invalid chain')
      }
      if (
        await prisma.delegation.findFirst({
          where: {
            chainId,
            target: targetAddress,
            source: {
              address: sourceAddress.toLowerCase(),
            },
          },
        })
      ) {
        throw new Error('Delegation already exists')
      }
      await prisma.delegation.create({
        data: {
          chainId,
          target: targetAddress,
          source: {
            connect: {
              address: sourceAddress.toLowerCase(),
            },
          },
          status: 'PENDING',
        },
      })
      const explorerUrl = chain.blockExplorers?.default.url
      const encrypted = encrypt(JSON.stringify({ targetAddress, sourceAddress, chainId }))
      const baseUri = getDeploymentUrl()
      sendTelegramMessage(
        `New delegation request:
Target: [${targetAddress}](${explorerUrl}/address/${targetAddress})
Source: [${sourceAddress}](${explorerUrl}/address/${sourceAddress})
Chain: ${chain.network}

APPROVE \`${baseUri}/api/trpc/kyc.approve?input=%22${encrypted}%22\`

REJECT \`${baseUri}/api/trpc/kyc.reject?input=%22${encrypted}%22\``,
      )
      await updateTokenId(sourceAddress)
    }),
  approve: publicProcedure.input(z.string()).query(async ({ input, ctx }) => {
    const msg = decrypt(input)
    const { targetAddress, sourceAddress, chainId } = JSON.parse(msg)
    await prisma.delegation.updateMany({
      where: {
        chainId,
        target: targetAddress,
        source: {
          address: sourceAddress.toLowerCase(),
        },
      },
      data: {
        status: 'APPROVED',
      },
    })
    return `Delegation approved: ${targetAddress} -> ${sourceAddress}`
  }),
  reject: publicProcedure.input(z.string()).query(async ({ input, ctx }) => {
    const msg = decrypt(input)
    const { targetAddress, sourceAddress, chainId } = JSON.parse(msg)
    await prisma.delegation.updateMany({
      where: {
        chainId,
        target: targetAddress,
        source: {
          address: sourceAddress.toLowerCase(),
        },
      },
      data: {
        status: 'REJECTED',
      },
    })
    return `Delegation rejected: ${targetAddress} -> ${sourceAddress}`
  }),
  getDelegation: publicProcedure
    .input(
      z.object({
        targetAddress: z.string(),
        sourceAddress: z.string(),
        chainId: z.number(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { targetAddress, sourceAddress, chainId } = input
      const chain = getChain(chainId)
      if (!chain) {
        throw new Error('Invalid chain')
      }
      const delegation = await prisma.delegation.findFirst({
        where: {
          source: {
            address: sourceAddress.toLowerCase(),
          },
          target: targetAddress,
          chainId,
        },
      })
      return delegation
    }),
  getDelegationSignature: publicProcedure
    .input(
      z.object({
        targetAddress: z.string(),
        sourceAddress: z.string(),
        chainId: z.number(),
      }),
    )
    .query(async ({ input, ctx }) => {
      if (
        !ctx.session?.user ||
        !isKyc(ctx.session.user) ||
        input.sourceAddress.toLowerCase() !== ctx.session.user.wallet.toLowerCase()
      ) {
        throw new Error('Unauthorized')
      }
      const { targetAddress, sourceAddress, chainId } = input
      const chain = getChain(chainId)
      if (!chain) {
        throw new Error('Invalid chain')
      }
      const delegation = await prisma.delegation.findFirst({
        where: {
          source: {
            address: sourceAddress.toLowerCase(),
          },
          target: targetAddress,
          chainId,
        },
      })
      if (!delegation || delegation.status !== 'APPROVED') {
        throw new Error('Delegation not approved')
      }
      const kyc = await prisma.kyc.findFirst({
        where: {
          address: sourceAddress.toLowerCase(),
        },
      })
      if (!kyc) {
        throw new Error('KYC not found')
      }
      const msg = solidityKeccak256(['uint256', 'uint256', 'address'], [chainId, kyc.tokenId, targetAddress])
      const signer = new Wallet(process.env.KYC_MINTER as string, provider)

      const signature = await signer.signMessage(utils.arrayify(msg))

      return { signature, tokenId: kyc.tokenId, targetAddress }
    }),
  submitDelegation: publicProcedure
    .input(
      z.object({
        targetAddress: z.string(),
        sourceAddress: z.string(),
        chainId: z.number(),
      }),
    )
    .mutation(async ({ input }) => {
      const { targetAddress, sourceAddress, chainId } = input
      const delegationTokenId = await getDelegationTokenId(sourceAddress, targetAddress, chainId)
      await prisma.delegation.updateMany({
        data: {
          status: 'MINTED',
          tokenId: delegationTokenId,
        },
        where: {
          source: {
            address: { equals: sourceAddress.toLowerCase(), mode: 'insensitive' },
          },
          target: { equals: targetAddress, mode: 'insensitive' },
        },
      })
    }),
})

const getLargestTokenId = async () => {
  const tokenId = await prisma.kyc.aggregate({
    _max: {
      tokenId: true,
    },
  })
  return tokenId._max.tokenId
}

const updateTokenId = async (walletAddress: string) => {
  const coreChain = getChain(1116)
  let tokenId = (await getLargestTokenId()) || 0
  let owner: string | undefined
  const kyc = new Contract(coreChain!.kyc?.tokenAddress as any, kycAbi, provider)
  do {
    tokenId += 1
    owner = await new Promise<string | undefined>((res) => {
      kyc
        .ownerOf(tokenId)
        .then((result: string) => {
          res(result)
        })
        .catch(() => {
          res(undefined)
        })
    })
    if (owner) {
      try {
        await prisma.kyc.update({
          data: {
            tokenId,
          },
          where: {
            address: owner.toLowerCase(),
          },
        })
      } catch (e) {
        console.log(e)
      }
    }
  } while (owner && owner.toLowerCase() !== walletAddress.toLowerCase())
}

const getDelegationTokenId = async (sourceAddress: string, targetAddress: string, chainId: number): Promise<number> => {
  const contractKyc = new Contract(getChain(chainId)!.kyc?.contractKycAddress as any, contractKycAbi, provider)
  let tokenId: BigNumber
  const kyc = await prisma.kyc.findFirst({
    where: {
      address: {
        mode: 'insensitive',
        equals: sourceAddress.toLowerCase(),
      },
    },
  })
  if (!kyc) {
    throw new Error('KYC not found')
  }
  try {
    tokenId = await contractKyc.tokenOfOwnerByIndex(targetAddress, 0)
  } catch (e) {
    throw new Error('Invalid target address')
  }
  const sourceKycTokenId = await contractKyc.delegators(tokenId)
  if (sourceKycTokenId.toNumber() !== kyc.tokenId) {
    throw new Error('Invalid source address')
  }
  if (kyc.tokenId !== sourceKycTokenId.toNumber()) {
    throw new Error('Invalid token id')
  }
  return Number(tokenId.toString())
}

const secret = process.env.SECRET_COOKIE_PASSWORD!
const key = crypto.scryptSync(secret, 'salt', 32)

const encrypt = (text: string) => {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
  let encrypted = cipher.update(text)
  encrypted = Buffer.concat([encrypted, cipher.final()])
  return `${iv.toString('hex')}-${encrypted.toString('hex')}`
}

const decrypt = (text: string) => {
  const [iv, encrypted] = text.split('-')
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, Buffer.from(iv, 'hex'))
  let decrypted = decipher.update(Buffer.from(encrypted, 'hex'))
  decrypted = Buffer.concat([decrypted, decipher.final()])
  return decrypted.toString()
}
