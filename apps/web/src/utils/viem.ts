import { ChainId } from '@pancakeswap/chains'
import { CHAINS } from 'config/chains'
import { createPublicClient, http, fallback, PublicClient } from 'viem'

export const viemClients = CHAINS.reduce((prev, cur) => {
  return {
    ...prev,
    [cur.id]: createPublicClient({
      chain: cur,
      transport: fallback(
        cur.rpcUrls.public.http.map((url) =>
          http(url, {
            timeout: 15_000,
          }),
        ),
        {
          rank: false,
        },
      ),
      batch: {
        multicall: {
          batchSize: 1024 * 200,
          wait: 16,
        },
      },
      pollingInterval: 6_000,
    }),
  }
}, {} as Record<ChainId, PublicClient>)

export const getViemClients = ({ chainId }: { chainId?: ChainId }) => {
  return viemClients[chainId]
}
