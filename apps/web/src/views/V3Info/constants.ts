import { ChainId } from '@pancakeswap/chains'
import { ManipulateType } from 'dayjs'

export const v3InfoPath = `info/v3`

export const POOL_HIDE: { [key: string]: string[] } = {
  // TODO: update to our own
}

export const TOKEN_HIDE: { [key: string]: string[] } = {
}

export const TimeWindow: {
  [key: string]: ManipulateType
} = {
  DAY: 'day',
  WEEK: 'week',
  MONTH: 'month',
}

export const ONE_HOUR_SECONDS = 3600
export const ONE_DAY_SECONDS = 86400
export const MAX_UINT128 = 2n ** 128n - 1n

// todo: add subgraph start blocks
export const SUBGRAPH_START_BLOCK = {
}

export const NODE_REAL_ADDRESS_LIMIT = 50

export const DURATION_INTERVAL = {
  day: ONE_HOUR_SECONDS,
  week: ONE_DAY_SECONDS,
  month: ONE_DAY_SECONDS,
  year: ONE_DAY_SECONDS,
}
