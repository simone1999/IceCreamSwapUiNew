import { ChainId } from '@pancakeswap/chains'

export const SUPPORTED_CHAIN_IDS = [ChainId.CORE, ChainId.BITGERT, ChainId.XDC]

export type SupportedChainId = (typeof SUPPORTED_CHAIN_IDS)[number]
