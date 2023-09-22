import { PrismaClient } from '@icecreamswap/database'

const client = new PrismaClient()

export default async function handler(req, res) {
  const {
    address,
    description,
    chainId,
    // softCap,
    // hardCap,
    // minAllowed,
    // maxAllowed,
    // rate,
    // poolRate,
    // liquidityRate,
    startDate,
    // endDate,
    website,
    twitter,
    telegram,
    discord,
    reddit,
    github,
    banner,
  } = req.body

  await client.campaign.create({
    data: {
      address,
      description,
      chainId,
      // softCap,
      // hardCap,
      // minAllowed,
      // maxAllowed,
      // rate,
      // poolRate,
      // liquidityRate,
      startDate,
      // endDate,
      website,
      twitter,
      telegram,
      discord,
      reddit,
      github,
      banner,
    },
  })

  res.json({ message: 'ok' })
}
