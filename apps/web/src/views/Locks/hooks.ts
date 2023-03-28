import { useContract } from 'hooks/useContract'
import { useActiveChain } from 'hooks/useActiveChain'
import tokenLockFactoryAbi from './abi.json'
import { PSIPadTokenLockFactory } from '@passive-income/launchpad-contracts/typechain/PSIPadTokenLockFactory'
import useSWR from 'swr'
import { useAccount } from 'wagmi'
import { multicallv2 } from 'utils/multicall'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { BigNumber } from 'ethers'

/** Based on solidity struct */
export interface LockingData {
  owner: string
  token: string
  amount: BigNumber
  // eslint-disable-next-line camelcase
  start_time: BigNumber
  duration: BigNumber
  amountUnlocked: BigNumber
}

export const useLocks = () => {
  const chain = useActiveChain()

  return useContract<PSIPadTokenLockFactory>(chain.locks?.factoryAddress, tokenLockFactoryAbi, true)
}

export const useLockingData = (lockIds?: BigNumber[]) => {
  const locks = useLocks()
  const { chainId } = useActiveChainId()

  return useSWR(
    lockIds && locks ? ['lock', JSON.stringify(lockIds)] : null,
    async () => {
      const multicallResult = await multicallv2<LockingData[]>({
        abi: tokenLockFactoryAbi,
        calls: lockIds
          .map((lockId) => [
            {
              address: locks.address,
              name: 'tokensLocked',
              params: [lockId],
            },
            {
              address: locks.address,
              name: 'amountToUnlock',
              params: [lockId],
            },
          ])
          .flat(),
        chainId,
      })
      let i = 0
      return lockIds
        .map((lockId) => {
          const lockingData = multicallResult[i]
          const [amountToUnlock] = multicallResult[i + 1] as unknown as BigNumber[]
          i += 2
          return {
            lockId,
            ...lockingData,
            amountToUnlock,
          }
        })
        .reverse()
    },
    {
      refreshInterval: 10000,
    },
  )
}

export type Lock = ReturnType<typeof useLockingData>['data'][number]

export const useLocksByUser = (account?: string) => {
  const locks = useLocks()

  const activeAccount = useAccount()
  const user = account ?? activeAccount.address

  const { data: lockIds } = useSWR(user && locks ? ['locks', user] : null, () => locks.getUserLocks(user), {
    refreshInterval: 10000,
  })
  return useLockingData(lockIds)
}

export const useLocksByToken = (tokenAddress?: string) => {
  const locks = useLocks()

  const { data: lockIds } = useSWR(
    tokenAddress && locks ? ['locks', tokenAddress] : null,
    () => locks.getTokenLocks(tokenAddress),
    {
      refreshInterval: 10000,
    },
  )
  return useLockingData(lockIds)
}
