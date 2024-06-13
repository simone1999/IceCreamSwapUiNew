import IceChain from '../ice-chain'

export const stratovmTestnet: IceChain = {
  id: 372,
  name: 'StratoVM Testnet',
  features: ['swap'],
  network: 'stratovmTestnet',
  rpcUrls: {
    public: { http: ['https://bitcoin-l2-349313-testnet.tc.l2aas.com/rpc'] },
    default: { http: ['https://bitcoin-l2-349313-testnet.tc.l2aas.com/rpc'] },
  },
  blockExplorers: {
    default: { name: 'StratoVM Explorer', url: 'https://bitcoin-l2-349313-testnet.tc.l2aas.com' },
  },
  nativeCurrency: {
    name: 'BTC',
    symbol: 'BTC',
    decimals: 18,
  },
  contracts: {
    multicall3: {
      address: '0xf8ac4BEB2F75d2cFFb588c63251347fdD629B92c',
      blockCreated: 131194,
    },
  },
  blockInterval: 10,
  wrappedNative: {
    address: '0x45d4Dc6f67A292d40E1bF78F577ef73F301315A3',
    decimals: 18,
    symbol: 'wBTC',
    name: 'Wrapped BTC',
  },
  swap: {
    factoryAddress: '0xC87De04e2EC1F4282dFF2933A2D58199f688fC3d',
    routerAddress: '0xE578184bC88EB48485Bba23a37B5509578d2aE38',
    initCodeHash: '0x0437378fc27e93c612c5c385779bf540ca2064b54705e48c313aa216da380100',
    deploymentTs: 1718110262,
  },
  smartRouterAddress: '0x16A3247Db4588176c24C6A5F6d3fd2C174122DF5',
}
