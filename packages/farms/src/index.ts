import { formatEther } from '@ethersproject/units'
import { MultiCallV2 } from '@pancakeswap/multicall'
import { masterChefAddresses } from './const'
import { farmV2FetchFarms, FetchFarmsParams, fetchMasterChefV2Data } from './fetchFarms'
import { chains } from '@icecreamswap/constants'

export const SUPPORT_FARMS = chains.filter((chain) => chain.features.includes('farms')).map((chain) => chain.id)
export const bCakeSupportedChainId = []
export { masterChefAddresses } from './const'

export function createFarmFetcher(multicallv2: MultiCallV2) {
  const fetchFarms = async (params: Pick<FetchFarmsParams, 'chainId' | 'farms'>) => {
    const { farms, chainId } = params
    const masterChefAddress = masterChefAddresses[chainId]
    const { poolLength, totalRegularAllocPoint, totalSpecialAllocPoint, icePerBlock } = await fetchMasterChefV2Data({
      multicallv2,
      masterChefAddress,
      chainId,
    })
    const regularCakePerBlock = formatEther(icePerBlock)
    const farmsWithPrice = await farmV2FetchFarms({
      multicallv2,
      masterChefAddress,
      chainId,
      farms: farms.filter((f) => !f.pid || poolLength.gt(f.pid)),
      totalRegularAllocPoint,
      totalSpecialAllocPoint,
    })

    return {
      farmsWithPrice,
      poolLength: poolLength.toNumber(),
      regularCakePerBlock: +regularCakePerBlock,
    }
  }
  return {
    fetchFarms,
    isChainSupported: (chainId: number) => SUPPORT_FARMS.includes(chainId),
    SUPPORT_FARMS,
  }
}

export * from './apr'
export * from './farmsPriceHelpers'
export * from './types'
export { getFarmsPriceHelperLpFiles } from '../constants/priceHelperLps/getFarmsPriceHelperLpFiles'
export { getFarmConfig, getStableConfig } from '../constants'
