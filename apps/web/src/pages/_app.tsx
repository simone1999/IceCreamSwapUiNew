import { Flex, Message, ResetCSS, ScrollToTopButtonV2, Select, Spinner, ToastListener } from '@pancakeswap/uikit'
import BigNumber from 'bignumber.js'
import GlobalCheckClaimStatus from '../components/GlobalCheckClaimStatus'
import { NetworkModal } from '../components/NetworkModal'
import { FixedSubgraphHealthIndicator } from '../components/SubgraphHealthIndicator/FixedSubgraphHealthIndicator'
import { useAccountEventListener } from '../hooks/useAccountEventListener'
import useEagerConnect from '../hooks/useEagerConnect'
import useEagerConnectMP from '../hooks/useEagerConnect.bmp'
import useLockedEndNotification from 'hooks/useLockedEndNotification'
import useSentryUser from '../hooks/useSentryUser'
import useThemeCookie from '../hooks/useThemeCookie'
import useUserAgent from '../hooks/useUserAgent'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { Fragment, useEffect, useMemo } from 'react'
import { DefaultSeo } from 'next-seo'
import { PageMeta } from 'components/Layout/Page'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, useStore } from '../state'
import { usePollBlockNumber } from '../state/block/hooks'
import TransactionsDetailModal from '../components/TransactionDetailModal'
import { Blocklist, Updaters } from '..'
import { SEO } from '../../next-seo.config'
import { SentryErrorBoundary } from '../components/ErrorBoundary'
import Menu from '../components/Menu'
import Providers from '../Providers'
import GlobalStyle from '../style/Global'
import { SupportedChainsProvider, useSupportedChains } from '../hooks/useSupportedChains'
import { CHAIN_IDS } from '../utils/wagmi'
import { poppins } from '../style/font'
import { trpc } from '@icecreamswap/backend'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { ChainLogo } from 'components/Logo/ChainLogo'
import chainName from 'config/constants/chainName'
import { useSwitchNetwork } from 'hooks/useSwitchNetwork'
import { ChainId } from '@pancakeswap/sdk'

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
  useLockedEndNotification()
  return null
}

function MPGlobalHooks() {
  usePollBlockNumber()
  useEagerConnectMP()
  useUserAgent()
  useAccountEventListener()
  useSentryUser()
  useLockedEndNotification()
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
          content="MermaidSwap combines a Decentralized Exchange(DEX), fun games, and profit-sharing to revolutionize DeFi on KAIA."
        />
        <meta name="theme-color" content="#15EEDD" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://mermaidswapxyz.com/logo.png" />
        <meta name="twitter:title" content="MermaidSwap - Gaming and Rewards DeFi" />
        <meta
          name="twitter:description"
          content="MermaidSwap combines a decentralized exchange(DEX), fun games, and profit-sharing to revolutionize DeFi on KAIA."
        />
        <title>MermaidSwap</title>
      </Head>
      <DefaultSeo {...SEO} />

      <Providers store={store}>
        <PageMeta />
        {(Component as NextPageWithLayout).Meta && (
          // @ts-ignore
          <Component.Meta {...pageProps} />
        )}
        <SupportedChainsProvider supportedChains={[ChainId.KAIA]}>
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
  isShowScrollToTopButton?: true
  /**
   * Meta component for page, hacky solution for static build page to avoid `PersistGate` which blocks the page from rendering
   */
  Meta?: React.FC<React.PropsWithChildren<unknown>>
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const ProductionErrorBoundary = process.env.NODE_ENV === 'production' ? SentryErrorBoundary : Fragment

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const { chainId } = useActiveChainId()
  const supportedChains = useSupportedChains()
  // const { switchNetworkAsync } = useSwitchNetwork()
  /*
  useEffect(() => {
    if (supportedChains.length > 0 && !supportedChains.includes(chainId)) {
      replaceBrowserHistory('chain', CHAIN_QUERY_NAME[supportedChains[0]])
    }
  }, [chainId, supportedChains])
  */
  const wrongChain = typeof chainId !== 'undefined' && supportedChains.length != 0 && !supportedChains.includes(chainId)
  if (Component.pure) {
    return <Component {...pageProps} />
  }

  // Use the layout defined at the page level, if available
  const Layout = Component.Layout || Fragment
  const ShowMenu = Component.mp ? Fragment : Menu
  const isShowScrollToTopButton = Component.isShowScrollToTopButton || true

  /*
  const chainSelectionOptions = useMemo(
    () =>
      supportedChains
        .map((chainId) => ({
          label: (
            <>
              <ChainLogo chainId={chainId} />
              {chainName[chainId]}
            </>
          ),
          value: chainId,
        })),
    [],
  )
  */

  return (
    <ProductionErrorBoundary>
      <ShowMenu>
        <Layout>
          {wrongChain ? (
            <>
              <Flex justifyContent="center" alignItems="center" height="250px">
                <Spinner />
              </Flex>
              {/*
              <Flex justifyContent="center" alignItems="center" height="250px" flexDirection={"column"}>
                <Message variant={"warning"}>
                  This chain is not yet supported on this page, please select a different one.
                </Message>
                <Select
                  options={chainSelectionOptions}
                  onOptionChange={(option) => switchNetworkAsync(option.value)}
                  value={chainId}
                  width={"100px"}
                />
              </Flex>
              */}
            </>
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
      {isShowScrollToTopButton && <ScrollToTopButtonV2 />}
    </ProductionErrorBoundary>
  )
}

export default trpc.withTRPC(MyApp)
