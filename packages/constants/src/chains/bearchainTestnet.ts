import IceChain from '../ice-chain'

export const bearchainTestnet: IceChain = {
  id: 80084,
  name: 'Bear Chain Testnet',
  features: ['swap'],
  network: 'bearchaintest',
  rpcUrls: {
    public: { http: ['https://bartio.rpc.berachain.com/'] },
    default: { http: ['https://bartio.rpc.berachain.com/'] },
  },
  blockExplorers: {
    default: { name: 'Bear Chain Testnet Explorer', url: 'https://bartio.beratrail.io' },
  },
  nativeCurrency: {
    name: 'BERA',
    symbol: 'BERA',
    decimals: 18,
  },
  contracts: {
    multicall3: {
      address: '0xf8ac4BEB2F75d2cFFb588c63251347fdD629B92c',
      blockCreated: 553515,
    },
  },
  blockInterval: 4,
  wrappedNative: {
    address: '0x7507c1dc16935B82698e4C63f2746A2fCf994dF8',
    decimals: 18,
    symbol: 'wBERA',
    name: 'Wrapped BERA',
  },
  swap: {
    factoryAddress: '0xC87De04e2EC1F4282dFF2933A2D58199f688fC3d',
    routerAddress: '0xE578184bC88EB48485Bba23a37B5509578d2aE38',
    initCodeHash: '0x0437378fc27e93c612c5c385779bf540ca2064b54705e48c313aa216da380100',
    deploymentTs: 1719089695,
  },
  smartRouterAddress: '0x16A3247Db4588176c24C6A5F6d3fd2C174122DF5',

}
