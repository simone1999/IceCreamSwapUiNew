import { Address, PublicClient, formatUnits } from 'viem'
import BN from 'bignumber.js'
import { BIG_TWO, BIG_ZERO } from '@pancakeswap/utils/bigNumber'
import { ChainId } from '@pancakeswap/chains'
import { getFarmsPrices } from './farmPrices'
import { fetchPublicFarmsData } from './fetchPublicFarmData'
import { fetchStableFarmData } from './fetchStableFarmData'
import { isStableFarm, SerializedFarmConfig } from '../types'
import { getFullDecimalMultiplier } from './getFullDecimalMultiplier'
import { FarmV2SupportedChainId, supportedChainIdV2 } from '../const'

// todo: do this automatically. wrapped token and usd token is available for all chains and liquidity address can be calculated with Pair.getAddress from @pancakeswap/sdk.
const evmNativeStableLpMap: Record<
  FarmV2SupportedChainId,
  {
    address: Address
    wNative: string
    stable: string
  }
> = {
  [ChainId.BITGERT]: {
    address: '0x8e7dd0d762f60942e0bd05b1114d6cedf4435a18',
    wNative: 'WBRISE',
    stable: 'USDTi',
  },
  [ChainId.DOGE]: {
    address: '0x95b9d21a77e91b8c4b7c57628e9fc7d34d1d7379',
    wNative: 'WDOGE',
    stable: 'USDT',
  },
  [ChainId.DOKEN]: {
    address: '0x3ef68d91d420fecc9bbb1b95382f14a19de3f3bb',
    wNative: 'WDOKEN',
    stable: 'USDT',
  },
  [ChainId.FUSE]: {
    address: '0x0000000000000000000000000000000000000000',  // todo: add Fuse stable LP
    wNative: 'WFUSE',
    stable: 'USDT',
  },
  [ChainId.XDC]: {
    address: '0xe9450d66a493C3ae6eBC3Bb0B2B01a5107ea8bDb',
    wNative: 'WXDC',
    stable: 'USDT',
  },
  [ChainId.CORE]: {
    address: '0x5ebAE3A840fF34B107D637c8Ed07C3D1D2017178',
    wNative: 'WCORE',
    stable: 'USDT',
  },
  [ChainId.XODEX]: {
    address: '0xe3dd2db66c31b79ed7f4308a182262a904056a19',
    wNative: 'WXODEX',
    stable: 'USDT',
  },
  [ChainId.TELOS]: {
    address: '0x86CA8345bDa0D6052E93f07BE4dcC680Af927d53',
    wNative: 'WTLOS',
    stable: 'USDT',
  },
  [ChainId.BASE]: {
    address: '0xfCe2fcc39738DbCdFF2B4EfD9A0B142eC6BcE4AD',
    wNative: 'WETH',
    stable: 'USDT',
  },
  [ChainId.SHIMMER]: {
    address: '0x82A7F6a7C2f54a552349A2C59Ecb3ceca7BF4a60',
    wNative: 'WSMR',
    stable: 'USDT',
  },
  [ChainId.SCROLL]: {
    address: '0x98182F51fAcEaca17cAe1aF7b0b94B1E2c2D1BA0',
    wNative: 'WETH',
    stable: 'USDT',
  },
}

export const getTokenAmount = (balance: BN, decimals: number) => {
  return balance.div(getFullDecimalMultiplier(decimals))
}

export type FetchFarmsParams = {
  farms: SerializedFarmConfig[]
  provider: ({ chainId }: { chainId: number }) => PublicClient
  masterChefAddress: string
  chainId: number
  totalRegularAllocPoint: bigint
  totalSpecialAllocPoint: bigint
}

export async function farmV2FetchFarms({
  farms,
  provider,
  masterChefAddress,
  chainId,
  totalRegularAllocPoint,
  totalSpecialAllocPoint,
}: FetchFarmsParams) {
  if (!supportedChainIdV2.includes(chainId)) {
    return []
  }

  const stableFarms = farms.filter(isStableFarm)

  const [stableFarmsResults, poolInfos, lpDataResults] = await Promise.all([
    fetchStableFarmData(stableFarms, chainId, provider),
    fetchMasterChefData(farms, chainId, provider, masterChefAddress),
    fetchPublicFarmsData(farms, chainId, provider, masterChefAddress),
  ])

  const stableFarmsData = (stableFarmsResults as StableLpData[]).map(formatStableFarm)

  const stableFarmsDataMap = stableFarms.reduce<Record<number, FormatStableFarmResponse>>((map, farm, index) => {
    return {
      ...map,
      [farm.pid]: stableFarmsData[index],
    }
  }, {})

  const lpData = lpDataResults.map(formatClassicFarmResponse)

  const farmsData = farms.map((farm, index) => {
    try {
      return {
        ...farm,
        ...(stableFarmsDataMap[farm.pid]
          ? getStableFarmDynamicData({
              ...lpData[index],
              ...stableFarmsDataMap[farm.pid],
              token0Decimals: farm.token.decimals,
              token1Decimals: farm.quoteToken.decimals,
              price1: stableFarmsDataMap[farm.pid].price1,
            })
          : getClassicFarmsDynamicData({
              ...lpData[index],
              ...stableFarmsDataMap[farm.pid],
              token0Decimals: farm.token.decimals,
              token1Decimals: farm.quoteToken.decimals,
            })),
        ...getFarmAllocation({
          allocPoint: poolInfos[index]?.allocPoint,
          isRegular: poolInfos[index]?.isRegular,
          totalRegularAllocPoint,
          totalSpecialAllocPoint,
        }),
      }
    } catch (error) {
      console.error(error, farm, index, {
        allocPoint: poolInfos[index]?.allocPoint,
        isRegular: poolInfos[index]?.isRegular,
        token0Decimals: farm.token.decimals,
        token1Decimals: farm.quoteToken.decimals,
        totalRegularAllocPoint,
        totalSpecialAllocPoint,
      })
      throw error
    }
  })

  const farmsDataWithPrices = getFarmsPrices(farmsData, evmNativeStableLpMap[chainId as FarmV2SupportedChainId], 18)

  return farmsDataWithPrices
}

const masterChefV2Abi = [
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'poolInfo',
    outputs: [
      { internalType: 'uint256', name: 'accIcePerShare', type: 'uint256' },
      { internalType: 'uint256', name: 'lastRewardBlock', type: 'uint256' },
      { internalType: 'uint256', name: 'allocPoint', type: 'uint256' },
      { internalType: 'uint256', name: 'totalBoostedShare', type: 'uint256' },
      { internalType: 'bool', name: 'isRegular', type: 'bool' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'poolLength',
    outputs: [{ internalType: 'uint256', name: 'pools', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalRegularAllocPoint',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSpecialAllocPoint',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bool', name: '_isRegular', type: 'bool' }],
    name: 'icePerBlock',
    outputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const

const masterChefFarmCalls = (farm: SerializedFarmConfig, masterChefAddress: string) => {
  const { pid } = farm

  return pid || pid === 0
    ? ({
        abi: masterChefV2Abi,
        address: masterChefAddress as Address,
        functionName: 'poolInfo',
        args: [BigInt(pid)],
      } as const)
    : null
}

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined
}

export const fetchMasterChefData = async (
  farms: SerializedFarmConfig[],
  chainId: ChainId,
  provider: ({ chainId }: { chainId: number }) => PublicClient,
  masterChefAddress: string,
) => {
  try {
    const masterChefCalls = farms.map((farm) => masterChefFarmCalls(farm, masterChefAddress))
    const masterChefAggregatedCalls = masterChefCalls.filter(notEmpty)

    const masterChefMultiCallResult = await provider({ chainId }).multicall({
      contracts: masterChefAggregatedCalls,
      allowFailure: false,
    })

    let masterChefChunkedResultCounter = 0
    return masterChefCalls.map((masterChefCall) => {
      if (masterChefCall === null) {
        return null
      }
      const data = masterChefMultiCallResult[masterChefChunkedResultCounter]
      masterChefChunkedResultCounter++
      return {
        accCakePerShare: data[0],
        lastRewardBlock: data[1],
        allocPoint: data[2],
        totalBoostedShare: data[3],
        isRegular: data[4],
      }
    })
  } catch (error) {
    console.error('MasterChef Pool info data error', error)
    throw error
  }
}

export const fetchMasterChefV2Data = async ({
  provider,
  chainId,
  masterChefAddress,
}: {
  provider: ({ chainId }: { chainId: number }) => PublicClient
  chainId: ChainId
  masterChefAddress: Address
}) => {
  try {
    const [poolLength, totalRegularAllocPoint, totalSpecialAllocPoint, icePerBlock] = await provider({
      chainId,
    }).multicall({
      contracts: [
        {
          abi: masterChefV2Abi,
          address: masterChefAddress,
          functionName: 'poolLength',
        },
        {
          abi: masterChefV2Abi,
          address: masterChefAddress,
          functionName: 'totalRegularAllocPoint',
        },
        {
          abi: masterChefV2Abi,
          address: masterChefAddress,
          functionName: 'totalSpecialAllocPoint',
        },
        {
          abi: masterChefV2Abi,
          address: masterChefAddress,
          functionName: 'icePerBlock',
          args: [true],
        },
      ],
      allowFailure: false,
    })

    return {
      poolLength,
      totalRegularAllocPoint,
      totalSpecialAllocPoint,
      icePerBlock,
    }
  } catch (error) {
    console.error('Get MasterChef data error', error)
    throw error
  }
}

type StableLpData = [balanceResponse, balanceResponse, balanceResponse, balanceResponse]

type FormatStableFarmResponse = {
  tokenBalanceLP: BN
  quoteTokenBalanceLP: BN
  price1: bigint
}

const formatStableFarm = (stableFarmData: StableLpData): FormatStableFarmResponse => {
  const [balance1, balance2, , _price1] = stableFarmData
  return {
    tokenBalanceLP: new BN(balance1.toString()),
    quoteTokenBalanceLP: new BN(balance2.toString()),
    price1: _price1,
  }
}

const getStableFarmDynamicData = ({
  lpTokenBalanceMC,
  lpTotalSupply,
  quoteTokenBalanceLP,
  tokenBalanceLP,
  token0Decimals,
  token1Decimals,
  price1,
}: FormatClassicFarmResponse & {
  token1Decimals: number
  token0Decimals: number
  price1: bigint
}) => {
  // Raw amount of token in the LP, including those not staked
  const tokenAmountTotal = getTokenAmount(tokenBalanceLP, token0Decimals)
  const quoteTokenAmountTotal = getTokenAmount(quoteTokenBalanceLP, token1Decimals)

  // Ratio in % of LP tokens that are staked in the MC, vs the total number in circulation
  const lpTokenRatio =
    !lpTotalSupply.isZero() && !lpTokenBalanceMC.isZero() ? lpTokenBalanceMC.div(lpTotalSupply) : BIG_ZERO

  const tokenPriceVsQuote = formatUnits(price1, token0Decimals)

  // Amount of quoteToken in the LP that are staked in the MC
  const quoteTokenAmountMcFixed = quoteTokenAmountTotal.times(lpTokenRatio)

  // Amount of token in the LP that are staked in the MC
  const tokenAmountMcFixed = tokenAmountTotal.times(lpTokenRatio)

  const quoteTokenAmountMcFixedByTokenAmount = tokenAmountMcFixed.times(tokenPriceVsQuote)

  const lpTotalInQuoteToken = quoteTokenAmountMcFixed.plus(quoteTokenAmountMcFixedByTokenAmount)

  return {
    tokenAmountTotal: tokenAmountTotal.toString(),
    quoteTokenAmountTotal: quoteTokenAmountTotal.toString(),
    lpTotalSupply: lpTotalSupply.toString(),
    lpTotalInQuoteToken: lpTotalInQuoteToken.toString(),
    tokenPriceVsQuote,
  }
}

type balanceResponse = bigint

export type ClassicLPData = [balanceResponse, balanceResponse, balanceResponse, balanceResponse]

type FormatClassicFarmResponse = {
  tokenBalanceLP: BN
  quoteTokenBalanceLP: BN
  lpTokenBalanceMC: BN
  lpTotalSupply: BN
}

const formatClassicFarmResponse = (farmData: ClassicLPData): FormatClassicFarmResponse => {
  const [tokenBalanceLP, quoteTokenBalanceLP, lpTokenBalanceMC, lpTotalSupply] = farmData
  return {
    tokenBalanceLP: new BN(tokenBalanceLP.toString()),
    quoteTokenBalanceLP: new BN(quoteTokenBalanceLP.toString()),
    lpTokenBalanceMC: new BN(lpTokenBalanceMC.toString()),
    lpTotalSupply: new BN(lpTotalSupply.toString()),
  }
}

interface FarmAllocationParams {
  allocPoint?: bigint
  isRegular?: boolean
  totalRegularAllocPoint: bigint
  totalSpecialAllocPoint: bigint
}

const getFarmAllocation = ({
  allocPoint,
  isRegular,
  totalRegularAllocPoint,
  totalSpecialAllocPoint,
}: FarmAllocationParams) => {
  const _allocPoint = allocPoint ? new BN(allocPoint.toString()) : BIG_ZERO
  const totalAlloc = isRegular ? totalRegularAllocPoint : totalSpecialAllocPoint
  const poolWeight = !!totalAlloc && !!_allocPoint ? _allocPoint.div(totalAlloc.toString()) : BIG_ZERO

  return {
    poolWeight: poolWeight.toString(),
    multiplier: !_allocPoint.isZero() ? `${+_allocPoint.div(10).toString()}X` : `0X`,
  }
}

const getClassicFarmsDynamicData = ({
  lpTokenBalanceMC,
  lpTotalSupply,
  quoteTokenBalanceLP,
  tokenBalanceLP,
  token0Decimals,
  token1Decimals,
}: FormatClassicFarmResponse & {
  token0Decimals: number
  token1Decimals: number
  lpTokenStakedAmount?: string
}) => {
  // Raw amount of token in the LP, including those not staked
  const tokenAmountTotal = getTokenAmount(tokenBalanceLP, token0Decimals)
  const quoteTokenAmountTotal = getTokenAmount(quoteTokenBalanceLP, token1Decimals)

  // Ratio in % of LP tokens that are staked in the MC, vs the total number in circulation
  const lpTokenRatio =
    !lpTotalSupply.isZero() && !lpTokenBalanceMC.isZero() ? lpTokenBalanceMC.div(lpTotalSupply) : BIG_ZERO

  // // Amount of quoteToken in the LP that are staked in the MC
  const quoteTokenAmountMcFixed = quoteTokenAmountTotal.times(lpTokenRatio)

  // // Total staked in LP, in quote token value
  const lpTotalInQuoteToken = quoteTokenAmountMcFixed.times(BIG_TWO)

  return {
    tokenAmountTotal: tokenAmountTotal.toString(),
    quoteTokenAmountTotal: quoteTokenAmountTotal.toString(),
    lpTotalSupply: lpTotalSupply.toString(),
    lpTotalInQuoteToken: lpTotalInQuoteToken.toString(),
    tokenPriceVsQuote:
      !quoteTokenAmountTotal.isZero() && !tokenAmountTotal.isZero()
        ? quoteTokenAmountTotal.div(tokenAmountTotal).toString()
        : BIG_ZERO.toString(),
    lpTokenStakedAmount: lpTokenBalanceMC.toString(),
  }
}
