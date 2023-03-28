import { Token } from '@pancakeswap/sdk'
import {coreWarningTokens} from 'config/constants/warningTokens'


interface WarningTokenList {
  [key: string]: Token
}

const SwapWarningTokens = <WarningTokenList>{
  ...coreWarningTokens
}

export default SwapWarningTokens
