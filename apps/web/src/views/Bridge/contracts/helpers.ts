import { getProvider } from '@wagmi/core'
import { BridgeChain, TokenConfig } from '../config'
import { Erc20DetailedFactory } from './Erc20DetailedFactory'
import { utils } from 'ethers'
import { Web3Provider } from '@ethersproject/providers'
import { BigNumber } from '@ethersproject/bignumber'

export const hasTokenSupplies = async (destinationChain: BridgeChain, token: TokenConfig, amount: number) => {
  const { BridgeFactory, ERC20HandlerPercentageFeeFactory } = await import('@chainsafe/chainbridge-contracts')
  const destinationToken = destinationChain?.tokens.find(
    (_token: TokenConfig) => _token.resourceId === token.resourceId,
  )
  if (destinationToken && destinationChain !== undefined && destinationChain.type === 'Ethereum') {
    const provider = getProvider({ chainId: destinationChain.networkId })

    const destinationBridge = BridgeFactory.connect(destinationChain.bridgeAddress, provider)
    await provider.ready
    const erc20destinationToken = Erc20DetailedFactory.connect(destinationToken.address, provider)
    const destinationNativeCoin = destinationToken.address === '0x0000000000000000000000000000000000000000'

    const destinationErc20Handler = await destinationBridge._resourceIDToHandlerAddress(destinationToken.resourceId)

    const destinationErc20DHandlerInstance = ERC20HandlerPercentageFeeFactory.connect(destinationErc20Handler, provider)
    const isMintable = await destinationErc20DHandlerInstance._burnList(destinationToken.address)
    if (isMintable) {
      console.log('token mintable on destination chain')
      return true
    }
    let balanceTokens
    let erc20Decimals: number | undefined
    if (!destinationNativeCoin) {
      balanceTokens = await erc20destinationToken.balanceOf(destinationErc20Handler)
      erc20Decimals = await erc20destinationToken.decimals()
    } else {
      balanceTokens = await erc20destinationToken.provider.getBalance(destinationErc20Handler)
      erc20Decimals = 18
    }

    const amountAvailable = Number(utils.formatUnits(balanceTokens, erc20Decimals))
    if (amountAvailable < amount) {
      console.log('Not enough token balance on destination chain! wanted:', amount, 'available:', amountAvailable)
      return false
    }
    return true
  }
  return false
}

export async function detectEIP1559MaxFeePerGas(provider: Web3Provider): Promise<boolean> {
  try {
    const feeData = await provider.getFeeData()
    if (typeof feeData.maxFeePerGas !== 'undefined') {
      return true
    }
  } catch (error) {
    console.warn(error)
    console.warn("Can't access fee data for EIP-1559, fallback to legacy transaction")
  }
  return false
}

export async function getPriceCompatibility(
  provider: Web3Provider | undefined,
  homeChainConfig: any,
  gasPrice: number,
) {
  let gasPriceCompatibility: string | undefined
  if (provider) {
    const hasMaxPrice = await detectEIP1559MaxFeePerGas(provider)
    if (!hasMaxPrice) {
      gasPriceCompatibility = BigNumber.from(
        utils.parseUnits((homeChainConfig.defaultGasPrice || gasPrice).toString(), 9),
      ).toString()
    }
  }
  return gasPriceCompatibility
}
