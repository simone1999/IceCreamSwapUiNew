import IceChain from '../ice-chain'

export const sonicmainnet: IceChain = {
  id: 146,
  name: 'Sonic Mainnet',
  features: ['swap'],
  network: 'sonic',
  rpcUrls: {
    public: { http: ['https://rpc.soniclabs.com'] },
    default: { http: ['https://rpc.soniclabs.com'] },
  },
  blockExplorers: {
    default: { name: 'Sonic Mainnet Explorer', url: 'https://soniclabs.com/' },
  },
  nativeCurrency: {
    name: 'S',
    symbol: 'S',
    decimals: 18,
  },
  contracts: {
    multicall3: {
      address: '0x3FFc2315A992b01dc4B3f79C8EEa1921091Ee24f',
      blockCreated: 411029,
    },
  },
  blockInterval: 0.2,
  wrappedNative: {
    address: '0x039e2fB66102314Ce7b64Ce5Ce3E5183bc94aD38',
    decimals: 18,
    symbol: 'wS',
    name: 'wrapped Sonic',
  },
  swap: {
    factoryAddress: '0x63d3C7Ab37ca36A2A0A338076C163fF60c72527c',
    routerAddress: '0xb4FE60CD05A3e68668007Cee83DDFD9A50A45B36',
    initCodeHash: '0x0437378fc27e93c612c5c385779bf540ca2064b54705e48c313aa216da380100',
    deploymentTs: 1734201017,
  },
  smartRouterAddress: '0x2fF506ed9729580EF8Bf04429614beB1baE5F76D',
}
