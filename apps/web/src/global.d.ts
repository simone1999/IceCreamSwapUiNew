import type { WindowProvider } from 'wagmi/window'

export interface ExtendEthereum extends WindowProvider {
  isSafePal?: true
  isCoin98?: true
  isBlocto?: true
  isMathWallet?: true
  isTrustWallet?: true
}

declare global {
  interface Window {
    ccwallet?: true
    coin98?: true
    bitkeep?: true
    NaboxWallet?: true
    okxwallet?: true
    mercuryoWidget?: any
    ethereum?: ExtendEthereum
    BinanceChain?: {
      bnbSign?: (address: string, message: string) => Promise<{ publicKey: string; signature: string }>
      switchNetwork?: (networkId: string) => Promise<string>
    } & Ethereum
  }
}

export {}
