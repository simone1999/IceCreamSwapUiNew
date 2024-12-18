import IceChain from '../ice-chain'

export const bitfinitymainnet: IceChain = {
  id: 355110,
  name: 'Bitfinity Chain Mainnet',
  features: ['swap'],
  network: 'bitfinitymainnet',
  rpcUrls: {
    public: { http: ['https://mainnet.bitfinity.network'] },
    default: { http: ['https://mainnet.bitfinity.network'] },
  },
  blockExplorers: {
    default: { name: 'Bitfinity Chain Mainnet Explorer', url: 'https://explorer.mainnet.bitfinity.network' },
  },
  nativeCurrency: {
    name: 'BTF',
    symbol: 'BTF',
    decimals: 18,
  },
  contracts: {
    multicall3: {
      address: '0xf8ac4BEB2F75d2cFFb588c63251347fdD629B92c',
      blockCreated: 4030756,
    },
  },
  blockInterval: 4,
  wrappedNative: {
    address: '0x4B6bcCA9a8D707DaCA69485d14836779AeD947E5',
    decimals: 18,
    symbol: 'wBTF',
    name: 'Wrapped BTF',
  },
  swap: {
    factoryAddress: '0xC87De04e2EC1F4282dFF2933A2D58199f688fC3d',
    routerAddress: '0xE578184bC88EB48485Bba23a37B5509578d2aE38',
    initCodeHash: '0x0437378fc27e93c612c5c385779bf540ca2064b54705e48c313aa216da380100',
    deploymentTs: 1732288711,
  },
  smartRouterAddress: '0xeAA02505CDF4c9F72fB653cDDBE4B09f52F0dBBa',

}
