import IceChain from '../ice-chain'

export const gravityalpha: IceChain = {
  id: 1625,
  name: 'Gravity Alpha Chain',
  features: ['swap'],
  network: 'graivityalpha',
  rpcUrls: {
    public: { http: ['https://rpc.gravity.xyz'] },
    default: { http: ['https://rpc.gravity.xyz'] },
  },
  blockExplorers: {
    default: { name: 'Gravity Alpha Explorer', url: 'https://explorer.gravity.xyz' },
  },
  nativeCurrency: {
    name: 'G',
    symbol: 'G',
    decimals: 18,
  },
  contracts: {
    multicall3: {
      address: '0xf8ac4BEB2F75d2cFFb588c63251347fdD629B92c',
      blockCreated: 16851,
    },
  },
  blockInterval: 3,
  wrappedNative: {
    address: '0xBB859E225ac8Fb6BE1C7e38D87b767e95Fef0EbD',
    decimals: 18,
    symbol: 'wG',
    name: 'Wrapped G',
  },
  stableToken: {
    address: '0xFbDa5F676cB37624f28265A144A48B0d6e87d3b6',
    decimals: 6,
    symbol: 'USDC.e',
    name: 'Bridged USDC',
  },
  swap: {
    factoryAddress: '0xC87De04e2EC1F4282dFF2933A2D58199f688fC3d',
    routerAddress: '0xE578184bC88EB48485Bba23a37B5509578d2aE38',
    initCodeHash: '0x0437378fc27e93c612c5c385779bf540ca2064b54705e48c313aa216da380100',
    deploymentTs: 1720673993,
  },
  smartRouterAddress: '0x16A3247Db4588176c24C6A5F6d3fd2C174122DF5',

}
