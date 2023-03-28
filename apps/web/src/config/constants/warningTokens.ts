import { ChainId, ERC20Token } from '@pancakeswap/sdk'

export const coreWarningTokens = {
  layer0_scam: new ERC20Token(ChainId.CORE, '0xCF02cE7d48D3b2c97d36D4923654dC962E7d53ee', 9, 'Layer0', 'LayerZero', ''),
  future_ai: new ERC20Token(ChainId.CORE, '0xE635007044Bb8a762b3699c2538a9Af8720C6B42', 18, 'Future AI', 'Future AI', ''),
}

export const bscTestnetWarningTokens = {}
