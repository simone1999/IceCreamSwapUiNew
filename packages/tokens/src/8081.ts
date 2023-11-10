import { WETH9, ERC20Token } from '@pancakeswap/sdk'
import { ChainId } from '@pancakeswap/chains'

export const shardeumTestnetTokens = {
  wshm: WETH9[ChainId.SHARDEUM_TEST],
  ice: new ERC20Token(ChainId.SHARDEUM_TEST, '0xBD2e577dEa54602C7c367fa144981c8ACA6FD570', 18, 'ICE', 'IceCream'),
  usdt: new ERC20Token(ChainId.SHARDEUM_TEST, '0xb5C7882e37359572FD1cCFAA276e7Fdf70145D42', 18, 'USDT', 'Tether USD'),
}
