import '@pancakeswap/ui/css/reset.css'
import { Flex, ResetCSS, Spinner, ToastListener } from '@pancakeswap/uikit'
import BigNumber from 'bignumber.js'
import GlobalCheckClaimStatus from '../components/GlobalCheckClaimStatus'
import { NetworkModal } from '../components/NetworkModal'
import { FixedSubgraphHealthIndicator } from '../components/SubgraphHealthIndicator/FixedSubgraphHealthIndicator'
import { useAccountEventListener } from '../hooks/useAccountEventListener'
import useEagerConnect from '../hooks/useEagerConnect'
import useEagerConnectMP from '../hooks/useEagerConnect.bmp'
import useSentryUser from '../hooks/useSentryUser'
import useThemeCookie from '../hooks/useThemeCookie'
import useUserAgent from '../hooks/useUserAgent'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { Fragment, useEffect } from 'react'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, useStore } from '../state'
import { usePollBlockNumber } from '../state/block/hooks'
import TransactionsDetailModal from '../components/TransactionDetailModal'
import { Blocklist, Updaters } from '..'
import { SentryErrorBoundary } from '../components/ErrorBoundary'
import Menu from '../components/Menu'
import Providers from '../Providers'
import GlobalStyle from '../style/Global'
import { SupportedChainsProvider, useSupportedChains } from '../hooks/useSupportedChains'
import { CHAIN_IDS } from '../utils/wagmi'
import { poppins } from '../style/font'
import useActiveWeb3React from '../hooks/useActiveWeb3React'
import { trpc } from '@icecreamswap/backend'

const EasterEgg = dynamic(() => import('../components/EasterEgg'), { ssr: false })

// This config is required for number formatting
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

function GlobalHooks() {
  usePollBlockNumber()
  useEagerConnect()
  useUserAgent()
  useAccountEventListener()
  useSentryUser()
  useThemeCookie()
  return null
}

function MPGlobalHooks() {
  usePollBlockNumber()
  useEagerConnectMP()
  useUserAgent()
  useAccountEventListener()
  useSentryUser()
  return null
}

function MyApp(props: AppProps<{ initialReduxState: any }>) {
  const { pageProps, Component } = props
  const store = useStore(pageProps.initialReduxState)
  useEffect(() => {
    // add font to body
    if (document.body.classList.contains(poppins.variable)) return
    document.body.classList.add(poppins.variable)
  }, [])

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, minimum-scale=1, viewport-fit=cover"
        />
        <meta
          name="description"
          content="Multi-chain DeFi ecosystem with Swap, Bridge and Launchpad. Trade, Bridge, Earn and Launch on CORE, Bitgert (Brise), Binance smart chain (BSC), XDC, XoDex, Dogechain, Doken, and Fuse"
        />
        <meta name="theme-color" content="#F8567F" />
        <meta name="twitter:image" content="https://icecreamswap.com/images/hero.png" />
        <meta
          name="twitter:description"
          content="Multi-chain DeFi ecosystem with Swap, Bridge and Launchpad. Trade, Bridge, Earn and Launch on CORE, Bitgert (Brise), Binance smart chain (BSC), XDC, XoDex, Dogechain, Doken, and Fuse"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="🍦 IceCreamSwap - Trade, Earn, Bridge and Launch on CORE, XDC, Binance smart chain (BSC), Bitgert (Brise), XoDex, Dogechain, Doken and Fuse via our decentralized Smart contracts."
        />
        <title>IceCreamSwap</title>
      </Head>
      <main>
        <Providers store={store}>
          <SupportedChainsProvider supportedChains={(props as AppPropsWithLayout).Component.chains || CHAIN_IDS}>
            <Blocklist>
              {(Component as NextPageWithLayout).mp ? <MPGlobalHooks /> : <GlobalHooks />}
              <ResetCSS />
              <GlobalStyle />
              <GlobalCheckClaimStatus excludeLocations={[]} />
              <PersistGate loading={null} persistor={persistor}>
                <Updaters />
                <App {...props} />
              </PersistGate>
            </Blocklist>
          </SupportedChainsProvider>
        </Providers>
      </main>
      {/* <Script */}
      {/*   strategy="afterInteractive" */}
      {/*   id="google-tag" */}
      {/*   dangerouslySetInnerHTML={{ */}
      {/*     __html: ` */}
      {/*       (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': */}
      {/*       new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], */}
      {/*       j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src= */}
      {/*       'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f); */}
      {/*       })(window,document,'script','dataLayer', '${process.env.NEXT_PUBLIC_GTAG}'); */}
      {/*     `, */}
      {/*   }} */}
      {/* /> */}
    </>
  )
}

type NextPageWithLayout = NextPage & {
  Layout?: React.FC<React.PropsWithChildren<unknown>>
  /** render component without all layouts */
  pure?: true
  /** is mini program */
  mp?: boolean
  /**
   * allow chain per page, empty array bypass chain block modal
   * @default [ChainId.BSC]
   * */
  chains?: number[]
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const ProductionErrorBoundary = process.env.NODE_ENV === 'production' ? SentryErrorBoundary : Fragment

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const { chainId } = useActiveWeb3React()
  const supportedChains = useSupportedChains()
  useEffect(() => {
    if (supportedChains.length > 0 && !supportedChains.includes(chainId)) {
      const url = new URL(window.location.href)
      url.searchParams.set('chainId', supportedChains[0].toString())
      window.location.href = url.href
    }
  }, [chainId, supportedChains])
  const wrongChain = typeof chainId !== 'undefined' && !supportedChains.includes(chainId)
  if (Component.pure) {
    return <Component {...pageProps} />
  }

  // Use the layout defined at the page level, if available
  const Layout = Component.Layout || Fragment
  const ShowMenu = Component.mp ? Fragment : Menu

  return (
    <ProductionErrorBoundary>
      <ShowMenu>
        <Layout>
          {wrongChain ? (
            <Flex justifyContent="center" alignItems="center" height="400px">
              <Spinner />
            </Flex>
          ) : (
            <Component {...pageProps} />
          )}
        </Layout>
      </ShowMenu>
      <EasterEgg iterations={2} />
      <ToastListener />
      <FixedSubgraphHealthIndicator />
      <NetworkModal pageSupportedChains={Component.chains} />
      <TransactionsDetailModal />
    </ProductionErrorBoundary>
  )
}

// @ts-expect-error strict null checks missing in tsconfig
export default trpc.withTRPC(MyApp)
