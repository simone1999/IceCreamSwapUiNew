import { FACTORY_ADDRESS, INIT_CODE_HASH } from '../common/swap'
import IceChain from '../ice-chain'

const bscExplorer = { name: 'BscScan', url: 'https://bscscan.com' }

export const bsc: IceChain = {
  id: 56,
  name: 'BNB Smart Chain',
  features: ['bridge'],
  network: 'binance',
  rpcUrls: {
    public: 'https://bscrpc.com',
    default: 'https://bscrpc.com',
  },
  blockExplorers: {
    default: bscExplorer,
    etherscan: bscExplorer,
  },
  nativeCurrency: {
    name: 'Binance Chain Native Token',
    symbol: 'BNB',
    decimals: 18,
  },
  blockInterval: 3,
  multicall: {
    address: '0xcA11bde05977b3631167028862bE2a173976CA11',
    blockCreated: 15921452,
  },
  swap: {
    factoryAddress: FACTORY_ADDRESS,
    initCodeHash: INIT_CODE_HASH,
  },
  wrappedNative: {
    address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    decimals: 18,
    symbol: 'WBNB',
    name: 'Wrapped BNB',
  },
}
