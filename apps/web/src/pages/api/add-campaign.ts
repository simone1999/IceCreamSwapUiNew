import { PrismaClient } from '@prisma/client'

const client = new PrismaClient()

export default async function handler(req, res) {
  const { address, chainId, website, banner, github, reddit, discord, telegram, twitter, description } = req.body

  await client.campaign.create({
    data: {
      address,
      chainId,
      website,
      banner,
      github,
      reddit,
      discord,
      telegram,
      twitter,
      description,
    },
  })

  res.json({ message: 'ok' })
}
