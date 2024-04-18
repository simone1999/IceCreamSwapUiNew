import { FACTORY_ADDRESS, INIT_CODE_HASH, ROUTER_ADDRESS } from "../common/swap";
import IceChain from '../ice-chain'

export const optimism: IceChain = {
  id: 10,
  name: 'Optimism',
  features: ['swap'],
  network: 'optimism',
  rpcUrls: {
    public: { http: ['https://mainnet.optimism.io',] },
    default: { http: ['https://mainnet.optimism.io',] },
  },
  blockExplorers: {
    default: { name: 'OP Mainnet Explorer', url: 'https://optimistic.etherscan.io' },
  },
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  contracts: {
    multicall3: {
      address: '0xf8ac4BEB2F75d2cFFb588c63251347fdD629B92c',
      blockCreated: 118918618,
    },
  },
  blockInterval: 1,
  wrappedNative: {
    address: '0x4200000000000000000000000000000000000006',
    decimals: 18,
    symbol: 'WETH',
    name: 'Wrapped Ether',
  },
  stableToken: {
    address: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',
    decimals: 6,
    symbol: 'USDT',
    name: 'Tether USD',
  },
  swap: {
    factoryAddress: '0xC87De04e2EC1F4282dFF2933A2D58199f688fC3d',
    initCodeHash: '0x0b6b499b70a5c571677814eaf859942ef2336f97496a25dfb5a151a02e7f1c5d',
    routerAddress: '0xE578184bC88EB48485Bba23a37B5509578d2aE38',
  },
  smartRouterAddress: '0x16A3247Db4588176c24C6A5F6d3fd2C174122DF5'
}
