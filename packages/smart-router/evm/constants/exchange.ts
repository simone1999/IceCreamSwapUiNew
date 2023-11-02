import { Token } from '@pancakeswap/sdk'
import { ChainId } from '@pancakeswap/chains'
import { ChainMap, ChainTokenList } from '../types'
import {
  bitgertTokens,
  coreTokens,
  dogechainTokens,
  dokenTokens,
  fuseTokens,
  xdcTokens,
  xodexTokens,
  shardeumTestnetTokens,
  telosTokens,
  shimmerTestnetTokens,
  baseTokens,
  shimmerTokens,
  scrollTokens
} from "@pancakeswap/tokens";
import { chains } from "@icecreamswap/constants";
import { Address } from "viem";

export const SMART_ROUTER_ADDRESSES: Record<ChainId, Address> = {
  [ChainId.CORE]: '0x3245b934D8A2bd0Ad93e679F35A6EFcf231966Aa',
} as const

export const V2_ROUTER_ADDRESS: ChainMap<Address> = chains.reduce((acc, chain) => {
  return chain.swap
    ?{...acc, [chain.id]: chain.swap.routerAddress}
    :acc
}, {})

export const AKKA_ROUTER_ADDRESS: ChainMap<Address> = chains.reduce((acc, chain) => {
  return chain.swapAkka
    ?{...acc, [chain.id]: chain.swapAkka.routerAddress}
    :acc
}, {})

export const AKKA_ROUTER_V3_ADDRESS: ChainMap<Address> = chains.reduce((acc, chain) => {
  return chain.swapAkka?.routerAddressV3
    ?{...acc, [chain.id]: chain.swapAkka.routerAddressV3}
    :acc
}, {})

export const STABLE_SWAP_INFO_ADDRESS: ChainMap<Address> = {}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: Partial<ChainTokenList> = {
  [ChainId.BITGERT]: [bitgertTokens.wbrise, bitgertTokens.ice, bitgertTokens.usdci, bitgertTokens.usdti],
  [ChainId.DOGE]: [dogechainTokens.wdoge, dogechainTokens.ice],
  [ChainId.DOKEN]: [dokenTokens.wdkn, dokenTokens.ice, dokenTokens.usdt],
  [ChainId.FUSE]: [fuseTokens.wfuse, fuseTokens.ice],
  [ChainId.XDC]: [xdcTokens.wxdc, xdcTokens.ice, xdcTokens.usdt],
  [ChainId.CORE]: [coreTokens.wcore, coreTokens.wcore_old, coreTokens.ice, coreTokens.usdt],
  [ChainId.XODEX]: [xodexTokens.wxodex, xodexTokens.ice, xodexTokens.usdt],
  [ChainId.SHARDEUM_TEST]: [shardeumTestnetTokens.wshm, shardeumTestnetTokens.ice, shardeumTestnetTokens.usdt],
  [ChainId.TELOS]: [telosTokens.wtlos, telosTokens.ice, telosTokens.usdt],
  [ChainId.SHIMMER_TEST]: [shimmerTestnetTokens.wsmr, shimmerTestnetTokens.ice, shimmerTestnetTokens.usdt],
  [ChainId.BASE]: [baseTokens.weth, baseTokens.ice, baseTokens.usdt],
  [ChainId.SHIMMER]: [shimmerTokens.wsmr, shimmerTokens.ice, shimmerTokens.usdt],
  [ChainId.SCROLL]: [scrollTokens.weth, scrollTokens.ice, scrollTokens.usdt],
}

/**
 * Additional bases for specific tokens
 * @example { [WBTC.address]: [renBTC], [renBTC.address]: [WBTC] }
 */
export const ADDITIONAL_BASES: {
  [chainId in ChainId]?: { [tokenAddress: string]: Token[] }
} = {}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 * @example [AMPL.address]: [DAI, WNATIVE[ChainId.BSC]]
 */
export const CUSTOM_BASES: {
  [chainId in ChainId]?: { [tokenAddress: string]: Token[] }
} = {
  [ChainId.BSC]: {
    // [bscTokens.axlusdc.address]: [bscTokens.usdt],
  },
}
