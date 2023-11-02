import { ChainId } from '@pancakeswap/chains'
import FarmsBitgertPriceHelper from './32520'
import FarmsCorePriceHelper from './1116'
import FarmsXodexPriceHelper from './2415'

// todo: make dynamic
export const getFarmsPriceHelperLpFiles = (chainId: ChainId) => {
  switch (chainId) {
    case ChainId.BITGERT:
      return FarmsBitgertPriceHelper
    case ChainId.CORE:
      return FarmsCorePriceHelper
    case ChainId.XODEX:
      return FarmsXodexPriceHelper
    default:
      return []
  }
}
