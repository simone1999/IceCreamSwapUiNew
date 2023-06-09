import { FACTORY_ADDRESS, INIT_CODE_HASH } from '../common/swap'
import IceChain from '../ice-chain'

export const xodex: IceChain = {
  id: 2415,
  name: 'XoDex',
  features: ['swap', 'bridge'],
  network: 'xodex',
  rpcUrls: {
    public: 'https://xo-dex.io',
    default: 'https://xo-dex.io',
  },
  blockExplorers: {
    default: { name: 'XoDex Explorer', url: 'https://explorer.xo-dex.com' },
  },
  nativeCurrency: {
    name: 'XoDex',
    symbol: 'XODEX',
    decimals: 18,
  },
  multicall: {
    address: '0xf3a3dAf360161B2f10c645EF039C709A3Fd4Ea62',
    blockCreated: 4339985,
  },
  blockInterval: 3.6,
  wrappedNative: {
    address: '0x2F3AD0cdC8AD20337eb02bD6411b808EE30c7896',
    decimals: 18,
    symbol: 'WXODEX',
    name: 'Wrapped XODEX',
  },
  swap: {
    factoryAddress: FACTORY_ADDRESS,
    initCodeHash: INIT_CODE_HASH,
  },
}
