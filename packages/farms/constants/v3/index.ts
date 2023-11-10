import { ChainId } from '@pancakeswap/chains'
import { ComputedFarmConfigV3 } from '../../src/types'
import { farmsV3 as farm1116 } from '../1116'

export const farmsV3ConfigChainMap: Record<ChainId, ComputedFarmConfigV3[]> = {
  [ChainId.CORE]: farm1116,
}
