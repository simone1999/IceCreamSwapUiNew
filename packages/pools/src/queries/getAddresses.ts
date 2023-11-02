import { ChainId } from '@pancakeswap/chains'

import { ICE_FLEXIBLE_SIDE_VAULT, ICE_VAULT } from '../constants/contracts'
import { getContractAddress } from '../utils'

export function getCakeFlexibleSideVaultAddress(chainId: ChainId) {
  return getContractAddress(ICE_FLEXIBLE_SIDE_VAULT, chainId)
}

export function getCakeVaultAddress(chainId: ChainId) {
  return getContractAddress(ICE_VAULT, chainId)
}
