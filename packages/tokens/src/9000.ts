import { ChainId, ERC20Token, WETH9 } from '@pancakeswap/sdk'

export const quaiTestnetTokens = {
  wquai: WETH9[ChainId.QUAI_TEST],
  ice: new ERC20Token(ChainId.QUAI_TEST, '0x008F456cC99f113A379BB643ABf9487CE24C9BA6',18,'ICE','IceCream'),
  usdt: new ERC20Token(ChainId.QUAI_TEST, '0x0034E13833AB7dE36A585ca1C8e82763BA823A96',18,'USDT','Tether USD'),
}
