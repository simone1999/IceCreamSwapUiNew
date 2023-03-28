import { FACTORY_ADDRESS, INIT_CODE_HASH } from '../common/swap'
import IceChain from '../ice-chain'

export const xdc: IceChain = {
  id: 50,
  name: 'XinFin XDC Network',
  features: ['swap', 'bridge', 'farms', 'staking', 'locks'],
  network: 'xdc',
  rpcUrls: {
    public: 'https://erpc.xinfin.network',
    default: 'https://erpc.xinfin.network',
  },
  blockExplorers: {
    default: { name: 'XDC Explorer', url: 'https://xdcscan.io' },
  },
  nativeCurrency: {
    name: 'XDC',
    symbol: 'XDC',
    decimals: 18,
  },
  blockInterval: 2,
  multicall: {
    address: '0xf3a3dAf360161B2f10c645EF039C709A3Fd4Ea62',
    blockCreated: 53792616,
  },
  locks: {
    factoryAddress: '0xE4d6908351B613143AF81aaC6e34Eaa4b72acF5B',
  },
  wrappedNative: {
    address: '0x951857744785E80e2De051c32EE7b25f9c458C42',
    decimals: 18,
    symbol: 'WXDC',
    name: 'Wrapped XDC',
  },
  swap: {
    factoryAddress: FACTORY_ADDRESS,
    initCodeHash: INIT_CODE_HASH,
  },
}
