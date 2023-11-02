import BN from 'bignumber.js'
import { formatUnits } from 'viem'
import { SerializedFarmConfig, FarmWithPrices } from '@pancakeswap/farms'
import { CurrencyAmount, Pair } from '@pancakeswap/sdk'
import { ChainId } from '@pancakeswap/chains'
import { USD, ICE } from '@pancakeswap/tokens'
import { farmFetcher } from './helper'
import { FarmKV, FarmResult } from './kv'
import { updateLPsAPR } from './lpApr'
import { viemProviders } from './provider'

// copy from src/config, should merge them later
const BSC_BLOCK_TIME = 3
const BLOCKS_PER_YEAR = (60 / BSC_BLOCK_TIME) * 60 * 24 * 365 // 10512000

const FIXED_ZERO = new BN(0)
const FIXED_100 = new BN(100)

export const getFarmCakeRewardApr = (farm: FarmWithPrices, cakePriceBusd: BN, regularCakePerBlock: number) => {
  let cakeRewardsAprAsString = '0'
  if (!cakePriceBusd) {
    return cakeRewardsAprAsString
  }
  const totalLiquidity = new BN(farm.lpTotalInQuoteToken).times(new BN(farm.quoteTokenPriceBusd))
  const poolWeight = new BN(farm.poolWeight)
  if (totalLiquidity.isZero() || poolWeight.isZero()) {
    return cakeRewardsAprAsString
  }
  const yearlyCakeRewardAllocation = poolWeight
    ? poolWeight.times(new BN(BLOCKS_PER_YEAR).times(new BN(String(regularCakePerBlock))))
    : FIXED_ZERO
  const cakeRewardsApr = yearlyCakeRewardAllocation.times(cakePriceBusd).div(totalLiquidity).times(FIXED_100)
  if (!cakeRewardsApr.isZero()) {
    cakeRewardsAprAsString = cakeRewardsApr.toFixed(2)
  }
  return cakeRewardsAprAsString
}

const pairAbi = [
  {
    inputs: [],
    name: 'getReserves',
    outputs: [
      {
        internalType: 'uint112',
        name: 'reserve0',
        type: 'uint112',
      },
      {
        internalType: 'uint112',
        name: 'reserve1',
        type: 'uint112',
      },
      {
        internalType: 'uint32',
        name: 'blockTimestampLast',
        type: 'uint32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const

const iceUsdPairMap = {
  [ChainId.BITGERT]: {
    address: Pair.getAddress(ICE[ChainId.BITGERT], USD[ChainId.BITGERT]),
    tokenA: ICE[ChainId.BITGERT],
    tokenB: USD[ChainId.BITGERT],
  },
  [ChainId.DOGE]: {
    address: Pair.getAddress(ICE[ChainId.DOGE], USD[ChainId.DOGE]),
    tokenA: ICE[ChainId.DOGE],
    tokenB: USD[ChainId.DOGE],
  },
  [ChainId.DOKEN]: {
    address: Pair.getAddress(ICE[ChainId.DOKEN], USD[ChainId.DOKEN]),
    tokenA: ICE[ChainId.DOKEN],
    tokenB: USD[ChainId.DOKEN],
  },
  [ChainId.FUSE]: {
    address: Pair.getAddress(ICE[ChainId.FUSE], USD[ChainId.FUSE]),
    tokenA: ICE[ChainId.FUSE],
    tokenB: USD[ChainId.FUSE],
  },
  [ChainId.CORE]: {
    address: Pair.getAddress(ICE[ChainId.CORE], USD[ChainId.CORE]),
    tokenA: ICE[ChainId.CORE],
    tokenB: USD[ChainId.CORE],
  },
  [ChainId.XODEX]: {
    address: Pair.getAddress(ICE[ChainId.XODEX], USD[ChainId.XODEX]),
    tokenA: ICE[ChainId.XODEX],
    tokenB: USD[ChainId.XODEX],
  },
}

const getIcePrice = async () => {
  const pairConfig = iceUsdPairMap[ChainId.CORE]
  const client = viemProviders({chainId: ChainId.CORE})
  const [reserve0, reserve1] = await client.readContract({
    abi: pairAbi,
    address: pairConfig.address,
    functionName: 'getReserves',
  })

  const { tokenA, tokenB } = pairConfig

  const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA]

  const pair = new Pair(
    CurrencyAmount.fromRawAmount(token0, reserve0.toString()),
    CurrencyAmount.fromRawAmount(token1, reserve1.toString()),
  )

  return pair.priceOf(tokenA)
}

const farmConfigApi = 'https://9636755c.farms-config-5x5.pages.dev'

export async function saveFarms(chainId: number, event: ScheduledEvent | FetchEvent) {
  try {
    const farmsConfig = await (await fetch(`${farmConfigApi}/${chainId}.json`)).json<SerializedFarmConfig[]>()
    let lpPriceHelpers: SerializedFarmConfig[] = []
    try {
      lpPriceHelpers = await (
        await fetch(`${farmConfigApi}/farms/lists/priceHelperLps/${chainId}.json`)
      ).json<SerializedFarmConfig[]>()
    } catch (error) {
      console.error('Get LP price helpers error', error)
    }

    if (!farmsConfig) {
      throw new Error(`Farms config not found ${chainId}`)
    }
    const { farmsWithPrice, poolLength, regularCakePerBlock } = await farmFetcher.fetchFarms({
      chainId,
      farms: farmsConfig.concat(lpPriceHelpers),
    })

    const iceBusdPrice = await getIcePrice()
    const lpAprs = await handleLpAprs(chainId, farmsConfig)

    const finalFarm = farmsWithPrice.map((f) => {
      return {
        ...f,
        lpApr: lpAprs?.[f.lpAddress.toLowerCase()] || 0,
        cakeApr: getFarmCakeRewardApr(f, new BN(iceBusdPrice.toSignificant(3)), regularCakePerBlock),
      }
    }) as FarmResult

    const savedFarms = {
      updatedAt: new Date().toISOString(),
      poolLength,
      regularCakePerBlock,
      data: finalFarm,
    }

    event.waitUntil(FarmKV.saveFarms(chainId, savedFarms))

    return savedFarms
  } catch (error) {
    console.error('[ERROR] fetching farms', error)
    throw error
  }
}

export async function handleLpAprs(chainId: number, farmsConfig?: SerializedFarmConfig[]) {
  let lpAprs = await FarmKV.getApr(chainId)
  if (!lpAprs) {
    lpAprs = await saveLPsAPR(chainId, farmsConfig)
  }
  return lpAprs || {}
}

export async function saveLPsAPR(chainId: number, farmsConfig?: SerializedFarmConfig[]) {
  // TODO: add other chains
  if ([ChainId.CORE, ChainId.BITGERT, ChainId.TELOS, ChainId.BASE].includes(chainId)) {
    let data = farmsConfig
    if (!data) {
      const value = await FarmKV.getFarms(chainId)
      if (value && value.data) {
        // eslint-disable-next-line prefer-destructuring
        data = value.data
      }
    }
    if (data) {
      const aprMap = (await updateLPsAPR(chainId, data)) || null
      FarmKV.saveApr(chainId, aprMap)
      return aprMap || null
    }
    return null
  }
  return null
}

const chainlinkAbi = [
  {
    inputs: [],
    name: 'latestAnswer',
    outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const

export async function fetchIcePrice() {
  /*
  const address = '0xB6064eD41d4f67e353768aA239cA86f4F73665a1'
  const latestAnswer = await viemProviders(ChainId.CORE).readContract({
    abi: chainlinkAbi,
    address,
    functionName: 'latestAnswer',
  })

  return formatUnits(latestAnswer, 8)
  */
  return Number((await getIcePrice()).toSignificant())
}
