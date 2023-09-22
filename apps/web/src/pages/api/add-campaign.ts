import { PrismaClient } from '@icecreamswap/database'
import getLpAddress from 'utils/getLpAddress'

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

  const kyc = await client.kyc.findFirst({
    where: {
      address: address.toLowerCase(),
    },
  })

  if (!kyc) {
    res.status(403).json({ message: 'not kyc verified' })
    return
  }

  const campaigns = await client.campaign.findMany({
    where: {
      chainId,
      address,
      startDate,
    },
  })

  if (campaigns?.length > 0) {
    res.status(403).json({ message: 'campaign exists' })
    return
  }

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
