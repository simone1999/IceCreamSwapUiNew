import { ChainId } from '@pancakeswap/sdk'

import { ChainMap, BatchMulticallConfigs } from '../types'

const DEFAULT = {
  defaultConfig: {
    multicallChunk: 150,
    gasLimitOverride: 1_000_000,
  },
  gasErrorFailureOverride: {
    gasLimitOverride: 1_000_000,
    multicallChunk: 30,
  },
  successRateFailureOverrides: {
    gasLimitOverride: 1_000_000,
    multicallChunk: 40,
  },
}

export const BATCH_MULTICALL_CONFIGS: ChainMap<BatchMulticallConfigs> = {
  [ChainId.CORE]: DEFAULT,
  [ChainId.BITGERT]: DEFAULT,
  [ChainId.XDC]: DEFAULT,
  [ChainId.FUSE]: DEFAULT,
  // [ChainId.DOGECHAIN]: DEFAULT,
  [ChainId.BSC]: DEFAULT,
}
