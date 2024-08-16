import {ChainId, ERC20Token} from "@pancakeswap/sdk";
import {computePoolAddress, DEPLOYER_ADDRESSES} from "@pancakeswap/v3-sdk";


export default async function handler(req, res) {
  const { chainId: chainIdStr, tokenA, tokenB, fee: feeStr } = req.query
  const chainId = Number(chainIdStr)
  const feeAmount = Number(feeStr) * 10_000
  const deployerAddress = DEPLOYER_ADDRESSES[chainId as ChainId]
  const pairAddress = computePoolAddress({
    deployerAddress,
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
    fee: feeAmount
  })
  return res.json(pairAddress)
}
