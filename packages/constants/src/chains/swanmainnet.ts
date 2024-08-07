import IceChain from '../ice-chain'

export const swanmainnet: IceChain = {
  id: 254,
  name: 'Swan Chain Network',
  features: ['swap'],
  network: 'swanchain',
  rpcUrls: {
    public: { http: ['https://mainnet-rpc01.swanchain.io/'] },
    default: { http: ['https://mainnet-rpc01.swanchain.io/'] },
  },
  blockExplorers: {
    default: { name: 'Swan Chain Explorer', url: 'https://swanscan.io' },
  },
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
  },
  contracts: {
    multicall3: {
      address: '0xf8ac4BEB2F75d2cFFb588c63251347fdD629B92c',
      blockCreated: 855927,
    },
  },
  blockInterval: 5,
  wrappedNative: {
    address: '0x4e73bD087ec624ab0433D10FaA002D29562CE0D9',
    decimals: 18,
    symbol: 'wETH',
    name: 'Wrapped ETH',
  },
  swap: {
    factoryAddress: '0xC87De04e2EC1F4282dFF2933A2D58199f688fC3d',
    routerAddress: '0xE578184bC88EB48485Bba23a37B5509578d2aE38',
    initCodeHash: '0x0437378fc27e93c612c5c385779bf540ca2064b54705e48c313aa216da380100',
    deploymentTs: 1722919804,
  },
  smartRouterAddress: '0x16A3247Db4588176c24C6A5F6d3fd2C174122DF5',
}
