import { FACTORY_ADDRESS, INIT_CODE_HASH, ROUTER_ADDRESS } from "../common/swap";
import IceChain from '../ice-chain'

export const core: IceChain = {
  id: 1116,
  name: 'Core Blockchain Mainnet',
  features: ['swap', 'swapV3', 'farms', 'farmsV3', 'info', 'infoV3', 'bridge', 'locks', 'staking', 'kyc', 'launchpad', 'tokenDeployer'],
  network: 'core',
  rpcUrls: {
    public: { http: ['https://rpc-core.icecreamswap.com'] },
    default: { http: ['https://rpc-core.icecreamswap.com'] },
  },
  blockExplorers: {
    default: { name: 'CORE Explorer', url: 'https://scan.coredao.org' },
  },
  nativeCurrency: {
    name: 'CORE',
    symbol: 'CORE',
    decimals: 18,
  },
  contracts: {
    multicall3: {
      address: '0xf3a3dAf360161B2f10c645EF039C709A3Fd4Ea62',
      blockCreated: 852772,
    },
  },
  tokenDeployerDividend: {
    address: '0x5c39F20A0d75Cc8695cfBa8d97178aB64e60d848',
    feeToken: '0xc0E49f8C615d3d4c245970F6Dc528E4A47d69a44',
  },
  locks: {
    factoryAddress: '0xFDfD00471d8bebA97B40f5D1599b7A84C16dd7d2',
    factoryAddress2: '0xA48E76d95619f4c9838Df19FDeE690a06581b5dD',
  },
  blockInterval: 3,
  wrappedNative: {
    address: '0xb0788B601C0D712702bc829B52771199ad8E33Ff',
    decimals: 18,
    symbol: 'WCORE',
    name: 'Wrapped Core',
  },
  iceAddress: '0xc0E49f8C615d3d4c245970F6Dc528E4A47d69a44',
  stableToken: {
    address: '0x900101d06A7426441Ae63e9AB3B9b0F63Be145F1',
    decimals: 18,
    symbol: 'USDT',
    name: 'Tether USD (CORE Bridge)',
  },
  swap: {
    factoryAddress: FACTORY_ADDRESS,
    routerAddress: ROUTER_ADDRESS,
    initCodeHash: INIT_CODE_HASH,
    deploymentTs: 1675828800,
  },
  smartRouterAddress: '0xBd8BB286Cd14124720F3f8C5F3fdD7fa13735Dc2',
  farmV2Address: '0xe3277bb0f3C4b9C6FC1DBf81E328E14F3C9368C3',
  campaignFactory: '0x79218D6d562a435ec258f2f4D8D17f1DEbbb114a',
  kyc: {
    feeToken: '0xc0E49f8C615d3d4c245970F6Dc528E4A47d69a44',
    fee: 10,
    feeWallet: '0x2Bfd1fc5e25a8F55C2E849492ad7966EA8A0dd9E',
    contractKyced: '0x913E332d552b98355587BBa82b1256BCAdbCeD48',
    contractKycDelegator: '0x682EAb822E5896dF1cD33C1Cd6EE99a3154Dd47E',
    contractKycDelegations: '0x790C138B110Bfb517cE5FaB8CF1a51ffDaAa9754',
  },
  v3SubgraphStart: 9212906,
}