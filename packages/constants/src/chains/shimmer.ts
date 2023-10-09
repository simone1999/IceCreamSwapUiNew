import { INIT_CODE_HASH } from '../common/swap'
import IceChain from '../ice-chain'

export const shimmer: IceChain = {
  id: 148,
  name: 'Shimmer EVM',
  features: ['swap', 'bridge', "farms"],
  network: 'shimmer',
  rpcUrls: {
    public: 'https://json-rpc.evm.shimmer.network',
    default: 'https://json-rpc.evm.shimmer.network',
  },
  blockExplorers: {
    default: { name: 'Shimmer EVM Explorer', url: 'https://explorer.evm.shimmer.network/' },
  },
  nativeCurrency: {
    name: 'Shimmer',
    symbol: 'SMR',
    decimals: 18,
  },
  multicall: {
    address: '0xf3a3dAf360161B2f10c645EF039C709A3Fd4Ea62',
    blockCreated: 35400,
  },
  blockInterval: 3,
  wrappedNative: {
    address: '0xBEb654A116aeEf764988DF0C6B4bf67CC869D01b',
    decimals: 18,
    symbol: 'WSMR',
    name: 'Wrapped Shimmer',
  },
  swap: {
    factoryAddress: "0x24cb308a4e2F3a4352F513681Bd0c31a0bd3BA31",
    initCodeHash: INIT_CODE_HASH,
  },
}
