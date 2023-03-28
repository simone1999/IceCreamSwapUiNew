import { FACTORY_ADDRESS, INIT_CODE_HASH } from '../common/swap'
import IceChain from '../ice-chain'

export const dogechain: IceChain = {
  id: 2000,
  name: 'Dogechain Mainnet',
  features: ['swap', 'bridge'],
  network: 'dogechain',
  rpcUrls: {
    public: 'https://rpc.dogechain.dog',
    default: 'https://rpc.dogechain.dog',
  },
  blockExplorers: {
    default: { name: 'Dogechain Explorer', url: 'https://explorer.dogechain.dog' },
  },
  nativeCurrency: {
    name: 'Dogecoin',
    symbol: 'DOGE',
    decimals: 18,
  },
  blockInterval: 2,
  multicall: {
    address: '0x3d2e33eb61677869d87ac92d3c8891ec5c57fa5b',
    blockCreated: 4308714,
  },
  wrappedNative: {
    address: '0xB7ddC6414bf4F5515b52D8BdD69973Ae205ff101',
    decimals: 18,
    symbol: 'WDOGE',
    name: 'Wrapped Doge',
  },
  swap: {
    factoryAddress: FACTORY_ADDRESS,
    initCodeHash: INIT_CODE_HASH,
  },
}
