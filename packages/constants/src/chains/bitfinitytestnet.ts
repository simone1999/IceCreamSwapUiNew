import IceChain from '../ice-chain'

export const bitfinitytestnet: IceChain = {
  id: 355113,
  name: 'Bitfinity Test Network',
  features: ['swap'],
  network: 'bitfinitytest',
  rpcUrls: {
    public: { http: ['https://testnet.bitfinity.network/'] },
    default: { http: ['https://testnet.bitfinity.network/'] },
  },
  blockExplorers: {
    default: { name: 'Bitfinity Testnet Explorer', url: 'https://explorer.testnet.bitfinity.network' },
  },
  nativeCurrency: {
    name: 'BFT',
    symbol: 'BFT',
    decimals: 18,
  },
  contracts: {
    multicall3: {
      address: '0xf8ac4BEB2F75d2cFFb588c63251347fdD629B92c',
      blockCreated: 2643753,
    },
  },
  blockInterval: 4,
  wrappedNative: {
    address: '0x7938ACd297d53bD743c3926E3C24e7262C18AEc3',
    decimals: 18,
    symbol: 'wBFT',
    name: 'Wrapped BFT',
  },
  swap: {
    factoryAddress: '0xC87De04e2EC1F4282dFF2933A2D58199f688fC3d',
    routerAddress: '0xE578184bC88EB48485Bba23a37B5509578d2aE38',
    initCodeHash: '0x0437378fc27e93c612c5c385779bf540ca2064b54705e48c313aa216da380100',
    deploymentTs: 1722187666,
  },
  smartRouterAddress: '0x16A3247Db4588176c24C6A5F6d3fd2C174122DF5',
}
