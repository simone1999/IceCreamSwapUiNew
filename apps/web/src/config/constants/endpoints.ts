import { ChainId } from '@pancakeswap/sdk'

export const INFO_CLIENT_BITGERT = 'https://graph-bitgert.icecreamswap.com/subgraphs/name/simone1999/icecreamswap-bitgert'
export const BLOCKS_CLIENT_BITGERT = 'https://graph-bitgert.icecreamswap.com/subgraphs/name/icecreamswap/blocks-bitgert'

export const INFO_CLIENT_XDC = 'https://graph-xdc.icecreamswap.com/subgraphs/name/simone1999/icecreamswap-xdc'
export const BLOCKS_CLIENT_XDC = 'https://graph-xdc.icecreamswap.com/subgraphs/name/icecreamswap/blocks-xdc'

export const INFO_CLIENT_CORE = 'https://graph-core.icecreamswap.com/subgraphs/name/simone1999/icecreamswap-core'
export const BLOCKS_CLIENT_CORE = 'https://graph-core.icecreamswap.com/subgraphs/name/icecreamswap/blocks-core'



export const STABLESWAP_SUBGRAPH_CLIENT = 'https://api.thegraph.com/subgraphs/name/pancakeswap/exchange-stableswap'
export const GRAPH_HEALTH = 'https://api.thegraph.com/index-node/graphql'

export const FARM_API = 'https://farms.pancake-swap.workers.dev'

export const BIT_QUERY = 'https://graphql.bitquery.io'

export const ACCESS_RISK_API = 'https://red.alert.pancakeswap.com/red-api'

export const CELER_API = 'https://api.celerscan.com/scan'

export const INFO_CLIENT_WITH_CHAIN = {
  [ChainId.BITGERT]: INFO_CLIENT_BITGERT,
  [ChainId.XDC]: INFO_CLIENT_XDC,
  [ChainId.CORE]: INFO_CLIENT_CORE,
}

export const BLOCKS_CLIENT_WITH_CHAIN: Partial<Record<ChainId, string>> = {
  [ChainId.BITGERT]: BLOCKS_CLIENT_BITGERT,
  [ChainId.XDC]: BLOCKS_CLIENT_XDC,
  [ChainId.CORE]: BLOCKS_CLIENT_CORE,
}
