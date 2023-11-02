import { ChainId } from '@pancakeswap/chains'
import { Address } from 'viem'

// these are pancakeswap multicall contracts, they differ from the multicall contracts used in the rest of the project
export const MULTICALL_ADDRESS: { [key in ChainId]?: Address } = {
  [ChainId.CORE]: "0x7bfaa2D0Dc774bA417877Be8252dcede580Ba287",
}
