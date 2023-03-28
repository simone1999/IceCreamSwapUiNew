import { ChainId, ERC20Token } from '@pancakeswap/sdk'
import { bitgertTokens } from './32520'
import { dogechainTokens } from './2000'
import { dokenTokens } from './61916'
import { fuseTokens } from './122'
import { xdcTokens } from './50'
import {coreTokens} from "./1116";

export const USD: Record<ChainId, ERC20Token> = {
  [ChainId.BITGERT]: bitgertTokens.usdti,
  [ChainId.DOGE]: dogechainTokens.usdt,
  [ChainId.DOKEN]: dokenTokens.usdt,
  [ChainId.FUSE]: fuseTokens.usdt,
  [ChainId.XDC]: xdcTokens.usdt,
  [ChainId.BSC]: bitgertTokens.usdti,  // todo: add proper BSC USDT
  [ChainId.CORE]: coreTokens.usdt,
}

export const ICE: Record<ChainId, ERC20Token> = {
  [ChainId.BITGERT]: bitgertTokens.ice,
  [ChainId.DOGE]: dogechainTokens.ice,
  [ChainId.DOKEN]: dokenTokens.ice,
  [ChainId.FUSE]: fuseTokens.ice,
  [ChainId.XDC]: xdcTokens.ice,
  [ChainId.BSC]: bitgertTokens.ice,  // todo: add proper BSC ICE
  [ChainId.CORE]: coreTokens.ice,
}
