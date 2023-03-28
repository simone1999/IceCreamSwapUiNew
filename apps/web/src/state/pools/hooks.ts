import { useEffect, useMemo } from 'react'
import { useWeb3React } from '@pancakeswap/wagmi'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { batch, useSelector } from 'react-redux'
import { useAppDispatch } from 'state'
import { useFastRefreshEffect, useSlowRefreshEffect } from 'hooks/useRefreshEffect'
import { featureFarmApiAtom, useFeatureFlag } from 'hooks/useFeatureFlag'
import { FAST_INTERVAL } from 'config/constants'
import useSWRImmutable from 'swr/immutable'
import { getFarmConfig } from '@pancakeswap/farms/constants'
import { livePools } from 'config/constants/pools'
import { Pool } from '@pancakeswap/uikit'
import {ChainId, Token, WETH9} from '@pancakeswap/sdk'
import { USD, ICE } from '@pancakeswap/tokens'

import { useActiveChainId } from 'hooks/useActiveChainId'
import {
  fetchPoolsPublicDataAsync,
  fetchPoolsUserDataAsync,
  fetchCakeVaultPublicData,
  fetchCakeVaultUserData,
  fetchCakeVaultFees,
  fetchPoolsStakingLimitsAsync,
  fetchUserIfoCreditDataAsync,
  fetchIfoPublicDataAsync,
  fetchCakeFlexibleSideVaultPublicData,
  fetchCakeFlexibleSideVaultUserData,
  fetchCakeFlexibleSideVaultFees,
  fetchCakePoolUserDataAsync,
  fetchCakePoolPublicDataAsync,
} from '.'
import { VaultKey } from '../types'
import { fetchFarmsPublicDataAsync } from '../farms'
import {
  makePoolWithUserDataLoadingSelector,
  makeVaultPoolByKey,
  poolsWithVaultSelector,
  ifoCreditSelector,
  ifoCeilingSelector,
  makeVaultPoolWithKeySelector,
} from './selectors'

const lPoolAddresses = livePools.filter(({ sousId }) => sousId !== 0).map(({ earningToken }) => earningToken.address)

// Only fetch farms for live pools
const getActiveFarms = async (chainId: number) => {
  const farmsConfig = await getFarmConfig(chainId)
  const weth = WETH9[chainId]
  const usd = USD[chainId]
  const ice = ICE[chainId]

  return farmsConfig
    .filter(
      ({ token, pid, quoteToken }) =>
        ((token.symbol === ice.symbol && quoteToken.symbol === weth.symbol) ||
          (token.symbol === usd.symbol && quoteToken.symbol === weth.symbol) ||
          lPoolAddresses.find((poolAddress) => poolAddress === token.address)),
    )
    .map((farm) => farm.pid)
}

const getCakePriceFarms = async (chainId: number) => {
  const farmsConfig = await getFarmConfig(chainId)
  const weth = WETH9[chainId]
  const usd = USD[chainId]
  const ice = ICE[chainId]

  return farmsConfig
    .filter(
      ({ token, pid, quoteToken }) =>
        ((token.symbol === ice.symbol && quoteToken.symbol === weth.symbol) ||
          (token.symbol === usd.symbol && quoteToken.symbol === weth.symbol)),
    )
    .map((farm) => farm.pid)
}

export const useFetchPublicPoolsData = () => {
  const dispatch = useAppDispatch()
  const { chainId } = useActiveChainId()
  const farmFlag = useFeatureFlag(featureFarmApiAtom)

  useSlowRefreshEffect(
    (currentBlock) => {
      const fetchPoolsDataWithFarms = async () => {
        const activeFarms = await getActiveFarms(chainId)
        await dispatch(fetchFarmsPublicDataAsync({ pids: activeFarms, chainId, flag: farmFlag }))

        batch(() => {
          dispatch(fetchPoolsPublicDataAsync(currentBlock, chainId))
          dispatch(fetchPoolsStakingLimitsAsync(chainId))
        })
      }

      fetchPoolsDataWithFarms()
    },
    [dispatch, chainId, farmFlag],
  )
}

export const usePool = (sousId: number): { pool: Pool.DeserializedPool<Token>; userDataLoaded: boolean } => {
  const poolWithUserDataLoadingSelector = useMemo(() => makePoolWithUserDataLoadingSelector(sousId), [sousId])
  return useSelector(poolWithUserDataLoadingSelector)
}

export const usePoolsWithVault = () => {
  return useSelector(poolsWithVaultSelector)
}

export const useDeserializedPoolByVaultKey = (vaultKey) => {
  const vaultPoolWithKeySelector = useMemo(() => makeVaultPoolWithKeySelector(vaultKey), [vaultKey])

  return useSelector(vaultPoolWithKeySelector)
}

export const usePoolsPageFetch = () => {
  const { account } = useWeb3React()
  const dispatch = useAppDispatch()
  const { chainId } = useActiveChainId()
  useFetchPublicPoolsData()

  useFastRefreshEffect(() => {
    batch(() => {
      dispatch(fetchCakeVaultPublicData(chainId))
      dispatch(fetchCakeFlexibleSideVaultPublicData(chainId))
      dispatch(fetchIfoPublicDataAsync())
      if (account) {
        dispatch(fetchPoolsUserDataAsync({ account, chainId }))
        dispatch(fetchCakeVaultUserData({ account, chainId }))
        dispatch(fetchCakeFlexibleSideVaultUserData({ account }))
      }
    })
  }, [account, dispatch, chainId])

  useEffect(() => {
    batch(() => {
      dispatch(fetchCakeVaultFees(chainId))
      dispatch(fetchCakeFlexibleSideVaultFees(chainId))
    })
  }, [dispatch, chainId])
}

export const useCakeVaultUserData = () => {
  const { account } = useWeb3React()
  const { chainId } = useActiveChainId()
  const dispatch = useAppDispatch()

  useFastRefreshEffect(() => {
    if (account) {
      dispatch(fetchCakeVaultUserData({ account, chainId }))
    }
  }, [account, dispatch, chainId])
}

export const useCakeVaultPublicData = (chainId: ChainId) => {
  const dispatch = useAppDispatch()
  useFastRefreshEffect(() => {
    dispatch(fetchCakeVaultPublicData(chainId))
  }, [dispatch, chainId])
}

export const useFetchIfo = () => {
  const { account, chainId } = useActiveWeb3React()
  const dispatch = useAppDispatch()
  const farmFlag = useFeatureFlag(featureFarmApiAtom)

  useSWRImmutable(
    'fetchIfoPublicData',
    async () => {
      const cakePriceFarms = await getCakePriceFarms(chainId)
      await dispatch(fetchFarmsPublicDataAsync({ pids: cakePriceFarms, chainId, flag: farmFlag }))
      batch(() => {
        dispatch(fetchCakePoolPublicDataAsync(chainId))
        dispatch(fetchCakeVaultPublicData(chainId))
        dispatch(fetchIfoPublicDataAsync())
      })
    },
    {
      refreshInterval: FAST_INTERVAL,
    },
  )

  useSWRImmutable(
    account && 'fetchIfoUserData',
    async () => {
      batch(() => {
        dispatch(fetchCakePoolUserDataAsync(account, chainId))
        dispatch(fetchCakeVaultUserData({ account, chainId }))
        dispatch(fetchUserIfoCreditDataAsync(account))
      })
    },
    {
      refreshInterval: FAST_INTERVAL,
    },
  )

  useSWRImmutable('fetchCakeVaultFees', async () => {
    dispatch(fetchCakeVaultFees(chainId))
  })
}

export const useCakeVault = () => {
  return useVaultPoolByKey(VaultKey.CakeVault)
}

export const useVaultPoolByKey = (key: VaultKey) => {
  const vaultPoolByKey = useMemo(() => makeVaultPoolByKey(key), [key])

  return useSelector(vaultPoolByKey)
}

export const useIfoCredit = () => {
  return useSelector(ifoCreditSelector)
}

export const useIfoCeiling = () => {
  return useSelector(ifoCeilingSelector)
}
