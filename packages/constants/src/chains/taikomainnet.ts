import IceChain from '../ice-chain'

export const taikomainnet: IceChain = {
  id: 167000,
  name: 'Taiko Mainnet Network',
  features: ['swap'],
  network: 'taikomainnet',
  rpcUrls: {
    public: { http: ['https://rpc.mainnet.taiko.xyz/'] },
    default: { http: ['https://rpc.mainnet.taiko.xyz/'] },
  },
  blockExplorers: {
    default: { name: 'Taiko Mainnet Explorer', url: 'https://taikoscan.io' },
  },
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
  },
  contracts: {
    multicall3: {
      address: '0xf8ac4BEB2F75d2cFFb588c63251347fdD629B92c',
      blockCreated: 276920,
    },
  },
  blockInterval: 12,
  wrappedNative: {
    address: '0xA51894664A773981C6C112C43ce576f315d5b1B6',
    decimals: 18,
    symbol: 'wETH',
    name: 'Wrapped Ether',
  },
  swap: {
    factoryAddress: '0xC87De04e2EC1F4282dFF2933A2D58199f688fC3d',
    routerAddress: '0xE578184bC88EB48485Bba23a37B5509578d2aE38',
    initCodeHash: '0x0437378fc27e93c612c5c385779bf540ca2064b54705e48c313aa216da380100',
    deploymentTs: 1723441619,
  },
  smartRouterAddress: '0x16A3247Db4588176c24C6A5F6d3fd2C174122DF5',
}
