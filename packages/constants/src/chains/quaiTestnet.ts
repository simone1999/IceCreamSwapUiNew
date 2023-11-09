import { INIT_CODE_HASH } from '../common/swap'
import IceChain from '../ice-chain'

export const quaiTestnet: IceChain = {
  id: 9000,
  name: 'Quai Testnet',
  features: ['swap'],
  network: 'core',
  rpcUrls: {
    public: 'https://rpc.cyprus1.colosseum.quaiscan.io',
    default: 'https://rpc.cyprus1.colosseum.quaiscan.io',
  },
  blockExplorers: {
    default: { name: 'Quai testnet Explorer', url: 'https://cyprus1.colosseum.quaiscan.io' },
  },
  nativeCurrency: {
    name: 'QUAI',
    symbol: 'QUAI',
    decimals: 18,
  },
  multicall: {
    address: '0x00CE15eD37dD47b8923770785DC2E975D96049Ff',
    blockCreated: 303676,
  },
  blockInterval: 3,
  wrappedNative: {
    address: '0x00df9040B44Cd04e137562F8aeFc9e218A1bC42D',
    decimals: 18,
    symbol: 'WQUAI',
    name: 'Wrapped QUAI',
  },
  swap: {
    factoryAddress: "0x00aCC7CaD9D2bF582463430D3d444B0a1169B76c",
    initCodeHash: INIT_CODE_HASH,
  },
}
