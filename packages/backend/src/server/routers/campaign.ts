import { z } from 'zod'
import { isKyc } from '../session'
import { publicProcedure, router } from '../trpc'
import { prisma } from '@icecreamswap/database'
import { getChain } from '@icecreamswap/constants/src/chains'
import { Contract, providers } from 'ethers'
import campaignFactoryAbi from '../../abi/campaignFactory.json'
import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";

export const campaignRouter = router({
  add: publicProcedure
    .input(
      z.object({
        address: z.string().length(42),
        chainId: z.number(),
        website: z.string().url(),
        banner: z.string().optional(),
        twitter: z.string().optional(),
        telegram: z.string().optional(),
        discord: z.string().optional(),
        github: z.string().optional(),
        reddit: z.string().optional(),
        description: z.string().min(50),
        startDate: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      if (!ctx.session?.user) {
        throw new Error('MissingLogin')
      } else if (!isKyc(ctx.session.user)) {
        throw new Error('MissingKYC')
      }

      const chain = getChain(input.chainId)
      if (!chain) {
        throw new Error('InvalidChainId')
      }
      if (!chain.campaignFactory) {
        throw new Error('InvalidCampaignFactory')
      }

      const campaign = await prisma.campaign.findFirst({
        where: {
          address: {
            equals: input.address.toLowerCase(),
            mode: 'insensitive',
          },
          chainId: input.chainId,
        },
      })
      if (campaign) {
        throw new Error('CampaignExists')
      }

      const provider = new providers.JsonRpcProvider(chain.rpcUrls.default.http[0])
      const contract = new Contract(chain.campaignFactory, campaignFactoryAbi, provider)
      const userCampaignIds: number[] = await contract.getUserCampaigns(ctx.session.user.wallet)
      const userCampaignAddresses: string[] = await Promise.all(userCampaignIds.map(campaignId => contract.campaigns(campaignId)))
      const match = !!userCampaignAddresses.find(address => address === input.address)

      if (!match) {
        throw new Error('MissingUserContract')
      }

      if (input.banner) {
        const s3Client = new S3Client({})
        const binary = Buffer.from(input.banner, 'base64')
        await s3Client.send(
          new PutObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: `campaign/banner/${input.chainId}/${input.address}.png`,
            Body: binary,
            ContentType: 'image/png',
            GrantRead: 'uri=http://acs.amazonaws.com/groups/global/AllUsers',
          }),
        )
      }

      await prisma.campaign.create({
        data: {
          address: input.address,
          chainId: input.chainId,
          website: input.website,
          banner: input.banner,
          twitter: input.twitter,
          telegram: input.telegram,
          discord: input.discord,
          github: input.github,
          reddit: input.reddit,
          description: input.description,
          tags: ['KYC'],
          deleted: false,
          startDate: input.startDate,
        },
      })
    }),
})