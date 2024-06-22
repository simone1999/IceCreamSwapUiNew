import IceChain from '../ice-chain'

export const saita: IceChain = {
  id: 1209,
  name: 'Saita Mainnet',
  features: ['swap'],
  network: 'saita',
  rpcUrls: {
    public: { http: ['https://rpc-nodes.saitascan.io/'] },
    default: { http: ['https://rpc-nodes.saitascan.io/'] },
  },
  blockExplorers: {
    default: { name: 'Saita Explorer', url: 'https://saitascan.io' },
  },
  nativeCurrency: {
    name: 'STC',
    symbol: 'STC',
    decimals: 18,
  },
  contracts: {
    multicall3: {
      address: '0xeAA02505CDF4c9F72fB653cDDBE4B09f52F0dBBa',
      blockCreated: 1016280,
    },
  },
  blockInterval: 6,
  wrappedNative: {
    address: '0xC87De04e2EC1F4282dFF2933A2D58199f688fC3d',
    decimals: 18,
    symbol: 'wSTC',
    name: 'Wrapped STC',
  },
  swap: {
    factoryAddress: '0xE578184bC88EB48485Bba23a37B5509578d2aE38',
    routerAddress: '0xf8ac4BEB2F75d2cFFb588c63251347fdD629B92c',
    initCodeHash: '0x0437378fc27e93c612c5c385779bf540ca2064b54705e48c313aa216da380100',
    deploymentTs: 1718780960,
  },
  smartRouterAddress: '0x63d3C7Ab37ca36A2A0A338076C163fF60c72527c',
}
