import { ChainId } from '@pancakeswap/sdk'
import { Pool } from '@pancakeswap/uikit'
import addresses from 'config/constants/contracts'
import { VaultKey } from 'state/types'

export const getAddress = (address: Pool.Address, chainId: ChainId): string => {
  return address[chainId]
}

export const getMasterChefAddress = (chainId: ChainId) => {
  return getAddress(addresses.masterChef, chainId)
}
export const getMasterChefV1Address = () => {
  return null // getAddress(addresses.masterChefV1)
}
export const getMulticallAddress = (chainId: number) => {
  return getAddress(addresses.multiCall, chainId)
}
export const getLotteryV2Address = () => {
  return null // return getAddress(addresses.lotteryV2)
}
export const getPancakeProfileAddress = () => {
  return null // return getAddress(addresses.pancakeProfile)
}
export const getPancakeBunniesAddress = () => {
  return null // return getAddress(addresses.pancakeBunnies)
}
export const getBunnyFactoryAddress = () => {
  return null // return getAddress(addresses.bunnyFactory)
}
export const getPredictionsV1Address = () => {
  return null // return getAddress(addresses.predictionsV1)
}
export const getClaimRefundAddress = () => {
  return null // return getAddress(addresses.claimRefund)
}
export const getPointCenterIfoAddress = () => {
  return null // return getAddress(addresses.pointCenterIfo)
}
export const getBunnySpecialAddress = () => {
  return null // return getAddress(addresses.bunnySpecial)
}
export const getTradingCompetitionAddressEaster = () => {
  return null // return getAddress(addresses.tradingCompetitionEaster)
}
export const getTradingCompetitionAddressFanToken = () => {
  return null // return getAddress(addresses.tradingCompetitionFanToken)
}

export const getTradingCompetitionAddressMobox = () => {
  return null // return getAddress(addresses.tradingCompetitionMobox)
}

export const getTradingCompetitionAddressMoD = () => {
  return null // return getAddress(addresses.tradingCompetitionMoD)
}

export const getEasterNftAddress = () => {
  return null // return getAddress(addresses.easterNft)
}

export const getVaultPoolAddress = (vaultKey: VaultKey) => {
  if (!vaultKey) {
    return null
  }
  return null // return getAddress(addresses[vaultKey])
}

export const getCakeVaultAddress = () => {
  return null // return getAddress(addresses.cakeVault)
}

export const getCakeFlexibleSideVaultAddress = () => {
  return null // return getAddress(addresses.cakeFlexibleSideVault)
}

export const getBunnySpecialCakeVaultAddress = () => {
  return null // return getAddress(addresses.bunnySpecialCakeVault)
}
export const getBunnySpecialPredictionAddress = () => {
  return null // return getAddress(addresses.bunnySpecialPrediction)
}
export const getBunnySpecialLotteryAddress = () => {
  return null // return getAddress(addresses.bunnySpecialLottery)
}
export const getBunnySpecialXmasAddress = () => {
  return null // return getAddress(addresses.bunnySpecialXmas)
}
export const getFarmAuctionAddress = () => {
  return null // return getAddress(addresses.farmAuction)
}
export const getAnniversaryAchievement = () => {
  return null // return getAddress(addresses.AnniversaryAchievement)
}

export const getNftMarketAddress = () => {
  return null // return getAddress(addresses.nftMarket)
}
export const getNftSaleAddress = () => {
  return null // return getAddress(addresses.nftSale)
}
export const getPancakeSquadAddress = () => {
  return null // return getAddress(addresses.pancakeSquad)
}
export const getPotteryDrawAddress = () => {
  return null // return getAddress(addresses.potteryDraw)
}

export const getZapAddress = (chainId: ChainId) => {
  return getAddress(addresses.zap, chainId)
}
export const getICakeAddress = () => {
  return null // return getAddress(addresses.iCake)
}

export const getBCakeFarmBoosterAddress = () => {
  return null // return getAddress(addresses.bCakeFarmBooster)
}

export const getBCakeFarmBoosterProxyFactoryAddress = () => {
  return null // return getAddress(addresses.bCakeFarmBoosterProxyFactory)
}

export const getNonBscVaultAddress = (chainId?: number) => {
  return null // return getAddress(addresses.nonBscVault, chainId)
}

export const getCrossFarmingSenderAddress = (chainId?: number) => {
  return null // return getAddress(addresses.crossFarmingSender, chainId)
}

export const getCrossFarmingReceiverAddress = (chainId?: number) => {
  return null // return getAddress(addresses.crossFarmingReceiver, chainId)
}
