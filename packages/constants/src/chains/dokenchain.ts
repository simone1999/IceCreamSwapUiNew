import { FACTORY_ADDRESS, INIT_CODE_HASH } from '../common/swap'
import IceChain from '../ice-chain'

export const dokenchain: IceChain = {
  id: 61916,
  name: 'DoKEN Super Chain Mainnet',
  features: ['swap'],
  network: 'doken',
  rpcUrls: {
    public: 'https://nyrpc.doken.dev',
    default: 'https://nyrpc.doken.dev',
  },
  blockExplorers: {
    default: { name: 'Doken Explorer', url: 'https://explorer.doken.dev' },
  },
  nativeCurrency: {
    name: 'Doken',
    symbol: 'DKN',
    decimals: 18,
  },
  blockInterval: 10,
  multicall: {
    address: '0xb999ea90607a826a3e6e6646b404c3c7d11fa39d',
    blockCreated: 451563,
  },
  wrappedNative: {
    address: '0x27b45bCC26e01Ed50B4080A405D1c492FEe89d63',
    decimals: 18,
    symbol: 'WDKN',
    name: 'Wrapped DoKEN',
  },
  swap: {
    factoryAddress: FACTORY_ADDRESS,
    initCodeHash: INIT_CODE_HASH,
  },
}
