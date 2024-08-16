import {computePairAddress, ERC20Token, FACTORY_ADDRESS_MAP} from "@pancakeswap/sdk";


export default async function handler(req, res) {
  const { chainId: chainIdStr, tokenA, tokenB } = req.query
  const chainId = Number(chainIdStr)
  const factoryAddress = FACTORY_ADDRESS_MAP[chainId as keyof typeof FACTORY_ADDRESS_MAP]
  const pairAddress = computePairAddress({
    factoryAddress,
    tokenA: new ERC20Token(
      chainId,
      tokenA,
      18,
      ""
    ),
    tokenB: new ERC20Token(
      chainId,
      tokenB,
      18,
      ""
    ),
  })
  return res.json(pairAddress)
}
