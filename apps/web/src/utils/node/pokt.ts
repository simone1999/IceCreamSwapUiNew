import { ChainId } from '@pancakeswap/chains'

const pocketPrefix = {
} as const

export const getPoktUrl = (chainId: keyof typeof pocketPrefix, key?: string) => {
  if (!key) {
    return null
  }

  const url = `https://${pocketPrefix[chainId]}.gateway.pokt.network/v1/lb/${key}`
  return url
}
