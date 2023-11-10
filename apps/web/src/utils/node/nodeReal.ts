import { ChainId } from '@pancakeswap/chains'

export const getNodeRealUrl = (chainId: number, key?: string) => {
  let host: string | null = null

  switch (chainId) {
    default:
      host = null
  }

  if (!host) {
    return null
  }

  const url = `https://${host}`
  return url
}
