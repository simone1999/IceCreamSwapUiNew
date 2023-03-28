import { ChainId } from '@pancakeswap/sdk'
import FarmsBitgertPriceHelper from './32520'
import FarmsCorePriceHelper from './1116'

export const getFarmsPriceHelperLpFiles = (chainId: ChainId) => {
  switch (chainId) {
    case ChainId.BITGERT:
      return FarmsBitgertPriceHelper
    case ChainId.CORE:
      return FarmsCorePriceHelper
    default:
      return []
  }
}
