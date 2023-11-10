import { ERC20Token, WETH9 } from '@pancakeswap/sdk'
import { ChainId } from '@pancakeswap/chains'

export const telosTokens = {
  wtlos: WETH9[ChainId.TELOS],
  ice: new ERC20Token(ChainId.TELOS, '0xB25cB6a275a8D6a613228FB161eB3627b50EB696', 18, 'ICE', 'IceCream', 'https://icecreamswap.com'),
  usdt: new ERC20Token(ChainId.TELOS, '0xc57F0eb99363e747D637B17BBdB4e1AB85e60631', 18, 'USDT', 'Tether USD'),
  usdt_m: new ERC20Token(ChainId.TELOS, '0xeFAeeE334F0Fd1712f9a8cc375f427D9Cdd40d73', 18, 'USDT', 'Tether USD (Multichain.org)'),
  usdc_m: new ERC20Token(ChainId.TELOS, '0x818ec0A7Fe18Ff94269904fCED6AE3DaE6d6dC0b', 18, 'USDC', 'Circle USD (Multichain.org)'),
}
