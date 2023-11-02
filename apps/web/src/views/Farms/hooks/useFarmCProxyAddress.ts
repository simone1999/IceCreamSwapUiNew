import { ChainId } from '@pancakeswap/chains'
import { fetchCProxyAddress } from 'state/farms/fetchFarmUser'
import { farmFetcher } from 'state/farms'
import { Address } from 'wagmi'
import { useQuery } from '@tanstack/react-query'

export const useFarmCProxyAddress = (account?: string, chainId?: number) => {
  const { data } = useSWR(account && chainId && ['cProxyAddress', account, chainId], async () =>
    fetchCProxyAddress(account as Address, chainId),
  )

  return {
    cProxyAddress: data,
  }
}
