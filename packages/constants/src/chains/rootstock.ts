import IceChain from '../ice-chain'

export const rootstock: IceChain = {
  id: 30,
  name: 'Rootstock Chain',
  features: ['swap'],
  network: 'Rootstock',
  rpcUrls: {
    public: { http: ['https://mainnet.sovryn.app/rpc'] },
    default: { http: ['https://mainnet.sovryn.app/rpc'] },
  },
  blockExplorers: {
    default: { name: 'Rootstock Mainnet Explorer', url: 'https://explorer.rootstock.io' },
  },
  nativeCurrency: {
    name: 'RBTC',
    symbol: 'RBTC',
    decimals: 18,
  },
  contracts: {
    multicall3: {
      address: '0xC87De04e2EC1F4282dFF2933A2D58199f688fC3d',
      blockCreated: 6642797,
    },
  },
  blockInterval: 10,
  wrappedNative: {
    address: '0x542fDA317318eBF1d3DEAf76E0b632741A7e677d',
    decimals: 18,
    symbol: 'WRBTC',
    name: 'Wrapped BTC',
  },
  swap: {
    factoryAddress: '0xE578184bC88EB48485Bba23a37B5509578d2aE38',
    routerAddress: '0xf8ac4BEB2F75d2cFFb588c63251347fdD629B92c',
    initCodeHash: '0x0437378fc27e93c612c5c385779bf540ca2064b54705e48c313aa216da380100',
    deploymentTs: 1724655282,
  },
  smartRouterAddress: '0x16A3247Db4588176c24C6A5F6d3fd2C174122DF5',

}
