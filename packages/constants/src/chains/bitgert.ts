import { FACTORY_ADDRESS, INIT_CODE_HASH, ROUTER_ADDRESS } from "../common/swap";
import IceChain from '../ice-chain'

export const bitgert: IceChain = {
  id: 32520,
  name: 'Bitgert Mainnet',
  features: ['swap', 'bridge', 'info', 'farms', 'staking', 'locks', 'kyc'],
  network: 'bitgert',
  rpcUrls: {
    public: { http: ['https://rpc-bitgert.icecreamswap.com'] },
    default: { http: ['https://rpc-bitgert.icecreamswap.com'] },
  },
  blockExplorers: {
    default: { name: 'Brisescan', url: 'https://brisescan.com' },
  },
  nativeCurrency: {
    name: 'Brise',
    symbol: 'Brise',
    decimals: 18,
  },
  blockInterval: 15,
  contracts: {
    multicall3: {
      address: '0x2490b172F7de4f518713fB03E6D3f57B558c9964',
      blockCreated: 1541584,
    },
  },
  locks: {
    factoryAddress: '0x9Cf1e91106CA675040a4eC9647f875785bCcAB71',
  },
  wrappedNative: {
    address: '0x0eb9036cbE0f052386f36170c6b07eF0a0E3f710',
    decimals: 18,
    symbol: 'WBRISE',
    name: 'Wrapped Brise',
  },
  iceAddress: '0xB999Ea90607a826A3E6E6646B404c3C7d11fa39D',
  stableToken: {
    address: '0xC7E6d7E08A89209F02af47965337714153c529F0',
    decimals: 18,
    symbol: 'USDTi',
    name: 'Tether USD IceCreamSwap',
  },
  swap: {
    factoryAddress: FACTORY_ADDRESS,
    routerAddress: ROUTER_ADDRESS,
    initCodeHash: INIT_CODE_HASH,
    deploymentTs: 1654207200,
  },
  smartRouterAddress: '0x4ddC9394b8371765588B10134AA79472C1d42b16',
  farmV2Address: '0x090B19ea55b93C969EC98E1D8E3db0695698efCa',
  kyc: {
    feeToken: '0xB999Ea90607a826A3E6E6646B404c3C7d11fa39D',
    fee: 10,
    feeWallet: '0x2Bfd1fc5e25a8F55C2E849492ad7966EA8A0dd9E'
  },
}
