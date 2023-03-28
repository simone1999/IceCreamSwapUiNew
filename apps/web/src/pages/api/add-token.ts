import { getChain } from '@icecreamswap/constants'
import { PrismaClient } from '@prisma/client'
import { Contract, ethers } from 'ethers'
import tokenDeployerAbi from '@passive-income/launchpad-contracts/abi/contracts/PSIPadTokenDeployer.sol/PSIPadTokenDeployer.json'
import { PSIPadTokenDeployer } from '@passive-income/launchpad-contracts/typechain/PSIPadTokenDeployer'

const client = new PrismaClient()

export default async function handler(req, res) {
  const { symbol, name, decimals, logo, address, chainId } = req.body

  // const chain = getChain(chainId)
  // const provider = new ethers.providers.JsonRpcProvider(chain.rpcUrls.default)
  // const tokenDeployer = new Contract(chain.tokenDeployer.address, tokenDeployerAbi, provider) as PSIPadTokenDeployer
  // tokenDeployer.on(tokenDeployer.filters.TokenCreated(owner), async (creator, address) => {
  //   if (creator !== owner) return
  await client.token.create({
    data: {
      address,
      symbol,
      name,
      decimals,
      logo,
      chainId,
    },
  })
  // })
  // setTimeout(() => {
  //   tokenDeployer.removeAllListeners()
  // }, 15000)

  res.json({ message: 'ok' })
}
