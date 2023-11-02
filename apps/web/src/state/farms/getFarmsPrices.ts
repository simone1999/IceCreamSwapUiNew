import { ChainId } from '@pancakeswap/chains'
import { Pair, WETH9 } from "@pancakeswap/sdk";
import { chains } from "@icecreamswap/constants";
import { coreTokens, USD } from "@pancakeswap/tokens";

export const nativeStableLpMap = {...chains.reduce((acc, chain) => {
  const wNative = WETH9[chain.id]
  const stable = USD[chain.id]
  if (!wNative || !stable) return acc
  return {...acc, [chain.id]: {
      address: Pair.getAddress(wNative, stable),
      wNative: wNative.symbol,
      stable: stable.symbol,
    }}
}, {}),
  [ChainId.CORE]: {
    address: Pair.getAddress(coreTokens.wcore_old, USD[ChainId.CORE]),
    wNative: coreTokens.wcore_old.symbol,
    stable: USD[ChainId.CORE].symbol,
  }
}
