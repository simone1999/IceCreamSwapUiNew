import { ChainId } from './chainId'
import { chains } from '@icecreamswap/constants'

export const chainNames: Record<ChainId, string> = chains.reduce((acc, chain) => (
    {...acc, [chain.id]: chain.network}
), {})

export const chainNameToChainId = Object.entries(chainNames).reduce((acc, [chainId, chainName]) => {
  return {
    [chainName]: chainId as unknown as ChainId,
    ...acc,
  }
}, {} as Record<string, ChainId>)

// @see https://github.com/DefiLlama/defillama-server/blob/master/common/chainToCoingeckoId.ts
// @see https://github.com/DefiLlama/chainlist/blob/main/constants/chainIds.json
export const defiLlamaChainNames: Record<ChainId, string> = chains.reduce((acc, chain) => (
    {...acc, [chain.id]: ''}
), {})
