import { ChainId } from '@pancakeswap/chains'
import { getChainlinkOracleContract } from 'utils/contractHelpers'
import { Address, useContractRead } from 'wagmi'

const getOracleAddress = (chainId: number): Address | null => {
  switch (chainId) {
    default:
      return null
  }
}

export const useOraclePrice = (chainId: number) => {
  const tokenAddress = getOracleAddress(chainId)
  const chainlinkOracleContract = getChainlinkOracleContract(tokenAddress, null, chainId)
  const { data: price } = useContractRead({
    abi: chainlinkOracleContract.abi,
    chainId,
    address: tokenAddress,
    functionName: 'latestAnswer',
    watch: true,
  })

  return price?.toString() ?? '0'
}
