import { ChainId } from '@pancakeswap/chains'

import { StableSwapPool } from './types'
import { pools as bscPools } from './56'

export type StableSwapPoolMap<TChainId extends number> = {
  [chainId in TChainId]: StableSwapPool[]
}

export const isStableSwapSupported = (chainId: number | undefined): chainId is StableSupportedChainId => {
  if (!chainId) {
    return false
  }
  return STABLE_SUPPORTED_CHAIN_IDS.includes(chainId)
}

export const STABLE_SUPPORTED_CHAIN_IDS: ReadonlyArray<ChainId> = [] as const // [ChainId.BSC]

export type StableSupportedChainId = (typeof STABLE_SUPPORTED_CHAIN_IDS)[number]

export const STABLE_POOL_MAP: {[p: number]: StableSwapPool[]} = {
  // [ChainId.BSC]: bscPools,
} satisfies StableSwapPoolMap<StableSupportedChainId>
