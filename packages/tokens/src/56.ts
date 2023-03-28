import { ChainId, WBNB, ERC20Token } from '@pancakeswap/sdk'

export const bscTokens = {
  usdt: new ERC20Token(ChainId.BSC, '0x55d398326f99059ff775485246999027b3197955', 18, 'USDT', 'Tether USD'),
  usdti: new ERC20Token(ChainId.BSC, '0x55d398326f99059ff775485246999027b3197955', 18, 'USDT', 'Tether USD'),
  ice: new ERC20Token(ChainId.BSC, '0xce6c9c70f91c6797873EFC80505f972290A88f5D', 18, 'ICE', 'IceToken', 'https://icecreamswap.com'),
  wbnb: WBNB[ChainId.BSC],
  bnb: new ERC20Token(
    ChainId.BSC,
    '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    18,
    'BNB',
    'BNB',
    'https://www.binance.com/',
  ),
}
