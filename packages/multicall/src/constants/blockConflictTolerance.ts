import { ChainId } from '@pancakeswap/chains'
import { chains } from '@icecreamswap/constants'

export const DEFAULT_BLOCK_CONFLICT_TOLERANCE = 5

export const BLOCK_CONFLICT_TOLERANCE: { [key in ChainId]: number } = chains.reduce((acc, chain) => {
  return {...acc, [chain.id]: DEFAULT_BLOCK_CONFLICT_TOLERANCE}
}, {})
