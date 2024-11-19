import { FACTORY_ADDRESS, INIT_CODE_HASH, ROUTER_ADDRESS } from "../common/swap";
import IceChain from '../ice-chain'

export const xodex: IceChain = {
  id: 2415,
  name: 'XODEX',
  features: ['swap', 'farms', 'bridge'],
  network: 'xodex',
  rpcUrls: {
    public: { http: ['https://xo-dex.io'] },
    default: { http: ['https://xo-dex.io'] },
  },
  blockExplorers: {
    default: { name: 'XoDex Explorer', url: 'https://explorer.xo-dex.com' },
  },
  nativeCurrency: {
    name: 'XoDex',
    symbol: 'XODEX',
    decimals: 18,
  },
  contracts: {
    multicall3: {
      address: '0xf3a3dAf360161B2f10c645EF039C709A3Fd4Ea62',
      blockCreated: 4339985,
    },
  },
  blockInterval: 3.6,
  wrappedNative: {
    address: '0x2F3AD0cdC8AD20337eb02bD6411b808EE30c7896',
    decimals: 18,
    symbol: 'WXODEX',
    name: 'Wrapped XODEX',
  },
  iceAddress: '0x81bCEa03678D1CEF4830942227720D542Aa15817',
  stableToken: {
    address: '0x54051D9DbE99687867090d95fe15C3D3E35512Ba',
    decimals: 18,
    symbol: 'USDT',
    name: 'Tether USD',
  },
  swap: {
    factoryAddress: FACTORY_ADDRESS,
    routerAddress: ROUTER_ADDRESS,
    initCodeHash: INIT_CODE_HASH,
  },
  farmV2Address: '0xBD2e577dEa54602C7c367fa144981c8ACA6FD570',
}
