import IceChain from '../ice-chain'

export const fortress: IceChain = {
  id: 372,
  name: 'Fortress Network',
  features: ['swap', 'bridge', 'info'],
  network: 'fortress',
  rpcUrls: {
    public: { http: ['https://rpc.fortresschain.finance/'] },
    default: { http: ['https://rpc.fortresschain.finance/'] },
  },
  blockExplorers: {
    default: { name: 'Fortress Explorer', url: 'https://explorer.fortresschain.finance' },
  },
  nativeCurrency: {
    name: 'FTSC',
    symbol: 'FTSC',
    decimals: 18,
  },
  contracts: {
    multicall3: {
      address: '0xf8ac4BEB2F75d2cFFb588c63251347fdD629B92c',
      blockCreated: 22663,
    },
  },
  blockInterval: 10,
  wrappedNative: {
    address: '0x0cD0Cf75E4696bd531cde0FAFb73c22b4985bcEC',
    decimals: 18,
    symbol: 'wFTSC',
    name: 'Wrapped FTSC',
  },
  iceAddress: '0x2fF506ed9729580EF8Bf04429614beB1baE5F76D',
  stableToken: {
    address: '0xf40A97b039cCbC35a3cd0F073Bcd328Cc8C85879',
    decimals: 18,
    symbol: 'USDT',
    name: 'Tether USD',
  },
  swap: {
    factoryAddress: '0xC87De04e2EC1F4282dFF2933A2D58199f688fC3d',
    routerAddress: '0xE578184bC88EB48485Bba23a37B5509578d2aE38',
    initCodeHash: '0x0437378fc27e93c612c5c385779bf540ca2064b54705e48c313aa216da380100',
    deploymentTs: 1717105361,
  },
  smartRouterAddress: '0x16A3247Db4588176c24C6A5F6d3fd2C174122DF5',
}
