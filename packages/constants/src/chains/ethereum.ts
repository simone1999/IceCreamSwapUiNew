import IceChain from '../ice-chain'

const etherExplorer = { name: 'Etherscan', url: 'https://etherscan.io' }

export const ethereum: IceChain = {
  id: 1,
  name: 'Ethereum',
  features: ['bridge','swap'],
  network: 'ethereum',
  rpcUrls: {
    public: { http: ['https://mainnet.infura.io/v3/'] },
    default: { http: ['https://mainnet.infura.io/v3/'] },
  },
  blockExplorers: {
    default: etherExplorer,
    etherscan: etherExplorer,
  },
  nativeCurrency: {
    name: 'Etherem Native Token',
    symbol: 'ETH',
    decimals: 18,
  },
  blockInterval: 3,
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 15921452,
    },
  },
  wrappedNative: {
    address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    decimals: 18,
    symbol: 'WETH',
    name: 'Wrapped ETH',
  },
}
