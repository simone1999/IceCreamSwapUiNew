import IceChain from '../ice-chain'

export const stratovmTestnet: IceChain = {
  id: 93747,
  name: 'StratoVM Sepolia Testnet',
  features: ['swap'],
  network: 'stratovmTestnet',
  rpcUrls: {
    public: { http: ['https://rpc-stratovm-bjabr7rqni.t.conduit.xyz/'] },
    default: { http: ['https://rpc-stratovm-bjabr7rqni.t.conduit.xyz/'] },
  },
  blockExplorers: {
    default: { name: 'StratoVM Testnet Explorer', url: 'https://explorer.stratovm.io' },
  },
  nativeCurrency: {
    name: 'SVM',
    symbol: 'SVM',
    decimals: 18,
  },
  contracts: {
    multicall3: {
      address: '0xeAA02505CDF4c9F72fB653cDDBE4B09f52F0dBBa',
      blockCreated: 655566,
    },
  },
  blockInterval: 2,
  wrappedNative: {
    address: '0xC87De04e2EC1F4282dFF2933A2D58199f688fC3d',
    decimals: 18,
    symbol: 'wSVM',
    name: 'Wrapped SVM',
  },
  swap: {
    factoryAddress: '0xE578184bC88EB48485Bba23a37B5509578d2aE38',
    routerAddress: '0xf8ac4BEB2F75d2cFFb588c63251347fdD629B92c',
    initCodeHash: '0x0437378fc27e93c612c5c385779bf540ca2064b54705e48c313aa216da380100',
    deploymentTs: 1721570323,
  },
  smartRouterAddress: '0x63d3C7Ab37ca36A2A0A338076C163fF60c72527c',
}
