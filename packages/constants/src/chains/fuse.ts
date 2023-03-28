import { FACTORY_ADDRESS, INIT_CODE_HASH } from '../common/swap'
import IceChain from '../ice-chain'

export const fuse: IceChain = {
  id: 122,
  name: 'Fuse Mainnet',
  features: ['swap', 'bridge'],
  network: 'fuse',
  rpcUrls: {
    public: 'https://rpc.fuse.io',
    default: 'https://rpc.fuse.io',
  },
  blockExplorers: {
    default: { name: 'Fuse Explorer', url: 'https://explorer.fuse.io' },
  },
  nativeCurrency: {
    name: 'Fuse',
    symbol: 'FUSE',
    decimals: 18,
  },
  blockInterval: 5,
  multicall: {
    address: '0x43891084581fD07Ee1189f3a2f04e51c26a95B77',
    blockCreated: 20060779,
  },
  wrappedNative: {
    address: '0x0BE9e53fd7EDaC9F859882AfdDa116645287C629',
    decimals: 18,
    symbol: 'WFUSE',
    name: 'Wrapped Fuse',
  },
  swap: {
    factoryAddress: FACTORY_ADDRESS,
    initCodeHash: INIT_CODE_HASH,
  },
}
