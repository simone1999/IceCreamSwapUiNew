import IceChain from '../ice-chain'

export const layeredgeTestnet: IceChain = {
  id: 3456,
  name: 'LayerEdge Testnet',
  features: ['swap'],
  network: 'layeredgetest',
  rpcUrls: {
    public: { http: ['https://testnet-rpc.layeredge.io'] },
    default: { http: ['https://testnet-rpc.layeredge.io'] },
  },
  blockExplorers: {
    default: { name: 'LayerEdge Testnet Explorer', url: 'https://testnet-explorer.layeredge.io' },
  },
  nativeCurrency: {
    name: 'BTC',
    symbol: 'BTC',
    decimals: 18,
  },
  contracts: {
    multicall3: {
      address: '0xf8ac4BEB2F75d2cFFb588c63251347fdD629B92c',
      blockCreated: 273285,
    },
  },
  blockInterval: 2,
  wrappedNative: {
    address: '0x070D5C88a834715B94f73fB7747DD07893405e79',
    decimals: 18,
    symbol: 'wBTC',
    name: 'Wrapped BTC',
  },
  swap: {
    factoryAddress: '0xC87De04e2EC1F4282dFF2933A2D58199f688fC3d',
    routerAddress: '0xE578184bC88EB48485Bba23a37B5509578d2aE38',
    initCodeHash: '0x0437378fc27e93c612c5c385779bf540ca2064b54705e48c313aa216da380100',
    deploymentTs: 1719090048,
  },
  smartRouterAddress: '0x16A3247Db4588176c24C6A5F6d3fd2C174122DF5',
}
