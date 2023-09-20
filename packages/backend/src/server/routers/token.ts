// @ts-check
import { z } from 'zod'
import { isMod } from '../session'
import { publicProcedure, router } from '../trpc'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { prisma } from '../prisma'
import { Listed, Token } from '@icecreamswap/database'

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
      if (!ctx.session?.user || !isMod(ctx.session.user)) {
        throw new Error('Unauthorized')
      }
      if (input.logo) {
        const s3Client = new S3Client({})
        const binary = Buffer.from(input.logo, 'base64')
        await s3Client.send(
          new PutObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: `token/${input.chainId}/${input.tokenAddress}.png`,
            Body: binary,
            ContentType: 'image/png',
            GrantRead: 'uri=http://acs.amazonaws.com/groups/global/AllUsers',
          }),
        )
      }
      await prisma.token.create({
        data: {
          name: input.tokenName,
          symbol: input.tokenSymbol,
          address: input.tokenAddress,
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
      tokens: tokens.map((token) => ({
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
