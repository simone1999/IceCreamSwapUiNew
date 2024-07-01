import IceChain from '../ice-chain'

export const oneWorld: IceChain = {
  id: 309075,
  name: 'One World Chain Mainnet',
  features: ['swap'],
  network: 'oneworldmainnet',
  rpcUrls: {
    public: { http: ['https://mainnet-rpc.oneworldchai.org/'] },
    default: { http: ['https://mainnet-rpc.oneworldchai.org/'] },
  },
  blockExplorers: {
    default: { name: 'One World Chain Explorer', url: 'https://mainnet.oneworldchain.org/' },
  },
  nativeCurrency: {
    name: 'OWCT',
    symbol: 'OWCT',
    decimals: 18,
  },
  contracts: {
    multicall3: {
      address: '0xb4FE60CD05A3e68668007Cee83DDFD9A50A45B36',
      blockCreated: 2498535,
    },
  },
  blockInterval: 4,
  wrappedNative: {
    address: '0xE578184bC88EB48485Bba23a37B5509578d2aE38',
    decimals: 18,
    symbol: 'wOWCT',
    name: 'Wrapped OWCT',
  },
  swap: {
    factoryAddress: '0xf8ac4BEB2F75d2cFFb588c63251347fdD629B92c',
    routerAddress: '0xeAA02505CDF4c9F72fB653cDDBE4B09f52F0dBBa',
    initCodeHash: '0x0437378fc27e93c612c5c385779bf540ca2064b54705e48c313aa216da380100',
    deploymentTs: 1717849695,
  },
  smartRouterAddress: '0x63d3C7Ab37ca36A2A0A338076C163fF60c72527c',
}
