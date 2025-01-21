import { getFullDecimalMultiplier } from '@pancakeswap/utils/getFullDecimalMultiplier'
import { getChain } from '@icecreamswap/constants'

export const BASE_URL = 'https://mermaidswapxyz.com'
export const BASE_ADD_LIQUIDITY_URL = `${BASE_URL}/add`
export const DEFAULT_TOKEN_DECIMAL = getFullDecimalMultiplier(18)
export const BOOSTED_FARM_GAS_LIMIT = 5000000n
export const IPFS_GATEWAY = 'https://ipfs.io/ipfs'
export const SECONDS_PER_YEAR = 365 * 24 * 60 * 60
export const BSC_BLOCK_TIME = 3

export const blocksPerYear = (chainId: number) => {
  return SECONDS_PER_YEAR / getChain(chainId).blockInterval
}

export const BOOSTED_FARM_V3_GAS_LIMIT = 1000000n
