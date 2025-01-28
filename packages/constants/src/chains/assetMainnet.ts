import IceChain from '../ice-chain'

export const assetmainnet: IceChain = {
  id: 42420,
  name: 'Assetchain Mainnet',
  features: ['swap'],
  network: 'asset',
  rpcUrls: {
    public: { http: ['https://mainnet-rpc.assetchain.org'] },
    default: { http: ['https://mainnet-rpc.assetchain.org'] },
  },
  blockExplorers: {
    default: { name: 'Assetchain Mainnet Explorer', url: 'https://scan.assetchain.org' },
  },
  nativeCurrency: {
    name: 'RWA',
    symbol: 'RWA',
    decimals: 18,
  },
  contracts: {
    multicall3: {
      address: '0xf8ac4BEB2F75d2cFFb588c63251347fdD629B92c',
      blockCreated: 30328,
    },
  },
  blockInterval: 4,
  wrappedNative: {
    address: '0x2584D40B5553E81Bb9deC0b6CD1a2E504AAB1709',
    decimals: 18,
    symbol: 'wRWA',
    name: 'wrapped RWA',
  },
  swap: {
    factoryAddress: '0xC87De04e2EC1F4282dFF2933A2D58199f688fC3d',
    routerAddress: '0xE578184bC88EB48485Bba23a37B5509578d2aE38',
    initCodeHash: '0x0437378fc27e93c612c5c385779bf540ca2064b54705e48c313aa216da380100',
    deploymentTs: 1737118702,
  },
  smartRouterAddress: '0x16A3247Db4588176c24C6A5F6d3fd2C174122DF5',
}
