import { ChainId, ERC20Token } from '@pancakeswap/sdk'
import { bitgertTokens } from './32520'
import { dogechainTokens } from './2000'
import { dokenTokens } from './61916'
import { fuseTokens } from './122'
import { xdcTokens } from './50'
import { coreTokens } from "./1116";
import { xodexTokens } from "./2415";
import { shardeumTestnetTokens } from "./8082";
import {telosTokens} from "./40";
import { shimmerTestnetTokens } from "./1072";
import { baseTokens } from "./8453";
import { shimmerTokens } from "./148";
import { scrollTokens } from "./534352";
import { quaiTestnetTokens } from "./9000";

export const USD: Record<ChainId, ERC20Token> = {
  [ChainId.BITGERT]: bitgertTokens.usdti,
  [ChainId.DOGE]: dogechainTokens.usdt,
  [ChainId.DOKEN]: dokenTokens.usdt,
  [ChainId.FUSE]: fuseTokens.usdt,
  [ChainId.XDC]: xdcTokens.usdt,
  [ChainId.BSC]: bitgertTokens.usdti,  // todo: add proper BSC USDT
  [ChainId.CORE]: coreTokens.usdt,
  [ChainId.XODEX]: xodexTokens.usdt,
  [ChainId.SHARDEUM_TEST]: shardeumTestnetTokens.usdt,
  [ChainId.TELOS]: telosTokens.usdt,
  [ChainId.SHIMMER_TEST]: shimmerTestnetTokens.usdt,
  [ChainId.BASE]: baseTokens.usdt,
  [ChainId.SHIMMER]: shimmerTokens.usdt,
  [ChainId.SCROLL]: scrollTokens.usdt,
  [ChainId.QUAI_TEST]: quaiTestnetTokens.usdt,
}

export const ICE: Record<ChainId, ERC20Token> = {
  [ChainId.BITGERT]: bitgertTokens.ice,
  [ChainId.DOGE]: dogechainTokens.ice,
  [ChainId.DOKEN]: dokenTokens.ice,
  [ChainId.FUSE]: fuseTokens.ice,
  [ChainId.XDC]: xdcTokens.ice,
  [ChainId.BSC]: bitgertTokens.ice,  // todo: add proper BSC ICE
  [ChainId.CORE]: coreTokens.ice,
  [ChainId.XODEX]: xodexTokens.ice,
  [ChainId.SHARDEUM_TEST]: shardeumTestnetTokens.ice,
  [ChainId.TELOS]: telosTokens.ice,
  [ChainId.SHIMMER_TEST]: shimmerTestnetTokens.ice,
  [ChainId.BASE]: baseTokens.ice,
  [ChainId.SHIMMER]: shimmerTokens.ice,
  [ChainId.SCROLL]: scrollTokens.ice,
  [ChainId.QUAI_TEST]: quaiTestnetTokens.ice,
}
