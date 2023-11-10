import { ChainId } from '@pancakeswap/chains'
import { createPublicClient, http, PublicClient } from 'viem'
import { getChain } from '@icecreamswap/constants'


export const viemProviders = ({ chainId }: { chainId?: ChainId }): PublicClient => {
  return createPublicClient({ chain: getChain(chainId as number), transport: http() })
}