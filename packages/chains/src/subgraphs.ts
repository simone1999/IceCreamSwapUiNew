import { ChainId } from './chainId'
import { chains } from '@icecreamswap/constants'

export const V3_SUBGRAPHS: Record<ChainId, string> = chains.reduce((acc, chain) => (
    {...acc, [chain.id]: `https://the-graph.icecreamswap.com/subgraphs/name/icecreamswap/exchange-v3-${chain.network}`}
), {})


export const V2_SUBGRAPHS: Record<ChainId, string> = chains.reduce((acc, chain) => (
    {...acc, [chain.id]: `https://the-graph.icecreamswap.com/subgraphs/name/icecreamswap/exchange-v2-${chain.network}`}
), {})