import { ChainId } from '@pancakeswap/chains'
import type { Address } from 'viem'

type MerklPool = {
  chainId: ChainId
  // lp address
  address: Address
  // link to merkl.angle.money
  link: string
}

export const MERKL_POOLS: MerklPool[] = [
]
