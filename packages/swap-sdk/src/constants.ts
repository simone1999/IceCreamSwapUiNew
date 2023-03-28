import { ERC20Token } from './entities/token'
import { ChainId, chains } from '@icecreamswap/constants'

export { ChainId }

export const FACTORY_ADDRESS_MAP: Record<number, string> = chains
  .filter((chain) => chain.swap)
  .reduce((acc, chain) => {
    const factoryAddresses = acc
    if (chain.swap) factoryAddresses[chain.id] = chain.swap.factoryAddress
    return factoryAddresses
  }, {} as Record<number, string>)

export const INIT_CODE_HASH_MAP: Record<number, string> = chains
  .filter((chain) => chain.swap)
  .reduce((acc, chain) => {
    const initCodeHashes = acc
    if (chain.swap) initCodeHashes[chain.id] = chain.swap.initCodeHash
    return initCodeHashes
  }, {} as Record<number, string>)

export const WETH9 = chains.reduce((acc, chain) => {
  const weth9s = acc
  if (chain.wrappedNative)
    weth9s[chain.id] = new ERC20Token(
      chain.id,
      chain.wrappedNative.address,
      18,
      chain.wrappedNative.symbol,
      chain.wrappedNative.name
    )
  return weth9s
}, {} as Record<number, ERC20Token>)

export const WNATIVE = WETH9

export const NATIVE = chains.reduce(
  (acc, chain) => {
    const natives = acc
    if (chain.nativeCurrency)
      natives[chain.id] = {
        symbol: chain.nativeCurrency.symbol,
        decimals: chain.nativeCurrency.decimals,
        name: chain.nativeCurrency.name,
      }
    return natives
  },
  {} as Record<
    number,
    {
      symbol: string
      decimals: number
      name: string
    }
  >
)
