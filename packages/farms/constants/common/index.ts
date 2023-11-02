import { ERC20Token } from '@pancakeswap/sdk'
import { ChainId } from '@pancakeswap/chains'
import { bscTokens } from '@pancakeswap/tokens'
import type { CommonPrice } from '../../src/fetchFarmsV3'
import type { FarmV3SupportedChainId } from '../../src'

export type PriceHelper = {
  chain: string
  list: ERC20Token[]
}

export const CHAIN_ID_TO_CHAIN_NAME = {
} satisfies Record<FarmV3SupportedChainId, string>

export const priceHelperTokens: Record<number, PriceHelper> = {
}

// for testing purposes
export const DEFAULT_COMMON_PRICE: Record<FarmV3SupportedChainId, CommonPrice> = {
}
