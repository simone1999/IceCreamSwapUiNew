import { BridgeChain, bridgeChains } from '../config'
import { hasTokenSupplies } from './helpers'

const makeHandleCheckSupplies =
  (homeChainConfig?: BridgeChain) => async (amount: number, tokenAddress: string, destinationChainId: number) => {
    if (homeChainConfig) {
      const destinationChain = bridgeChains.find((c) => c.networkId === destinationChainId)
      const token = homeChainConfig.tokens.find((t) => t.address === tokenAddress)

      if (destinationChain?.type === 'Ethereum' && token) {
        const hasSupplies = await hasTokenSupplies(destinationChain, token, amount)
        if (!hasSupplies) {
          return false
        }
      }
      return true
    }
    return false
  }
export default makeHandleCheckSupplies
