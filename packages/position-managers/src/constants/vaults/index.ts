import { ChainId } from '@pancakeswap/chains'

import { PCSDuoTokenVaultConfig, VaultConfig } from '../../types'
import { SupportedChainId } from '../supportedChains'
import { MANAGER } from '../managers'

export type VaultsConfigByChain = {
  [chainId in SupportedChainId]: VaultConfig[]
}

export const VAULTS_CONFIG_BY_CHAIN = {
}

export function isPCSVaultConfig(config: VaultConfig): config is PCSDuoTokenVaultConfig {
  return config.manager === MANAGER.PCS || config.manager === MANAGER.BRIL
}
