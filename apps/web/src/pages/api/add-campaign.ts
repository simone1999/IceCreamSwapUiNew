import { PrismaClient } from '@icecreamswap/database'
import { isKyc } from '@icecreamswap/backend/src/server/session'
import getLpAddress from 'utils/getLpAddress'

const client = new PrismaClient()

export default async function handler(req, res) {
  const {
    wallet,
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

  const user = await client.user.findFirst({
    where: {
      wallet,
    },
  })

  const kyc = isKyc(user)

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
