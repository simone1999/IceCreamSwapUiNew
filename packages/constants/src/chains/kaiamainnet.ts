import IceChain from '../ice-chain'

export const kaiamainnet: IceChain = {
  id: 8217,
  name: 'Kaia Chain Mainnet',
  features: ['swap'],
  network: 'kaiamainnet',
  rpcUrls: {
    public: { http: ['https://rpc.ankr.com/klaytn'] },
    default: { http: ['https://rpc.ankr.com/klaytn'] },
  },
  blockExplorers: {
    default: { name: 'Kaia Chain Mainnet Explorer', url: 'https://kaiascope.com' },
  },
  nativeCurrency: {
    name: 'KAIA',
    symbol: 'KAIA',
    decimals: 18,
  },
  contracts: {
    multicall3: {
      address: '0xeAA02505CDF4c9F72fB653cDDBE4B09f52F0dBBa',
      blockCreated: 171740563,
    },
  },
  blockInterval: 1,
  wrappedNative: {
    address: '0x19aac5f612f524b754ca7e7c41cbfa2e981a4432',
    decimals: 18,
    symbol: 'WKLAY',
    name: 'Wrapped Kaia',
  },
  swap: {
    factoryAddress: '0xC87De04e2EC1F4282dFF2933A2D58199f688fC3d',
    routerAddress: '0xE578184bC88EB48485Bba23a37B5509578d2aE38',
    initCodeHash: '0x0437378fc27e93c612c5c385779bf540ca2064b54705e48c313aa216da380100',
    deploymentTs: 1733755335,
  },
  smartRouterAddress: '0x63d3C7Ab37ca36A2A0A338076C163fF60c72527c',

}
