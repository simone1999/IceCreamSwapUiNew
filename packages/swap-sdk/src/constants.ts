import { Percent } from '@pancakeswap/swap-sdk-core'
import { ChainId } from '@pancakeswap/chains'
import { Address, Hash } from 'viem'
import { ERC20Token } from './entities/token'
import { chains } from '@icecreamswap/constants'

export const ZERO_PERCENT = new Percent('0')
export const ONE_HUNDRED_PERCENT = new Percent('1')

export { ChainId }

export const FACTORY_ADDRESS_MAP = chains
  .filter((chain) => chain.swap)
  .reduce((acc, chain) => {
    const factoryAddresses = acc
    if (chain.swap) factoryAddresses[chain.id] = chain.swap.factoryAddress
    return factoryAddresses
  }, {} as Record<ChainId, Address>)

export const INIT_CODE_HASH_MAP = chains
  .filter((chain) => chain.swap)
  .reduce((acc, chain) => {
    const initCodeHashes = acc
    if (chain.swap) initCodeHashes[chain.id] = chain.swap.initCodeHash
    return initCodeHashes
  }, {} as Record<ChainId, Hash>)

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
}, {} as Record<ChainId, ERC20Token>)

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
    ChainId,
    {
      symbol: string
      decimals: number
      name: string
    }
  >
)
