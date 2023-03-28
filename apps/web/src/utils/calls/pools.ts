/* eslint-disable import/prefer-default-export */
import BigNumber from 'bignumber.js'
import poolsConfig from 'config/constants/pools'
import sousChefV2 from 'config/abi/sousChefV2.json'
import multicall from '../multicall'
import { bscRpcProvider } from '../providers'
import { getAddress } from '../addressHelpers'
import {ChainId} from "@pancakeswap/sdk";

/**
 * Returns the total number of pools that were active at a given block
 */
export const getActivePools = async (chainId: ChainId, block: number) => {
  const eligiblePools = poolsConfig
    .filter((pool) => chainId in pool.contractAddress)
    .filter((pool) => pool.sousId !== 0)
    .filter((pool) => pool.isFinished === false || pool.isFinished === undefined)
  const blockNumber = block
  const startBlockCalls = eligiblePools.map(({ contractAddress }) => ({
    address: getAddress(contractAddress, chainId),
    name: 'startBlock',
  }))
  const endBlockCalls = eligiblePools.map(({ contractAddress }) => ({
    address: getAddress(contractAddress, chainId),
    name: 'bonusEndBlock',
  }))
  const [startBlocks, endBlocks] = await Promise.all([
    multicall(sousChefV2, startBlockCalls, chainId),
    multicall(sousChefV2, endBlockCalls, chainId),
  ])

  return eligiblePools.reduce((accum, poolCheck, index) => {
    const startBlock = startBlocks[index] ? new BigNumber(startBlocks[index]) : null
    const endBlock = endBlocks[index] ? new BigNumber(endBlocks[index]) : null

    if (!startBlock || !endBlock) {
      return accum
    }

    if (startBlock.gte(blockNumber) || endBlock.lte(blockNumber)) {
      return accum
    }

    return [...accum, poolCheck]
  }, [])
}
