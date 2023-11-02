import { ChainId } from '@pancakeswap/chains'
import { chains } from "@icecreamswap/constants";

// Revalidate interval in milliseconds

export const POOLS_FAST_REVALIDATE: Record<ChainId, number> = chains.reduce((acc, chain) => {
  return {...acc, [chain.id]: 10_000}
}, {})

export const POOLS_NORMAL_REVALIDATE: Record<ChainId, number> = chains.reduce((acc, chain) => {
  return {...acc, [chain.id]: 15_000}
}, {})

export const POOLS_SLOW_REVALIDATE: Record<ChainId, number> = chains.reduce((acc, chain) => {
  return {...acc, [chain.id]: 20_000}
}, {})
