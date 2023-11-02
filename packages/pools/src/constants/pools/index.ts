import { ChainId } from '@pancakeswap/chains'

import { pools as corePools, livePools as coreLivePools } from './1116'
import { pools as bitgertPools, livePools as bitgertLivePools } from './32520'
import { pools as xdcPools, livePools as xdcLivePools } from './50'
import { SerializedPool } from '../../types'
import { SupportedChainId } from '../supportedChains'
import { isPoolsSupported } from '../../utils/isPoolsSupported'

export type PoolsConfigByChain<TChainId extends ChainId> = {
  [chainId in TChainId]: SerializedPool[]
}

export const POOLS_CONFIG_BY_CHAIN = {
  [ChainId.CORE]: corePools,
  [ChainId.BITGERT]: bitgertPools,
  [ChainId.XDC]: xdcPools,
} as PoolsConfigByChain<SupportedChainId>

export const LIVE_POOLS_CONFIG_BY_CHAIN = {
  [ChainId.BSC]: coreLivePools,
  [ChainId.BITGERT]: bitgertLivePools,
  [ChainId.XDC]: xdcLivePools,
} as PoolsConfigByChain<SupportedChainId>

export const getPoolsConfig = (chainId: ChainId) => {
  if (!isPoolsSupported(chainId)) {
    return undefined
  }
  return POOLS_CONFIG_BY_CHAIN[chainId]
}

export const getLivePoolsConfig = (chainId: ChainId) => {
  if (!isPoolsSupported(chainId)) {
    return undefined
  }
  return LIVE_POOLS_CONFIG_BY_CHAIN[chainId]
}

export const MAX_LOCK_DURATION = 31536000
export const UNLOCK_FREE_DURATION = 604800
export const ONE_WEEK_DEFAULT = 604800
export const BOOST_WEIGHT = 20000000000000n
export const DURATION_FACTOR = 31536000n
