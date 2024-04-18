import { FACTORY_ADDRESS, INIT_CODE_HASH, ROUTER_ADDRESS } from "../common/swap";
import IceChain from '../ice-chain'

export const arbitrum: IceChain = {
  id: 42161,
  name: 'Arbitrum One',
  features: ['swap'],
  network: 'arbitrum',
  rpcUrls: {
    public: { http: ['https://arbitrum-one.publicnode.com',] },
    default: { http: ['https://arbitrum-one.publicnode.com',] },
  },
  blockExplorers: {
    default: { name: 'Arbitrum One Explorer', url: 'https://arbiscan.io' },
  },
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  contracts: {
    multicall3: {
      address: '0x16A3247Db4588176c24C6A5F6d3fd2C174122DF5',
      blockCreated: 202100344,
    },
  },
  blockInterval: 1,
  wrappedNative: {
    address: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
    decimals: 18,
    symbol: 'WETH',
    name: 'Wrapped Ether',
  },
  stableToken: {
    address: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
    decimals: 6,
    symbol: 'USDT',
    name: 'Tether USD',
  },
  swap: {
    factoryAddress: '0xC87De04e2EC1F4282dFF2933A2D58199f688fC3d',
    initCodeHash: '0x0b6b499b70a5c571677814eaf859942ef2336f97496a25dfb5a151a02e7f1c5d',
    routerAddress: '0xE578184bC88EB48485Bba23a37B5509578d2aE38',
  },
  smartRouterAddress: '0xeAA02505CDF4c9F72fB653cDDBE4B09f52F0dBBa',
}
