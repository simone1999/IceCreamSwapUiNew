import { ChainId, Token } from '@pancakeswap/sdk'
import { ChainMap, ChainTokenList } from '../types'
import {
  bitgertTokens,
  coreTokens,
  dogechainTokens,
  dokenTokens,
  fuseTokens,
  xdcTokens,
  xodexTokens,
} from '@pancakeswap/tokens'

export const SMART_ROUTER_ADDRESSES = {
  [ChainId.CORE]: '0xD56d8dC0F34509c5D60471fA664Bd163F3cE0166',
  [ChainId.XDC]: '0xD810A437e334B9C3660C18b38fB3C01000B91DD3',
} as const satisfies Record<ChainId, string>

export const V2_ROUTER_ADDRESS: ChainMap<string> = {
  // [ChainId.ETHEREUM]: '0x3BC722f252C7bAE2f55647e49aDcB9d33Ff6eBcC',
  // [ChainId.GOERLI]: '0x3BC722f252C7bAE2f55647e49aDcB9d33Ff6eBcC',
  [ChainId.BSC]: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
  // [ChainId.BSC_TESTNET]: '0xD99D1c33F9fC3444f8101754aBC46c52416550D1',
}

export const STABLE_SWAP_INFO_ADDRESS: ChainMap<string> = {}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: Partial<ChainTokenList> = {
  [ChainId.BITGERT]: [bitgertTokens.wbrise, bitgertTokens.ice, bitgertTokens.usdci, bitgertTokens.usdti],
  [ChainId.DOGE]: [dogechainTokens.wdoge, dogechainTokens.ice],
  [ChainId.DOKEN]: [dokenTokens.wdkn, dokenTokens.ice, dokenTokens.usdt],
  [ChainId.FUSE]: [fuseTokens.wfuse, fuseTokens.ice],
  [ChainId.XDC]: [xdcTokens.wxdc, xdcTokens.ice, xdcTokens.usdt],
  [ChainId.CORE]: [coreTokens.wcore, coreTokens.score, coreTokens.ice, coreTokens.usdt],
  [ChainId.XODEX]: [xodexTokens.wxodex, xodexTokens.ice, xodexTokens.usdt],
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
