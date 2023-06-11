import { ModalProvider, light, dark, UIKitProvider } from '@pancakeswap/uikit'
import { Provider } from 'react-redux'
import { SWRConfig } from 'swr'
import { LanguageProvider } from '@pancakeswap/localization'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fetchStatusMiddleware } from './hooks/useSWRContract'
import { Store } from '@reduxjs/toolkit'
import { ThemeProvider as NextThemeProvider, useTheme as useNextTheme } from 'next-themes'
import { WagmiConfig } from 'wagmi'
import { client } from './utils/wagmi'
import { HistoryManagerProvider } from './contexts/HistoryContext'
import { GasPriceProvider } from './state/user/hooks'

// Create a client
const queryClient = new QueryClient()

const StyledUIKitProvider: React.FC<React.PropsWithChildren> = ({ children, ...props }) => {
  const { resolvedTheme } = useNextTheme()
  return (
    <UIKitProvider theme={resolvedTheme === 'dark' ? dark : light} {...props}>
      {children}
    </UIKitProvider>
  )
}

const Providers: React.FC<React.PropsWithChildren<{ store: Store; children: React.ReactNode }>> = ({
  children,
  store,
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig client={client}>
        <Provider store={store}>
        <GasPriceProvider>
            <NextThemeProvider>
              <StyledUIKitProvider>
                <LanguageProvider>
                  <SWRConfig
                    value={{
                      use: [fetchStatusMiddleware],
                    }}
                  >
                    <HistoryManagerProvider>
                      <ModalProvider>{children}</ModalProvider>
                    </HistoryManagerProvider>
                  </SWRConfig>
                </LanguageProvider>
              </StyledUIKitProvider>
            </NextThemeProvider>
        </GasPriceProvider>
        </Provider>
      </WagmiConfig>
    </QueryClientProvider>
  )
}

export default Providers
