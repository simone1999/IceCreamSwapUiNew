import { infoStableSwapClient } from "utils/graphql"
import {
  BLOCKS_CLIENT_WITH_CHAIN,
  INFO_CLIENT_WITH_CHAIN
} from "config/constants/endpoints";
import { ChainId } from '@pancakeswap/chains'
import {
  PCS_BITGERT_START,
  PCS_CORE_START,
  PCS_SCROLL_START,
  PCS_XDC_START,
  PCS_TELOS_START,
  PCS_BASE_START,
  PCS_SHIMMER_START,
} from "config/constants/info";
import { GraphQLClient } from 'graphql-request'
import { chains } from '@icecreamswap/constants'

export type MultiChainName = 'BITGERT' | 'DOGECHAIN' | 'DOKEN' | 'FUSE' | 'XDC' | 'BSC' | 'CORE' | 'XODEX' | 'SCROLL' | 'TELOS' | 'BASE' | 'SHIMMER' | 'SHARDEUM_TESTNET' | 'SHIMMER_TESTNET'
export type MultiChainNameExtend = MultiChainName

export const multiChainQueryMainToken = chains.reduce((acc, chain) => (
    {...acc, [chain.network.toUpperCase()]: 'ETH'}
), {}) as Record<MultiChainName, string>

export const multiChainBlocksClient = chains.reduce((acc, chain) => (
    {...acc, [chain.network.toUpperCase()]: BLOCKS_CLIENT_WITH_CHAIN[chain.id]}
), {}) as Record<MultiChainName, string>

// todo: add to constants package
export const multiChainStartTime = {
  BITGERT: PCS_BITGERT_START,
  XDC: PCS_XDC_START,
  CORE: PCS_CORE_START,
  SCROLL: PCS_SCROLL_START,
  TELOS: PCS_TELOS_START,
  BASE: PCS_BASE_START,
  SHIMMER: PCS_SHIMMER_START,
}

export const multiChainId = chains.reduce((acc, chain) => (
    {...acc, [chain.network.toUpperCase()]: chain.id}
), {}) as Record<MultiChainName, ChainId>

export const multiChainPaths = chains.reduce((acc, chain) => (
    {...acc, [chain.network.toUpperCase()]: ''}
), {}) as Record<MultiChainName, string>

export const multiChainQueryClient = chains.reduce((acc, chain) => (
    {...acc, [chain.network.toUpperCase()]: new GraphQLClient(INFO_CLIENT_WITH_CHAIN[chain.id])}
), {}) as Record<MultiChainName, GraphQLClient>

export const multiChainScan = chains.reduce((acc, chain) => (
    {...acc, [chain.network.toUpperCase()]: `${chain.network.charAt(0).toUpperCase() + chain.network.slice(1)}Scan`}
), {}) as Record<MultiChainName, string>

export const multiChainTokenBlackList = chains.reduce((acc, chain) => (
    {...acc, [chain.network.toUpperCase()]: ['']}
), {}) as Record<MultiChainName, string>

export const multiChainTokenWhiteList = chains.reduce((acc, chain) => (
    {...acc, [chain.network.toUpperCase()]: ['']}
), {}) as Record<MultiChainName, string>

export const getMultiChainQueryEndPointWithStableSwap = (chainName: MultiChainName) => {
  const isStableSwap = checkIsStableSwap()
  if (isStableSwap) return infoStableSwapClient
  return multiChainQueryClient[chainName]
}

export const checkIsStableSwap = () => window.location.href.includes('stableSwap')

export const multiChainName: Record<number | string, MultiChainNameExtend> = chains.reduce((acc, chain) => {
  return {...acc, [chain.id]: chain.network.toUpperCase() as MultiChainName}
}, {})

export const ChainLinkSupportChains = []

export const subgraphTokenSymbol = {}