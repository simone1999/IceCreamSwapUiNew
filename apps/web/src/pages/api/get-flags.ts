import { PrismaClient } from '@prisma/client'

const client = new PrismaClient()

export default async function handler(req, res) {
  const flags = await client.flags.findMany({})
  res.json(
    flags.reduce<Record<string, string>>((acc, flag) => {
      return {
        ...acc,
        [flag.key]: flag.value,
      }
    }, {}),
  )
}
