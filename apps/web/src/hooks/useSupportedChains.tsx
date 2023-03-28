import chainName from 'config/constants/chainName'
import { createContext, PropsWithChildren, useContext } from 'react'

const SupportedChainsContext = createContext<number[]>([])

export const SupportedChainsProvider: React.FC<{ supportedChains: number[] } & PropsWithChildren> = ({
  children,
  supportedChains,
}) => {
  return <SupportedChainsContext.Provider value={supportedChains}>{children}</SupportedChainsContext.Provider>
}

export const useSupportedChains = () => {
  return useContext(SupportedChainsContext)
}

export const useSupportedChainList = (): string => {
  const supportedChains = useSupportedChains()
  const [last, ...supportedChainNames] = supportedChains.map((chainId) => {
    return chainName[chainId]
  })
  return `${supportedChainNames.join(', ')} and ${last}`
}
