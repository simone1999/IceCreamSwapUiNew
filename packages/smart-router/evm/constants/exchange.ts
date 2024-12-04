import {ChainId, Token, WETH9} from '@pancakeswap/sdk'
import { ChainMap, ChainTokenList } from '../types'
import { coreTokens, ICE, USD } from "@pancakeswap/tokens";
import { chains } from "@icecreamswap/constants";
import { Address } from "viem";


export const SMART_ROUTER_ADDRESSES: Record<ChainId, Address> = chains.reduce((acc, chain) => {
  return chain.smartRouterAddress
    ?{...acc, [chain.id]: chain.smartRouterAddress}
    :acc
}, {})

export const V2_ROUTER_ADDRESS: ChainMap<Address> = chains.reduce((acc, chain) => {
  return chain.swap
    ?{...acc, [chain.id]: chain.swap.routerAddress}
    :acc
}, {})

export const STABLE_SWAP_INFO_ADDRESS: ChainMap<Address> = {}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...chains.reduce((acc, chain) => {
    const tokens: Token[] = []
    WETH9[chain.id] && tokens.push(WETH9[chain.id])
    ICE[chain.id] && tokens.push(ICE[chain.id])
    USD[chain.id] && tokens.push(USD[chain.id])
    return {...acc, [chain.id]: tokens}
  }, {}),
  [ChainId.CORE]: [coreTokens.wcore, coreTokens.wcore_old, coreTokens.usdtl0],
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
