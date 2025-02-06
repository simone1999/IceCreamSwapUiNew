import IceChain from '../ice-chain'

export const berachainMainnet: IceChain = {
  id: 80094,
  name: 'Bera Chain',
  features: ['swap'],
  network: 'berachainmain',
  rpcUrls: {
    public: { http: ['https://rpc.berachain.com"'] },
    default: { http: ['https://rpc.berachain.com"'] },
  },
  blockExplorers: {
    default: { name: 'Bera Chain Mainnet Explorer', url: 'https://berascan.com' },
  },
  nativeCurrency: {
    name: 'BERA',
    symbol: 'BERA',
    decimals: 18,
  },
  contracts: {
    multicall3: {
      address: '0x16A3247Db4588176c24C6A5F6d3fd2C174122DF5',
      blockCreated: 780218,
    },
  },
  blockInterval: 2,
  wrappedNative: {
    address: '0x7507c1dc16935B82698e4C63f2746A2fCf994dF8',
    decimals: 18,
    symbol: 'WBERA',
    name: 'Wrapped BERA',
  },
  swap: {
    factoryAddress: '0xC87De04e2EC1F4282dFF2933A2D58199f688fC3d',
    routerAddress: '0xeAA02505CDF4c9F72fB653cDDBE4B09f52F0dBBa',
    initCodeHash: '0x0437378fc27e93c612c5c385779bf540ca2064b54705e48c313aa216da380100',
    deploymentTs: 1738849700,
  },
  smartRouterAddress: '0x16A3247Db4588176c24C6A5F6d3fd2C174122DF5',

}
