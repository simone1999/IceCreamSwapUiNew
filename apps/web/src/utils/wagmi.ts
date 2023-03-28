import { BinanceWalletConnector } from '@pancakeswap/wagmi/connectors/binanceWallet'
import { configureChains, createClient } from 'wagmi'
import memoize from 'lodash/memoize'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { SafeConnector } from '@gnosis.pm/safe-apps-wagmi'
import { chains as CHAINS } from '@icecreamswap/constants'

const getNodeRealUrl = (networkName: string) => {
  let host = null

  switch (networkName) {
    case 'homestead':
      if (process.env.NEXT_PUBLIC_NODE_REAL_API_ETH) {
        host = `eth-mainnet.nodereal.io/v1/${process.env.NEXT_PUBLIC_NODE_REAL_API_ETH}`
      }
      break
    case 'rinkeby':
      if (process.env.NEXT_PUBLIC_NODE_REAL_API_RINKEBY) {
        host = `eth-rinkeby.nodereal.io/v1/${process.env.NEXT_PUBLIC_NODE_REAL_API_RINKEBY}`
      }
      break
    case 'goerli':
      if (process.env.NEXT_PUBLIC_NODE_REAL_API_GOERLI) {
        host = `eth-goerli.nodereal.io/v1/${process.env.NEXT_PUBLIC_NODE_REAL_API_GOERLI}`
      }
      break
    default:
      host = null
  }

  if (!host) {
    return null
  }

  const url = `https://${host}`
  return {
    http: url,
    webSocket: url.replace(/^http/i, 'wss').replace('.nodereal.io/v1', '.nodereal.io/ws/v1'),
  }
}

export const { provider, chains } = configureChains(CHAINS, [
  jsonRpcProvider({
    rpc: (chain) => {
      return getNodeRealUrl(chain.network) || { http: chain.rpcUrls.default }
    },
  }),
])

export const injectedConnector = new InjectedConnector({
  chains,
  options: {
    shimDisconnect: false,
    shimChainChangedDisconnect: true,
  },
})

export const coinbaseConnector = new CoinbaseWalletConnector({
  chains,
  options: {
    appName: 'PancakeSwap',
    appLogoUrl: 'https://pancakeswap.com/logo.png',
  },
})

export const walletConnectConnector = new WalletConnectConnector({
  chains,
  options: {
    qrcode: true,
  },
})

export const walletConnectNoQrCodeConnector = new WalletConnectConnector({
  chains,
  options: {
    qrcode: false,
  },
})

export const metaMaskConnector = new MetaMaskConnector({
  chains,
  options: {
    shimDisconnect: false,
    shimChainChangedDisconnect: true,
  },
})

export const bscConnector = new BinanceWalletConnector({ chains })

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
    shimChainChangedDisconnect: true,
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
    shimChainChangedDisconnect: true,
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
    shimChainChangedDisconnect: true,
  },
})

export const client = createClient({
  autoConnect: false,
  provider,
  connectors: [
    new SafeConnector({ chains }),
    metaMaskConnector,
    injectedConnector,
    coinbaseConnector,
    walletConnectConnector,
    bscConnector,
    bitKeepConnector,
    naboxConnector,
    okxConnector,
  ],
})

export const CHAIN_IDS = chains.map((c) => c.id)

export const isChainSupported = memoize((chainId: number) => CHAIN_IDS.includes(chainId))
export const isChainTestnet = memoize((chainId: number) => chains.find((c) => c.id === chainId)?.testnet)
