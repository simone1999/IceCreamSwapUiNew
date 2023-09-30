import { ChainId, JSBI, Percent, Token } from '@pancakeswap/sdk'
import { BigNumber } from '@ethersproject/bignumber'
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
  shimmerTokens
} from '@pancakeswap/tokens';
import { ChainMap, ChainTokenList, RouterAddressTypes } from './types'

export const ROUTER_ADDRESS_COMMON = '0xBb5e1777A331ED93E07cF043363e48d320eb96c4'
export const ROUTER_ADDRESS_COMMON_AKKA_BITGERT = '0x25507a7323b04FD2687E72875aC4456C95782915'
export const ROUTER_ADDRESS_COMMON_AKKA_XDC = '0x8AB50AC5b3Ce4436Ad15EBA720a6e6264D3321A8'
export const ROUTER_ADDRESS_COMMON_AKKA_CORE = '0x5f3B7b49c5763045a6571dEe9A2b13ccd2407daA'
export const ROUTER_ADDRESS_COMMON_AKKA_TELOS = '0x67770F918D1F7Fac8eaA2266977bA81D8F46d300'
export const ROUTER_ADDRESS_COMMON_AKKA_BASE = '0xF84f39714E11A8031Ad4c5D5B4437E3b5d81b6F2'

export const ROUTER_ADDRESS: Partial<ChainMap<RouterAddressTypes>> = {
  [ChainId.BITGERT]: {
    Icecream: ROUTER_ADDRESS_COMMON,
    Akka: ROUTER_ADDRESS_COMMON_AKKA_BITGERT,
  },
  [ChainId.DOGE]: {
    Icecream: ROUTER_ADDRESS_COMMON,
  },
  [ChainId.DOKEN]: {
    Icecream: ROUTER_ADDRESS_COMMON,
  },
  [ChainId.FUSE]: {
    Icecream: ROUTER_ADDRESS_COMMON,
  },
  [ChainId.XDC]: {
    Icecream: ROUTER_ADDRESS_COMMON,
    Akka: ROUTER_ADDRESS_COMMON_AKKA_XDC,
  },
  [ChainId.BSC]: {
    Icecream: ROUTER_ADDRESS_COMMON,
  },
  [ChainId.CORE]: {
    Icecream: ROUTER_ADDRESS_COMMON,
    Akka: ROUTER_ADDRESS_COMMON_AKKA_CORE,
  },
  [ChainId.XODEX]: {
    Icecream: ROUTER_ADDRESS_COMMON,
  },
  [ChainId.SHARDEUM_TEST]: {
    Icecream: "0x43891084581fD07Ee1189f3a2f04e51c26a95B77",
  },
  [ChainId.TELOS]: {
    Icecream: ROUTER_ADDRESS_COMMON,
    Akka: ROUTER_ADDRESS_COMMON_AKKA_TELOS,
  },
  [ChainId.SHIMMER_TEST]: {
    Icecream: ROUTER_ADDRESS_COMMON,
  },
  [ChainId.BASE]: {
    Icecream: ROUTER_ADDRESS_COMMON,
    Akka: ROUTER_ADDRESS_COMMON_AKKA_BASE,
  },
  [ChainId.SHIMMER]: {
    Icecream: '0xBbB4CCfc93657AC125F4b1f734111349d1bFF611',
  },
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: Partial<ChainTokenList> = {
  [ChainId.BITGERT]: [bitgertTokens.wbrise, bitgertTokens.ice, bitgertTokens.usdci, bitgertTokens.usdti],
  [ChainId.DOGE]: [dogechainTokens.wdoge, dogechainTokens.ice],
  [ChainId.DOKEN]: [dokenTokens.wdkn, dokenTokens.ice, dokenTokens.usdt],
  [ChainId.FUSE]: [fuseTokens.wfuse, fuseTokens.ice],
  [ChainId.XDC]: [xdcTokens.wxdc, xdcTokens.ice, xdcTokens.usdt],
  [ChainId.CORE]: [coreTokens.wcore, coreTokens.score, coreTokens.ice, coreTokens.usdt],
  [ChainId.XODEX]: [xodexTokens.wxodex, xodexTokens.ice, xodexTokens.usdt],
  [ChainId.SHARDEUM_TEST]: [shardeumTestnetTokens.wshm, shardeumTestnetTokens.ice, shardeumTestnetTokens.usdt],
  [ChainId.TELOS]: [telosTokens.wtlos, telosTokens.ice, telosTokens.usdt],
  [ChainId.SHIMMER_TEST]: [shimmerTestnetTokens.wsmr, shimmerTestnetTokens.ice, shimmerTestnetTokens.usdt],
  [ChainId.BASE]: [baseTokens.weth, baseTokens.ice, baseTokens.usdt],
  [ChainId.SHIMMER]: [shimmerTokens.wsmr, shimmerTokens.ice, shimmerTokens.usdt],
}

/**
 * Additional bases for specific tokens
 * @example { [WBTC.address]: [renBTC], [renBTC.address]: [WBTC] }
 */
export const ADDITIONAL_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 * @example [AMPL.address]: [DAI, WNATIVE[ChainId.BSC]]
 */
export const CUSTOM_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {}

// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: Partial<ChainTokenList> = {
  [ChainId.BITGERT]: [bitgertTokens.ice, bitgertTokens.usdti],
  [ChainId.DOGE]: [dogechainTokens.ice],
  [ChainId.DOKEN]: [dokenTokens.ice],
  [ChainId.FUSE]: [fuseTokens.ice],
  [ChainId.XDC]: [xdcTokens.ice, xdcTokens.usdt],
  [ChainId.CORE]: [coreTokens.ice, coreTokens.score, coreTokens.usdt],
  [ChainId.XODEX]: [xodexTokens.ice, xodexTokens.usdt],
  [ChainId.SHARDEUM_TEST]: [shardeumTestnetTokens.ice, shardeumTestnetTokens.usdt],
  [ChainId.TELOS]: [telosTokens.ice, telosTokens.usdt],
  [ChainId.SHIMMER_TEST]: [shimmerTestnetTokens.ice, shimmerTestnetTokens.usdt],
  [ChainId.BASE]: [baseTokens.ice, baseTokens.usdt],
  [ChainId.SHIMMER]: [shimmerTokens.ice, shimmerTokens.usdt, shimmerTokens.wsmr],
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: Partial<ChainTokenList> = {
  [ChainId.BITGERT]: [
    bitgertTokens.wbrise,
    bitgertTokens.sphynx,
    bitgertTokens.bpad,
    bitgertTokens.broge,
    bitgertTokens.brzilla,
    bitgertTokens.btxt,
    bitgertTokens.eltg,
    bitgertTokens.evo,
    bitgertTokens.map,
    bitgertTokens.miidas,
    bitgertTokens.mir,
    bitgertTokens.numi,
    bitgertTokens.omnia,
    bitgertTokens.prds,
    bitgertTokens.rluna,
    bitgertTokens.vef,
    bitgertTokens.wmf,
    bitgertTokens.yogo,
    bitgertTokens.ypc,
    bitgertTokens.ice,
    bitgertTokens.tokyo,
    bitgertTokens.usdc,
    bitgertTokens.usdt,
    bitgertTokens.wolf,
    bitgertTokens.usdti,
    bitgertTokens.$3dc,
    bitgertTokens.darrival,
    bitgertTokens.ethi,
    bitgertTokens.dogei,
    bitgertTokens.bnbi,
    bitgertTokens.shibi,
    bitgertTokens.daii,
    bitgertTokens.usdc,
    bitgertTokens.busdi,
    bitgertTokens.baskom,
    bitgertTokens.abr,
    bitgertTokens.lung,
  ],
  [ChainId.DOGE]: [dogechainTokens.wdoge, dogechainTokens.ice],
  [ChainId.DOKEN]: [dokenTokens.wdkn, dokenTokens.ice, dokenTokens.usdt],
  [ChainId.FUSE]: [fuseTokens.wfuse, fuseTokens.ice],
  [ChainId.XDC]: [xdcTokens.wxdc, xdcTokens.ice, xdcTokens.usdt, xdcTokens.usdc],
  [ChainId.CORE]: [coreTokens.wcore, coreTokens.score, coreTokens.ice, coreTokens.usdt],
  [ChainId.XODEX]: [xodexTokens.wxodex, xodexTokens.ice, xodexTokens.usdt],
  [ChainId.SHARDEUM_TEST]: [shardeumTestnetTokens.wshm, shardeumTestnetTokens.ice, shardeumTestnetTokens.usdt],
  [ChainId.TELOS]: [telosTokens.wtlos, telosTokens.ice, telosTokens.usdt],
  [ChainId.SHIMMER_TEST]: [shimmerTestnetTokens.wsmr, shimmerTestnetTokens.ice, shimmerTestnetTokens.usdt],
  [ChainId.BASE]: [baseTokens.weth, baseTokens.ice, baseTokens.usdt],
  [ChainId.SHIMMER]: [shimmerTokens.wsmr, shimmerTokens.ice, shimmerTokens.usdt],
}

export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
  [ChainId.BITGERT]: [
    [bitgertTokens.wbrise, bitgertTokens.ice],
    [bitgertTokens.usdti, bitgertTokens.ice],
  ],
  [ChainId.DOGE]: [
    [dogechainTokens.wdoge, dogechainTokens.ice],
    [dogechainTokens.usdt, dogechainTokens.ice],
  ],
  [ChainId.DOKEN]: [[dokenTokens.wdkn, dokenTokens.ice]],
  [ChainId.FUSE]: [[fuseTokens.wfuse, fuseTokens.ice]],
  [ChainId.XDC]: [
    [xdcTokens.wxdc, xdcTokens.ice],
    [xdcTokens.usdt, xdcTokens.ice],
  ],
  [ChainId.CORE]: [
    [coreTokens.score, coreTokens.ice],
    [coreTokens.score, coreTokens.wcore],
    [coreTokens.usdt, coreTokens.ice],
  ],
  [ChainId.XODEX]: [
    [xodexTokens.wxodex, xodexTokens.ice],
    [xodexTokens.usdt, xodexTokens.ice],
  ],
  [ChainId.SHARDEUM_TEST]: [
    [shardeumTestnetTokens.wshm, shardeumTestnetTokens.ice],
    [shardeumTestnetTokens.usdt, shardeumTestnetTokens.ice]
  ],
  [ChainId.TELOS]: [
    [telosTokens.wtlos, telosTokens.ice],
    [telosTokens.usdt, telosTokens.ice],
  ],
  [ChainId.SHIMMER_TEST]: [
    [shimmerTestnetTokens.wsmr, shimmerTestnetTokens.ice],
    [shimmerTestnetTokens.usdt, shimmerTestnetTokens.ice],
  ],
  [ChainId.BASE]: [
    [baseTokens.weth, baseTokens.ice],
    [baseTokens.usdt, baseTokens.ice],
  ],
  [ChainId.SHIMMER]: [
    [shimmerTokens.usdt, shimmerTokens.ice],
    [shimmerTokens.wsmr, shimmerTokens.ice],
    [shimmerTokens.wsmr, shimmerTokens.usdt],
  ],
}

export const BIG_INT_ZERO = JSBI.BigInt(0)
export const BIG_INT_TEN = JSBI.BigInt(10)

// one basis point
export const BIPS_BASE = JSBI.BigInt(10000)
export const ONE_BIPS = new Percent(JSBI.BigInt(1), BIPS_BASE)
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE) // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE) // 15%

// used to ensure the user doesn't send so much BNB so they end up with <.01
export const MIN_BNB: JSBI = JSBI.multiply(JSBI.exponentiate(BIG_INT_TEN, JSBI.BigInt(16)), JSBI.BigInt(6)) // .06 NativeToken
export const BETTER_TRADE_LESS_HOPS_THRESHOLD = new Percent(JSBI.BigInt(50), BIPS_BASE)

export const ZERO_PERCENT = new Percent('0')
export const ONE_HUNDRED_PERCENT = new Percent('1')

export const BASE_FEE = new Percent(JSBI.BigInt(30), BIPS_BASE)
export const INPUT_FRACTION_AFTER_FEE = ONE_HUNDRED_PERCENT.subtract(BASE_FEE)

// BNB
export const DEFAULT_INPUT_CURRENCY = 'BNB'
// ICE
export const DEFAULT_OUTPUT_CURRENCY = '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82'

// Handler string is passed to Gelato to use PCS router
export const GELATO_HANDLER = 'pancakeswap'
export const GENERIC_GAS_LIMIT_ORDER_EXECUTION = BigNumber.from(500000)

export const LIMIT_ORDERS_DOCS_URL = 'https://docs.icecreamswap.com/products/pancakeswap-exchange/limit-orders'

export const EXCHANGE_PAGE_PATHS = ['/swap', '/limit-orders', 'liquidity', '/add', '/find', '/remove']
