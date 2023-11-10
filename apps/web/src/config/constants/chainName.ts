import { ChainId } from '@pancakeswap/chains'

const chainName: Record<ChainId, string> = {
  [ChainId.BITGERT]: 'Bitgert',
  [ChainId.SHIMMER]: 'Shimmer EVM',
  [ChainId.DOGE]: 'Doge',
  [ChainId.DOKEN]: 'Doken',
  [ChainId.FUSE]: 'Fuse',
  [ChainId.XDC]: 'XDC',
  [ChainId.BSC]: 'Binance',
  [ChainId.CORE]: 'CORE',
  [ChainId.XODEX]: 'XODEX',
  [ChainId.SHARDEUM_TEST]: 'Shardeum (Testnet)',
  [ChainId.TELOS]: 'Telos',
  [ChainId.SHIMMER_TEST]: 'Shimmer (Testnet)',
  [ChainId.BASE]: 'Base',
  [ChainId.SCROLL]: 'Scroll',
}

export default chainName
