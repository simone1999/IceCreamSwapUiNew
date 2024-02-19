import { ChainId, CurrencyAmount, Pair, pancakePairV2ABI } from "@pancakeswap/sdk";
import { BIG_ZERO } from '@pancakeswap/utils/bigNumber'
import BigNumber from 'bignumber.js'
import { publicClient } from 'utils/wagmi'
import { FAST_INTERVAL } from 'config/constants'
import { useQuery } from '@tanstack/react-query'
import { ICE, USD } from "@pancakeswap/tokens";
import { useActiveChainId } from "hooks/useActiveChainId";

// for migration to bignumber.js to avoid breaking changes
export const useCakePrice = () => {
  const { chainId } = useActiveChainId()
  const { data } = useQuery<BigNumber, Error>({
    queryKey: ['cakePrice'],
    queryFn: async () => new BigNumber(await getIcePriceFromV2Pair(chainId)),
    staleTime: FAST_INTERVAL,
    refetchInterval: FAST_INTERVAL,
  })
  return data ?? BIG_ZERO
}

export const getCakePriceFromOracle = async () => {
  return undefined
  /*
  const data = await publicClient({ chainId: ChainId.BSC }).readContract({
    abi: chainlinkOracleABI,
    address: contracts.chainlinkOracleCAKE[ChainId.BSC],
    functionName: 'latestAnswer',
  })

  return formatUnits(data, 8)
  */
}

const getIcePriceFromV2Pair = async (chainId: ChainId) => {
  const pricingChain = chainId == ChainId.SHARDEUM_TEST? ChainId.SHARDEUM_TEST: ChainId.CORE
  const pairConfig = {
    address: Pair.getAddress(ICE[pricingChain], USD[pricingChain]),
    tokenA: ICE[pricingChain],
    tokenB: USD[pricingChain],
  }
  const client = publicClient({chainId: pricingChain})
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