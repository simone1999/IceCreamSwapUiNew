import { ChainId } from '@pancakeswap/chains'
import { CurrencyAmount, Pair, pancakePairV2ABI } from "@pancakeswap/sdk";
import { BIG_ZERO } from '@pancakeswap/utils/bigNumber'
import BigNumber from 'bignumber.js'
import { chainlinkOracleABI } from 'config/abi/chainlinkOracle'
import contracts from 'config/constants/contracts'
import { publicClient } from 'utils/wagmi'
import { formatUnits } from 'viem'
import { FAST_INTERVAL } from 'config/constants'
import { useQuery } from '@tanstack/react-query'
import { usePublicClient } from "wagmi";
import { ICE, USD } from "@pancakeswap/tokens";

// for migration to bignumber.js to avoid breaking changes
export const useCakePrice = ({ enabled = true } = {}) => {
  const { data } = useQuery<BigNumber, Error>({
    queryKey: ['cakePrice'],
    queryFn: async () => new BigNumber(await getIcePriceFromV2Pair()),
    staleTime: FAST_INTERVAL,
    refetchInterval: FAST_INTERVAL,
    enabled,
  })
  return data ?? BIG_ZERO
}

export const getCakePriceFromOracle = async () => {
  return getIcePriceFromV2Pair()
  /*
  const data = await publicClient({ chainId: ChainId.BSC }).readContract({
    abi: chainlinkOracleABI,
    address: contracts.chainlinkOracleCAKE[ChainId.BSC],
    functionName: 'latestAnswer',
  })

  return formatUnits(data, 8)
  */
}

const getIcePriceFromV2Pair = async () => {
  const pairConfig = {
    address: Pair.getAddress(ICE[ChainId.BITGERT], USD[ChainId.BITGERT]),
    tokenA: ICE[ChainId.BITGERT],
    tokenB: USD[ChainId.BITGERT],
  }
  const client = publicClient({chainId: ChainId.BITGERT})
  const [reserve0, reserve1] = await client.readContract({
    abi: pancakePairV2ABI,
    address: pairConfig.address,
    functionName: 'getReserves',
  })

  const { tokenA, tokenB } = pairConfig

  const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA]

  const pair = new Pair(
    CurrencyAmount.fromRawAmount(token0, reserve0.toString()),
    CurrencyAmount.fromRawAmount(token1, reserve1.toString()),
  )
  return pair.priceOf(tokenA).toSignificant(6)
}