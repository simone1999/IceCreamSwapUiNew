import { prisma } from '@icecreamswap/database'

export default async function handler(req, res) {
  const { chainId } = req.query
  const tokens = await prisma.token.findMany({
    where: chainId
      ? {
        chainId: Number(chainId),
      }
      : undefined,
  })
  res.json(tokens)
}
