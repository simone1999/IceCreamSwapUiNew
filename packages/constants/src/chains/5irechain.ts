import IceChain from '../ice-chain'

export const fireChain: IceChain = {
  id: 995,
  name: '5ire Chain',
  features: ['swap'],
  network: '5IreChain',
  rpcUrls: {
    public: { http: ['https://rpc.5ire.network'] },
    default: { http: ['https://rpc.5ire.network'] },
  },
  blockExplorers: {
    default: { name: '5ire Chain Explorer', url: 'https://preview.5ire.network' },
  },
  nativeCurrency: {
    name: '5ire',
    symbol: '5ire',
    decimals: 18,
  },
  contracts: {
    multicall3: {
      address: '0xeAA02505CDF4c9F72fB653cDDBE4B09f52F0dBBa',
      blockCreated: 353416,
    },
  },
  blockInterval: 3,
  wrappedNative: {
    address: '0xB5287C4875d14E610Bf94FEf9cD241835b00589B',
    decimals: 18,
    symbol: 'w5ire',
    name: 'Wrapped 5ire',
  },
  swap: {
    factoryAddress: '0xE578184bC88EB48485Bba23a37B5509578d2aE38',
    routerAddress: '0xf8ac4BEB2F75d2cFFb588c63251347fdD629B92c',
    initCodeHash: '0x0437378fc27e93c612c5c385779bf540ca2064b54705e48c313aa216da380100',
    deploymentTs: 1720611261,
  },
  smartRouterAddress: '0x63d3C7Ab37ca36A2A0A338076C163fF60c72527c',

}
