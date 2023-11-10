import { chains, ChainId } from '@icecreamswap/constants'
import { CHAIN_IDS } from "utils/wagmi";

export const SUPPORT_FARMS = chains.filter((chain) => chain.features.includes('farms')).map((chain) => chain.id)
export const SUPPORT_FARMS_V3 = chains.filter((chain) => chain.features.includes('farmsV3')).map((chain) => chain.id)

export const SUPPORT_ANY = CHAIN_IDS
export const SUPPORT_ONLY_BITGERT = [ChainId.BITGERT]

export const SUPPORT_SWAP = chains.filter((chain) => chain.features.includes('swap')).map((chain) => chain.id)
export const SUPPORT_SWAP_V3 = chains.filter((chain) => chain.features.includes('swapV3')).map((chain) => chain.id)
export const SUPPORT_AKKA_ROUTER = chains.filter((chain) => chain.features.includes('akkaRouter')).map((chain) => chain.id)
export const SUPPORT_STAKING = chains.filter((chain) => chain.features.includes('staking')).map((chain) => chain.id)
export const SUPPORT_INFO = chains.filter((chain) => chain.features.includes('info')).map((chain) => chain.id)
export const SUPPORT_BRIDGE = chains.filter((chain) => chain.features.includes('bridge')).map((chain) => chain.id)
export const SUPPORT_KYC = chains.filter((chain) => chain.features.includes('kyc')).map((chain) => chain.id)
export const SUPPORT_KYC_DELEGATION = chains.filter((chain) => chain.features.includes('kyc') && chain.kyc.contractKycDelegator).map((chain) => chain.id)
export const SUPPORT_LOCKS = chains.filter((chain) => chain.features.includes('locks')).map((chain) => chain.id)
export const SUPPORT_LAUNCHPAD = chains.filter((chain) => chain.features.includes('launchpad')).map((chain) => chain.id)
export const SUPPORT_TOKEN_DEPLOYER = chains.filter((chain) => chain.features.includes('tokenDeployer')).map((chain) => chain.id)
export const SUPPORT_BUY_CRYPTO: number[] = []
export const LIQUID_STAKING_SUPPORTED_CHAINS: number[] = []
export const V3_MIGRATION_SUPPORTED_CHAINS: number[] = []