import { BinanceWalletConnector } from '@pancakeswap/wagmi/connectors/binanceWallet'
import { BloctoConnector } from '@pancakeswap/wagmi/connectors/blocto'
import { TrustWalletConnector } from '@pancakeswap/wagmi/connectors/trustWallet'
import { CHAINS } from 'config/chains'
import memoize from 'lodash/memoize'
import { configureChains, createConfig, createStorage } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
// import { LedgerConnector } from 'wagmi/connectors/ledger'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

// get most configs chain nodes length
const mostNodesConfig = Object.values(CHAINS).reduce((prev, chain) => {
  const rpcs = chain.rpcUrls.default.http
  return rpcs.length > prev ? rpcs.length : prev
}, 0)

export const { publicClient, chains } = configureChains(
  CHAINS,
  Array.from({ length: mostNodesConfig })
    .map((_, i) => i)
    .map((i) => {
      return jsonRpcProvider({
        rpc: (chain) => {
          const rpcs = chain.rpcUrls.default.http
          return rpcs[i]
            ? {
                http: rpcs[i],
              }
            : null
        },
      })
    }),
  {
    batch: {
      multicall: {
        batchSize: 1024 * 200,
      },
    },
  },
)

export const injectedConnector = new InjectedConnector({
  chains,
  options: {
    shimDisconnect: false,
  },
})

export const coinbaseConnector = new CoinbaseWalletConnector({
  chains,
  options: {
    appName: 'IceCreamSwap',
    appLogoUrl: 'https://icecreamswap.com/favicon.ico',
  },
})

export const walletConnectConnector = new WalletConnectConnector({
  chains,
  options: {
    projectId: 'c33f5b4a87af478e80a3b8b807e52895',
    showQrModal: true,
  },
})

export const walletConnectNoQrCodeConnector = new WalletConnectConnector({
  chains,
  options: {
    projectId: 'c33f5b4a87af478e80a3b8b807e52895',
    showQrModal: false,
  },
})

export const metaMaskConnector = new MetaMaskConnector({
  chains,
  options: {
    shimDisconnect: false,
  },
})

const bloctoConnector = new BloctoConnector({
  chains,
  options: {
    defaultChainId: 56,
    appId: 'e2f2f0cd-3ceb-4dec-b293-bb555f2ed5af',
  },
})

// const ledgerConnector = new LedgerConnector({
//   chains,
//   options: {
//     projectId: 'c33f5b4a87af478e80a3b8b807e52895',
//   },
// })

export const bscConnector = new BinanceWalletConnector({ chains })

export const trustWalletConnector = new TrustWalletConnector({
  chains,
  options: {
    shimDisconnect: false,
    shimChainChangedDisconnect: true,
  },
})

class BitKeepConnector extends InjectedConnector {
  provider?: Window['ethereum']

  public id = 'bitKeep'

  async getProvider() {
    this.provider = (window as any).bitkeep?.ethereum
    return this.provider
  }
}

export const bitKeepConnector = new BitKeepConnector({
  chains,
  options: {
    shimDisconnect: false,
  },
})

class NaboxConnector extends InjectedConnector {
  provider?: Window['ethereum']

  public id = 'nabox'

  async getProvider() {
    if (!(window as any).NaboxWallet) throw new Error('Nabox not found')
    this.provider = (window as any).ethereum
    return this.provider
  }
}

export const naboxConnector = new NaboxConnector({
  chains,
  options: {
    shimDisconnect: false,
  },
})

class OkxConnector extends InjectedConnector {
  provider?: Window['ethereum']

  public id = 'okx'

  async getProvider() {
    if (!(window as any).okxwallet) throw new Error('Okx Wallet not found')
    this.provider = (window as any).okxwallet
    return this.provider
  }
}

export const okxConnector = new OkxConnector({
  chains,
  options: {
    shimDisconnect: true,
  },
})

export const noopStorage = {
  getItem: (_key) => '',
  setItem: (_key, _value) => null,
  removeItem: (_key) => null,
}

export const wagmiConfig = createConfig({
  storage: createStorage({
    storage: typeof window !== 'undefined' ? window.localStorage : noopStorage,
    key: 'wagmi_v1.1',
  }),
  autoConnect: false,
  publicClient,
  connectors: [
    metaMaskConnector,
    injectedConnector,
    coinbaseConnector,
    walletConnectConnector,
    bscConnector,
    bitKeepConnector,
    naboxConnector,
    okxConnector,
    // @ts-ignore FIXME: wagmi
    bloctoConnector,
    // ledgerConnector,
    trustWalletConnector,
  ],
})

export const CHAIN_IDS = chains.map((c) => c.id)

export const isChainSupported = memoize((chainId: number) => (CHAIN_IDS as number[]).includes(chainId))
export const isChainTestnet = memoize((chainId: number) => {
  const found = chains.find((c) => c.id === chainId)
  return found ? 'testnet' in found : false
})
