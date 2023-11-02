import { ERC20Token } from '@pancakeswap/sdk'
import { ChainId } from '@pancakeswap/chains'

export const coreWarningTokens = {
  layer0_scam: new ERC20Token(ChainId.CORE, '0xCF02cE7d48D3b2c97d36D4923654dC962E7d53ee', 9, 'Layer0', 'LayerZero', ''),
  future_ai: new ERC20Token(ChainId.CORE, '0xE635007044Bb8a762b3699c2538a9Af8720C6B42', 18, 'Future AI', 'Future AI', ''),
  icedao: new ERC20Token(ChainId.CORE, '0xCdF37dE71b7dad3684C3FC21b7a8d7c6e9bE9bcC', 18, 'ICEDAO', 'ICEDAO', ''),
  xcad: new ERC20Token(
    ChainId.BSC,
    '0x431e0cD023a32532BF3969CddFc002c00E98429d',
    18,
    'XCAD',
    'Chainport.io-Peg XCAD Token',
    'https://xcadnetwork.com/',
  ),
  lusd: new ERC20Token(
    ChainId.BSC,
    '0x23e8a70534308a4AAF76fb8C32ec13d17a3BD89e',
    18,
    'lUSD',
    'lUSD',
    'https://linear.finance/',
  ),
}
