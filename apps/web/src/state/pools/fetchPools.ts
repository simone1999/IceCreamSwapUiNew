import BigNumber from 'bignumber.js'
import fromPairs from 'lodash/fromPairs'
import { BigNumber as EthersBigNumber } from '@ethersproject/bignumber'
import poolsConfig from 'config/constants/pools'
import sousChefABI from 'config/abi/sousChef.json'
import erc20ABI from 'config/abi/erc20.json'
import multicall, { multicallv2 } from 'utils/multicall'
import { getAddress } from 'utils/addressHelpers'
import { BIG_ZERO } from '@pancakeswap/utils/bigNumber'
import chunk from 'lodash/chunk'
import sousChefV2 from '../../config/abi/sousChefV2.json'
import sousChefV3 from '../../config/abi/sousChefV3.json'
import {ChainId} from "@pancakeswap/sdk";

const livePoolsWithEnd = poolsConfig.filter((p) => p.sousId !== 0 && !p.isFinished)

export const fetchPoolsBlockLimits = async (chainId: ChainId) => {
  const startEndBlockRaw = await multicall(sousChefABI, livePoolsWithEnd.filter((poolConfig) => chainId in poolConfig.contractAddress).flatMap((poolConfig) => {
    return [
      {
        address: getAddress(poolConfig.contractAddress, chainId),
        name: 'startBlock',
      },
      {
        address: getAddress(poolConfig.contractAddress, chainId),
        name: 'bonusEndBlock',
      },
    ]
  }), chainId)

  const startEndBlockResult = startEndBlockRaw.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / 2)

    if (!resultArray[chunkIndex]) {
      // eslint-disable-next-line no-param-reassign
      resultArray[chunkIndex] = [] // start a new chunk
    }

    resultArray[chunkIndex].push(item)

    return resultArray
  }, [])

  return livePoolsWithEnd.filter((poolConfig) => chainId in poolConfig.contractAddress).map((cakePoolConfig, index) => {
    const [[startBlock], [endBlock]] = startEndBlockResult[index]
    return {
      sousId: cakePoolConfig.sousId,
      startBlock: startBlock.toNumber(),
      endBlock: endBlock.toNumber(),
    }
  })
}

export const fetchPoolsTotalStaking = async (chainId: ChainId) => {
  const poolsTotalStaked = await multicall(sousChefABI, poolsConfig.filter((poolConfig) => chainId in poolConfig.contractAddress).map((poolConfig) => {
    return {
      address: getAddress(poolConfig.contractAddress, chainId),
      name: 'stakedTokenAmount',
    }
  }), chainId)

  return poolsConfig.filter((poolConfig) => chainId in poolConfig.contractAddress).map((p, index) => ({
    sousId: p.sousId,
    totalStaked: new BigNumber(poolsTotalStaked[index]).toJSON(),
  }))
}

export const fetchPoolsStakingLimits = async (
  poolsWithStakingLimit: number[],
  chainId: ChainId,
): Promise<{ [key: string]: { stakingLimit: BigNumber; numberBlocksForUserLimit: number } }> => {
  const validPools = poolsConfig
    .filter((poolConfig) => chainId in poolConfig.contractAddress)
    .filter((p) => !p.isFinished)
    .filter((p) => !poolsWithStakingLimit.includes(p.sousId))

  // Get the staking limit for each valid pool
  const poolStakingCalls = validPools
    .map((validPool) => {
      const contractAddress = getAddress(validPool.contractAddress, chainId)
      return ['hasUserLimit', 'poolLimitPerUser', 'numberBlocksForUserLimit'].map((method) => ({
        address: contractAddress,
        name: method,
      }))
    })
    .flat()

  // @ts-ignore fix chainId support
  const poolStakingResultRaw = await multicallv2({
    abi: sousChefV2,
    calls: poolStakingCalls,
    chainId,
    options: { requireSuccess: false },
  })
  const chunkSize = poolStakingCalls.length / validPools.length
  const poolStakingChunkedResultRaw = chunk(poolStakingResultRaw.flat(), chunkSize)
  return fromPairs(
    poolStakingChunkedResultRaw.map((stakingLimitRaw, index) => {
      const hasUserLimit = stakingLimitRaw[0]
      const stakingLimit = hasUserLimit && stakingLimitRaw[1] ? new BigNumber(stakingLimitRaw[1].toString()) : BIG_ZERO
      const numberBlocksForUserLimit = stakingLimitRaw[2] ? (stakingLimitRaw[2] as EthersBigNumber).toNumber() : 0
      return [validPools[index].sousId, { stakingLimit, numberBlocksForUserLimit }]
    }),
  )
}

const livePoolsWithV3 = poolsConfig.filter((pool) => pool?.version === 3 && pool?.isFinished === false)

export const fetchPoolsProfileRequirement = async (chainId: ChainId): Promise<{
  [key: string]: {
    required: boolean
    thresholdPoints: string
  }
}> => {
  const poolProfileRequireCalls = livePoolsWithV3.filter((poolConfig) => chainId in poolConfig.contractAddress)
    .map((validPool) => {
      const contractAddress = getAddress(validPool.contractAddress, chainId)
      return ['pancakeProfileIsRequested', 'pancakeProfileThresholdPoints'].map((method) => ({
        address: contractAddress,
        name: method,
      }))
    })
    .flat()

  // @ts-ignore fix chainId support
  const poolProfileRequireResultRaw = await multicallv2({
    abi: sousChefV3,
    calls: poolProfileRequireCalls,
    chainId,
    options: { requireSuccess: false },
  })
  const chunkSize = poolProfileRequireCalls.length / livePoolsWithV3.length
  const poolStakingChunkedResultRaw = chunk(poolProfileRequireResultRaw.flat(), chunkSize)
  return fromPairs(
    poolStakingChunkedResultRaw.map((poolProfileRequireRaw, index) => {
      const hasProfileRequired = poolProfileRequireRaw[0]
      const profileThresholdPoints = poolProfileRequireRaw[1]
        ? new BigNumber(poolProfileRequireRaw[1].toString())
        : BIG_ZERO
      return [
        livePoolsWithV3[index].sousId,
        {
          required: !!hasProfileRequired,
          thresholdPoints: profileThresholdPoints.toJSON(),
        },
      ]
    }),
  )
}
