import { ChainId } from '@pancakeswap/chains'
import { Address } from 'viem'

// = 1 << 23 or 100000000000000000000000
export const V2_FEE_PATH_PLACEHOLDER = 8388608

export const MSG_SENDER = '0x0000000000000000000000000000000000000001'
export const ADDRESS_THIS = '0x0000000000000000000000000000000000000002'

export const MIXED_ROUTE_QUOTER_ADDRESSES = {
  [ChainId.CORE]: '0x049235E8B2a9a0A8C2d69B6A72A2dcc6d5757ab8',
} as const satisfies Record<ChainId, Address>

export const V3_QUOTER_ADDRESSES = {
  [ChainId.CORE]: '0xd755CC76f5e93D0780d88156A427502F54366264',
} as const satisfies Record<ChainId, Address>
