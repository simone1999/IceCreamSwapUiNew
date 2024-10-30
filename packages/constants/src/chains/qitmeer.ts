import IceChain from '../ice-chain'

export const qitmeer: IceChain = {
  id: 813,
  name: 'Qitmeer Network Mainnet',
  features: ['swap', 'bridge', 'info'],
  network: 'qitmeer',
  rpcUrls: {
    public: { http: ['https://qng.rpc.qitmeer.io',] },
    default: { http: ['https://qng.rpc.qitmeer.io',] },
  },
  blockExplorers: {
    default: { name: 'Qitmeer Explorer', url: 'https://qng.qitmeer.io' },
  },
  nativeCurrency: {
    name: 'Qitmeer',
    symbol: 'MEER',
    decimals: 18,
  },
  contracts: {
    multicall3: {
      address: '0x42B7f4bB1a9359836942521D1d8a7Bc5d06E76f9',
      blockCreated: 1341056,
    },
  },
  blockInterval: 5,
  wrappedNative: {
    address: '0x470cBFB236860eb5257bBF78715FB5bd77119C2F',
    decimals: 18,
    symbol: 'WMEER',
    name: 'Wrapped MEER',
  },
  iceAddress: '0xd65CceCFf339e5680b1A1E7821421932cc2b114f',
  stableToken: {
    address: '0x7D5a56742C082FcDfc240cd7D1775f00e059771F',
    decimals: 18,
    symbol: 'USDT',
    name: 'Tether USD',
  },
  swap: {
    factoryAddress: "0x84aeB58fb9187dD64282d0C0975F788e21dd4475",
    initCodeHash: "0xb41a03f1db88f3709f0a02439f5bc24ebb946603078d7fb1a50525c0c66ab827",
    routerAddress: "0x575C065Bf1Fa9D6F0F94AAC620a6936dD8517c7D",
    deploymentTs: 1710453600,
  },
  smartRouterAddress: '0x8bCf938b30575594B02420e86b100121c92A54a3',
}
