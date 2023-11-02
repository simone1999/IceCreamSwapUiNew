import { WETH9, ERC20Token } from '@pancakeswap/sdk'
import { ChainId } from '@pancakeswap/chains'

export const baseTokens = {
  weth: WETH9[ChainId.BASE],
  ice: new ERC20Token(ChainId.BASE, '0x40375C92d9FAf44d2f9db9Bd9ba41a3317a2404f', 18, 'ICE', 'IceCream'),
  usdt: new ERC20Token(ChainId.BASE, '0xc0E49f8C615d3d4c245970F6Dc528E4A47d69a44', 18, 'USDT', 'Tether USD'),
}
