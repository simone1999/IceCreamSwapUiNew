import { Token } from '@pancakeswap/sdk'
import { ChainId } from '@pancakeswap/chains'
import { coreWarningTokens } from 'config/constants/warningTokens'

interface WarningTokenList {
  [chainId: number]: {
    [key: string]: Token
  }
}

const SwapWarningTokens = <WarningTokenList>{
  [ChainId.CORE]: coreWarningTokens,
}

export default SwapWarningTokens
