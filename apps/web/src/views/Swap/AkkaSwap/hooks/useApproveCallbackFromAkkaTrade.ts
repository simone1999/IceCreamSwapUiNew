import { ROUTER_ADDRESS } from 'config/constants/exchange'
import { ChainId, Currency, CurrencyAmount } from '@pancakeswap/sdk'
import { useApproveCallback } from 'hooks/useApproveCallback'
import { useMemo } from 'react'
import { useActiveChainId } from 'hooks/useActiveChainId'

// wraps useApproveCallback in the context of a swap
export function useApproveCallbackFromAkkaTrade(inputAmount: CurrencyAmount<Currency>) {
  const amountToApprove = useMemo(() => inputAmount || undefined, [inputAmount])
  const { chainId } = useActiveChainId()
  return useApproveCallback(amountToApprove, ROUTER_ADDRESS[chainId].Akka)
}