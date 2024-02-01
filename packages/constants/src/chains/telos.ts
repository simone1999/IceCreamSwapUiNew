import { FACTORY_ADDRESS, INIT_CODE_HASH, ROUTER_ADDRESS } from "../common/swap";
import IceChain from '../ice-chain'

export const telos: IceChain = {
  id: 40,
  name: 'Telos',
  features: ['swap', 'bridge', 'farms', 'info', 'kyc'],
  network: 'telos',
  rpcUrls: {
    public: { http: ['http://141.193.240.12:7003/evm'] },
    default: { http: ['http://141.193.240.12:7003/evm'] },
  },
  blockExplorers: {
    default: { name: 'Telos Explorer', url: 'https://www.teloscan.io' },
  },
  nativeCurrency: {
    name: 'Telos',
    symbol: 'TLOS',
    decimals: 18,
  },
  contracts: {
    multicall3: {
      address: '0xf3a3dAf360161B2f10c645EF039C709A3Fd4Ea62',
      blockCreated: 286183313,
    },
  },
  blockInterval: 0.5,
  wrappedNative: {
    address: '0xDC2393dc10734BF153153038943a5deB42b209cd',
    decimals: 18,
    symbol: 'WTLOS',
    name: 'Wrapped TLOS',
  },
  swap: {
    factoryAddress: FACTORY_ADDRESS,
    initCodeHash: INIT_CODE_HASH,
    routerAddress: ROUTER_ADDRESS,
  },
  kyc: {
    feeToken: '0xB25cB6a275a8D6a613228FB161eB3627b50EB696',
    fee: 10,
    feeWallet: '0x2Bfd1fc5e25a8F55C2E849492ad7966EA8A0dd9E'
  },
}
