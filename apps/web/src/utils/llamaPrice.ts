import { ChainId } from '@pancakeswap/sdk'

const CHAIN_MAPPING = {
} as const satisfies Record<number, string>

// use for fetch usd outside of the liquidity pools on IceCreamSwap
export const fetchTokenUSDValue = async (chainId: number, tokenAddresses: string[]) => {
  if (!tokenAddresses.length) return new Map<string, string>()

  const list = tokenAddresses.join(',')

  const result: { [key: string]: string } = await fetch(
    `https://pricing.icecreamswap.com/${chainId}?token=${list}`,
  )
    .then((res) => res.json())
    .catch(reason => {
      console.warn("Error while getting token price", reason)
      return {}
    })

  const commonTokenUSDValue = new Map<string, string>()

  Object.entries(result || {}).forEach(([key, value]) => {
    const address = key
    commonTokenUSDValue.set(address, value)
  })

  return commonTokenUSDValue
}
