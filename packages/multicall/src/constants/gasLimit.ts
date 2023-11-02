import { ChainId } from '@pancakeswap/chains'
import { chains } from '@icecreamswap/constants'

export const DEFAULT_GAS_LIMIT = 150000000n

export const DEFAULT_GAS_LIMIT_BY_CHAIN: { [key in ChainId]?: bigint } = chains.reduce((acc, chain) => {
  return {...acc, [chain.id]: DEFAULT_GAS_LIMIT}
}, {})

export const DEFAULT_GAS_BUFFER = 3000000n

export const DEFAULT_GAS_BUFFER_BY_CHAIN: { [key in ChainId]?: bigint } = chains.reduce((acc, chain) => {
  return {...acc, [chain.id]: DEFAULT_GAS_BUFFER}
}, {})
