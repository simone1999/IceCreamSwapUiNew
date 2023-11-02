import { ChainId } from '@pancakeswap/chains'

// Cost for crossing an uninitialized tick.
export const COST_PER_UNINIT_TICK = 0n

export const BASE_SWAP_COST_V3 = (id: ChainId): bigint => {
  switch (id) {
    case ChainId.BSC:
      return 2000n
    default:
      return 0n
  }
}
export const COST_PER_INIT_TICK = (id: ChainId): bigint => {
  switch (id) {
    case ChainId.BSC:
      return 31000n
    default:
      return 0n
  }
}

export const COST_PER_HOP_V3 = (id: ChainId): bigint => {
  switch (id) {
    case ChainId.BSC:
      return 80000n
    default:
      return 0n
  }
}
