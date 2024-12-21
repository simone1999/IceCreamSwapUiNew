import IceChain from '../ice-chain'

export const linea: IceChain = {
  id: 59144,
  name: 'Linea',
  features: ['swap'],
  network: 'linea',
  rpcUrls: {
    public: { http: ['https://rpc.linea.build',] },
    default: { http: ['https://rpc.linea.build',] },
  },
  blockExplorers: {
    default: { name: 'Linea Mainnet Explorer', url: 'https://lineascan.build' },
  },
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  contracts: {
    multicall3: {
      address: '0xf8ac4BEB2F75d2cFFb588c63251347fdD629B92c',
      blockCreated: 3797700,
    },
  },
  blockInterval: 2,
  wrappedNative: {
    address: '0xe5D7C2a44FfDDf6b295A15c148167daaAf5Cf34f',
    decimals: 18,
    symbol: 'WETH',
    name: 'Wrapped Ether',
  },
  stableToken: {
    address: '0xA219439258ca9da29E9Cc4cE5596924745e12B93',
    decimals: 6,
    symbol: 'USDT',
    name: 'Tether USD',
  },
  swap: {
    factoryAddress: '0x3FFc2315A992b01dc4B3f79C8EEa1921091Ee24f',
    initCodeHash: '0x0437378fc27e93c612c5c385779bf540ca2064b54705e48c313aa216da380100',
    routerAddress: '0xa575f37e869e6887564F87c07e2885e08D542C4a',
  },
  smartRouterAddress: '0x16A3247Db4588176c24C6A5F6d3fd2C174122DF5'
}