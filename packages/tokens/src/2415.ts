import { ERC20Token, WETH9 } from '@pancakeswap/sdk'
import { ChainId } from '@pancakeswap/chains'

export const xodexTokens = {
  wxodex: WETH9[ChainId.XODEX],
  ice: new ERC20Token(ChainId.XODEX, '0x81bCEa03678D1CEF4830942227720D542Aa15817', 18, 'ICE', 'IceCream', 'https://icecreamswap.com'),
  usdt: new ERC20Token(ChainId.XODEX, '0x54051D9DbE99687867090d95fe15C3D3E35512Ba', 18, 'USDT', 'Tether USD'),
}
