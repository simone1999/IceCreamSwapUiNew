import { ERC20Token, WETH9 } from '@pancakeswap/sdk'
import { ChainId } from '@pancakeswap/chains'

export const shimmerTokens = {
  wsmr: WETH9[ChainId.SHIMMER],
  ice: new ERC20Token(ChainId.SHIMMER, '0x40375C92d9FAf44d2f9db9Bd9ba41a3317a2404f', 18, 'ICE', 'IceCream', 'https://icecreamswap.com'),
  usdt: new ERC20Token(ChainId.SHIMMER, '0xc0E49f8C615d3d4c245970F6Dc528E4A47d69a44', 18, 'USDT', 'Tether USD'),
}
