import { ChainId } from '@pancakeswap/chains'
import { ICE } from '@pancakeswap/tokens'
import { BIG_ZERO } from '@pancakeswap/utils/bigNumber'
import BigNumber from 'bignumber.js'
import { useMemo } from 'react'

import { Address, erc20ABI, useAccount, useBalance, useContractRead } from 'wagmi'
import { useActiveChainId } from './useActiveChainId'

const useTokenBalance = (tokenAddress: Address, forceBitgert?: boolean) => {
  const { address: account } = useAccount()
  const { chainId } = useActiveChainId()

  const { data, status, ...rest } = useContractRead({
    chainId: forceBitgert ? ChainId.BITGERT : chainId,
    abi: erc20ABI,
    address: tokenAddress,
    functionName: 'balanceOf',
    args: [account],
    enabled: !!account,
    watch: true,
  })

  return {
    ...rest,
    fetchStatus: status,
    balance: useMemo(() => (typeof data !== 'undefined' ? new BigNumber(data.toString()) : BIG_ZERO), [data]),
  }
}

export const useGetBnbBalance = () => {
  const { address: account } = useAccount()
  const { status, refetch, data } = useBalance({
    chainId: ChainId.BSC,
    address: account,
    watch: true,
    enabled: !!account,
  })

  return { balance: data?.value ? BigInt(data.value) : 0n, fetchStatus: status, refresh: refetch }
}

export const useBitgertIceBalance = () => {
  const { balance, fetchStatus } = useTokenBalance(ICE[ChainId.BITGERT]?.address, true)

  return { balance: BigInt(balance.toString()), fetchStatus }
}

export const useGetIceBalance = () => {
  const { chainId } = useActiveChainId()
  const { balance, fetchStatus } = useTokenBalance(ICE[chainId]?.address)

  return { balance: BigInt(balance.toString()), fetchStatus }
}

export default useTokenBalance
