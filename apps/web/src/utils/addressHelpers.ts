import { ChainId } from '@pancakeswap/chains'
import addresses from 'config/constants/contracts'
import { VaultKey } from 'state/types'

export interface Addresses {
  [chainId: number]: `0x${string}`
}

export const getAddressFromMap = (address: Addresses, chainId?: number): `0x${string}` | null => {
  return address[chainId] ? address[chainId] : null
}

export const getAddressFromMapNoFallback = (address: Addresses, chainId?: number): `0x${string}` | null => {
  return address[chainId] ? address[chainId] : null
}

export const getMasterChefV2Address = (chainId?: number) => {
  return getAddressFromMap(addresses.masterChef, chainId)
}
export const getMulticallAddress = (chainId?: number) => {
  return getAddressFromMap(addresses.multiCall, chainId)
}
export const getLotteryV2Address = () => {
  return null // getAddressFromMap(addresses.lotteryV2)
}
export const getPancakeProfileAddress = () => {
  return null // getAddressFromMap(addresses.pancakeProfile)
}
export const getPancakeBunniesAddress = () => {
  return null // getAddressFromMap(addresses.pancakeBunnies)
}
export const getBunnyFactoryAddress = () => {
  return null // getAddressFromMap(addresses.bunnyFactory)
}
export const getPredictionsV1Address = () => {
  return null // getAddressFromMap(addresses.predictionsV1)
}
export const getPointCenterIfoAddress = () => {
  return null // getAddressFromMap(addresses.pointCenterIfo)
}
export const getTradingCompetitionAddressEaster = () => {
  return null // getAddressFromMap(addresses.tradingCompetitionEaster)
}
export const getTradingCompetitionAddressFanToken = () => {
  return null // getAddressFromMap(addresses.tradingCompetitionFanToken)
}

export const getTradingCompetitionAddressMobox = () => {
  return null // getAddressFromMap(addresses.tradingCompetitionMobox)
}

export const getTradingCompetitionAddressMoD = () => {
  return null // getAddressFromMap(addresses.tradingCompetitionMoD)
}

export const getVaultPoolAddress = (vaultKey: VaultKey) => {
  if (!vaultKey) {
    return null
  }
  return null // getAddressFromMap(addresses[vaultKey])
}

export const getCakeVaultAddress = (chainId?: number) => {
  return null // getAddressFromMap(addresses.cakeVault, chainId)
}

export const getCakeFlexibleSideVaultAddress = (chainId?: number) => {
  return null // getAddressFromMap(addresses.cakeFlexibleSideVault, chainId)
}

export const getFarmAuctionAddress = () => {
  return null // getAddressFromMap(addresses.farmAuction)
}

export const getNftMarketAddress = () => {
  return null // getAddressFromMap(addresses.nftMarket)
}
export const getNftSaleAddress = () => {
  return null // getAddressFromMap(addresses.nftSale)
}
export const getPancakeSquadAddress = () => {
  return null // getAddressFromMap(addresses.pancakeSquad)
}
export const getPotteryDrawAddress = () => {
  return null // getAddressFromMap(addresses.potteryDraw)
}

export const getZapAddress = (chainId?: number) => {
  return getAddressFromMap(addresses.zap, chainId)
}

export const getBCakeFarmBoosterAddress = () => {
  return null // getAddressFromMap(addresses.bCakeFarmBooster)
}

export const getBCakeFarmBoosterV3Address = (chainId?: number) => {
  return null // getAddressFromMap(addresses.bCakeFarmBoosterV3, chainId)
}

export const getBCakeFarmBoosterProxyFactoryAddress = () => {
  return null // getAddressFromMap(addresses.bCakeFarmBoosterProxyFactory)
}

export const getNonBscVaultAddress = (chainId?: number) => {
  return null // getAddressFromMap(addresses.nonBscVault, chainId)
}

export const getCrossFarmingSenderAddress = (chainId?: number) => {
  return null // getAddressFromMap(addresses.crossFarmingSender, chainId)
}

export const getCrossFarmingReceiverAddress = (chainId?: number) => {
  return null // getAddressFromMap(addresses.crossFarmingReceiver, chainId)
}

export const getStableSwapNativeHelperAddress = (chainId?: number) => {
  return getAddressFromMap(addresses.stableSwapNativeHelper, chainId)
}

export const getMasterChefV3Address = (chainId?: number) => {
  return getAddressFromMapNoFallback(addresses.masterChefV3, chainId)
}

export const getV3MigratorAddress = (chainId?: number) => {
  return getAddressFromMap(addresses.v3Migrator, chainId)
}

export const getTradingRewardAddress = (chainId?: number) => {
  return getAddressFromMap(addresses.tradingReward, chainId)
}

export const getV3AirdropAddress = (chainId?: number) => {
  return getAddressFromMap(addresses.v3Airdrop, chainId)
}

export const getAffiliateProgramAddress = (chainId?: number) => {
  return getAddressFromMap(addresses.affiliateProgram, chainId)
}

export const getTradingRewardTopTradesAddress = (chainId?: number) => {
  return getAddressFromMap(addresses.tradingRewardTopTrades, chainId)
}

export const getVCakeAddress = (chainId?: number) => {
  return null // getAddressFromMap(addresses.vCake, chainId)
}

export const getRevenueSharingPoolAddress = (chainId?: number) => {
  return getAddressFromMap(addresses.revenueSharingPool, chainId)
}

export const getAnniversaryAchievementAddress = (chainId?: number) => {
  return getAddressFromMap(addresses.anniversaryAchievement, chainId)
}

export const getFixedStakingAddress = (chainId?: number) => {
  return getAddressFromMap(addresses.fixedStaking, chainId)
}
