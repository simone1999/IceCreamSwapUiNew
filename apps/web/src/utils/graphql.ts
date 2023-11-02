import { ChainId } from '@pancakeswap/chains'
import {
  BIT_QUERY,
  STABLESWAP_SUBGRAPH_CLIENT,
  V3_SUBGRAPH_URLS,
  INFO_CLIENT_WITH_CHAIN
} from 'config/constants/endpoints'
import { GraphQLClient } from 'graphql-request'

// Extra headers
// Mostly for dev environment
// No production env check since production preview might also need them
export const getGQLHeaders = (endpoint: string) => {
  return undefined
}

export const infoClientWithChain = (chainId: number) => {
  if (INFO_CLIENT_WITH_CHAIN[chainId]) {
    return new GraphQLClient(INFO_CLIENT_WITH_CHAIN[chainId], {
      headers: getGQLHeaders(INFO_CLIENT_WITH_CHAIN[chainId]),
    })
  }
  return undefined
}

export const v3Clients = Object.values(ChainId).reduce((acc, chainId) => (
  chainId in V3_SUBGRAPH_URLS? {
    ...acc, [chainId]: new GraphQLClient(V3_SUBGRAPH_URLS[chainId])
  }: acc
), {})


export const v3InfoClients = v3Clients

export const v2Clients = Object.values(ChainId).reduce((acc, chainId) => (
  chainId in INFO_CLIENT_WITH_CHAIN? {
    ...acc, [chainId]: new GraphQLClient(INFO_CLIENT_WITH_CHAIN[chainId])
  }: acc
), {})

export const infoStableSwapClient = new GraphQLClient(STABLESWAP_SUBGRAPH_CLIENT)

export const stableSwapClient = new GraphQLClient(STABLESWAP_SUBGRAPH_CLIENT)

export const bitQueryServerClient = new GraphQLClient(BIT_QUERY, {
  headers: {
    // only server, no `NEXT_PUBLIC` not going to expose in client
    'X-API-KEY': process.env.BIT_QUERY_HEADER || '',
  },
  timeout: 5000,
})
