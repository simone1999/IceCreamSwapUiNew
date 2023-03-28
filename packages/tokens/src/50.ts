import {ChainId, ERC20Token, WETH9} from '@pancakeswap/sdk'

export const xdcTokens = {
  wxdc: WETH9[ChainId.XDC],
  ice: new ERC20Token(ChainId.XDC, '0x54051D9DbE99687867090d95fe15C3D3E35512Ba', 18, 'ICE', 'IceCream', 'https://icecreamswap.com'),
  usdt: new ERC20Token(ChainId.XDC, '0xc57F0eb99363e747D637B17BBdB4e1AB85e60631', 18, 'USDT', 'Tether USD'),
  usdc: new ERC20Token(ChainId.XDC, '0xB25cB6a275a8D6a613228FB161eB3627b50EB696', 18, 'USDC', 'USD Coin'),
  btcx: new ERC20Token(ChainId.XDC, '0xb6E57fBB2D44092f75d9da2769FFc788ce931320', 8, 'BTCx', 'BitcoinX'),
  usplus: new ERC20Token(ChainId.XDC, '0xc280EbcD651d2a0C8D4bb49151062C9eEF55d370', 6, 'US+', 'USPLUS'),
}
