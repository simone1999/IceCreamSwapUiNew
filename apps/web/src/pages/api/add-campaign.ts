import { PrismaClient } from '@icecreamswap/database'
import { isKyc } from '@icecreamswap/backend/src/server/session'

const client = new PrismaClient()

export default async function handler(req, res) {
  const {
    user,
    address,
    chainId,
    website,
    banner,
    twitter,
    telegram,
    discord,
    github,
    reddit,
    description,
    tags,
    deleted,
    startDate,
  } = req.body

  const kyc = isKyc(user)

  if (!kyc) {
    res.status(403).json({ message: 'not kyc verified' })
    return
  }

  const campaigns = await client.campaign.findMany({
    where: {
      chainId,
      address,
    },
  })

  if (campaigns?.length > 0) {
    res.status(403).json({ message: 'campaign exists' })
    return
  }

  await client.campaign.create({
    data: {
      address,
      chainId,
      website,
      banner,
      twitter,
      telegram,
      discord,
      github,
      reddit,
      description,
      tags,
      deleted,
      startDate,
    },
  })

  res.json({ message: 'ok' })
}
