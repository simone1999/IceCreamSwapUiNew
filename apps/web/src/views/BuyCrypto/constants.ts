import { ContextData, TranslationKey } from '@pancakeswap/localization'
import { SUPPORT_BUY_CRYPTO } from 'config/constants/supportChains'
import { ChainId } from '@pancakeswap/chains'

export const SUPPORTED_ONRAMP_TOKENS = ['ETH', 'DAI', 'USDT', 'USDC', 'BUSD', 'BNB']
export const DEFAULT_FIAT_CURRENCIES = ['USD', 'EUR', 'GBP', 'HKD', 'CAD', 'AUD', 'BRL', 'JPY', 'KRW', 'VND']
export const WHITELISTED_FIAT_CURRENCIES_BASE = ['EUR', 'GBP', 'HKD', 'CAD', 'AUD', 'JPY', 'KRW', 'VND']
export const WHITELISTED_FIAT_CURRENCIES_LINEA = ['EUR', 'GBP', 'HKD', 'CAD', 'AUD', 'JPY', 'KRW', 'VND']

const MOONPAY_FEE_TYPES = ['Est. Total Fees', 'Networking Fees', 'Provider Fees']
const MERCURYO_FEE_TYPES = ['Est. Total Fees']

const SUPPORTED_MERCURYO_BSC_TOKENS = ['BNB', 'BUSD']
const SUPPORTED_MERCURYO_ETH_TOKENS = ['ETH', 'USDT', 'DAI']
const SUPPORTED_MERCURYO_ARBITRUM_TOKENS = ['ETH', 'USDC']

const SUPPORTED_MONPAY_ETH_TOKENS = ['ETH', 'USDC', 'DAI', 'USDT']
const SUPPORTED_MOONPAY_BSC_TOKENS = ['BNB', 'BUSD']
const SUPPORTED_MOONPAY_ARBITRUM_TOKENS = ['ETH', 'USDC']
const SUPPORTED_MOONPAY_ZKSYNC_TOKENS = ['ETH', 'USDC', 'DAI', 'USDT']

const SUPPORTED_TRANSAK_BSC_TOKENS = ['BNB', 'BUSD']
const SUPPORTED_TRANSAK_ETH_TOKENS = ['ETH', 'USDT', 'DAI']
const SUPPORTED_TRANSAK_ARBITRUM_TOKENS = ['ETH', 'USDC']
const SUPPORTED_TRANSAK_LINEA_TOKENS = ['ETH', 'USDC']
const SUPPORTED_TRANSAK_ZKSYNC_TOKENS = ['ETH']
const SUPPORTED_TRANSAK_ZKEVM_TOKENS = ['ETH']
const SUPPORTED_TRANSAK_BASE_TOKENS = ['ETH', 'USDC']

export const CURRENT_CAMPAIGN_TIMESTAMP = 1694512859

export enum ONRAMP_PROVIDERS {
  MoonPay = 'MoonPay',
  Mercuryo = 'Mercuryo',
  Transak = 'Transak',
}

export const supportedTokenMap: {
  [chainId: number]: {
    [ONRAMP_PROVIDERS.MoonPay]: string[]
    [ONRAMP_PROVIDERS.Mercuryo]: string[]
    [ONRAMP_PROVIDERS.Transak]: string[]
  }
} = {
  // Add more chainId mappings as needed
}

export const whiteListedFiatCurrenciesMap: {
  [chainId: number]: string[]
} = {
  [ChainId.BSC]: DEFAULT_FIAT_CURRENCIES,
  [ChainId.ETHEREUM]: DEFAULT_FIAT_CURRENCIES,
  [ChainId.ARBITRUM_ONE]: DEFAULT_FIAT_CURRENCIES,
  [ChainId.ZKSYNC]: DEFAULT_FIAT_CURRENCIES,
  [ChainId.LINEA]: WHITELISTED_FIAT_CURRENCIES_LINEA,
  [ChainId.POLYGON_ZKEVM]: DEFAULT_FIAT_CURRENCIES,
  [ChainId.BASE]: WHITELISTED_FIAT_CURRENCIES_BASE,
}

export function isBuyCryptoSupported(chain: ChainId) {
  return SUPPORT_BUY_CRYPTO.includes(chain)
}

export const providerFeeTypes: { [provider in ONRAMP_PROVIDERS]: string[] } = {
  [ONRAMP_PROVIDERS.MoonPay]: MOONPAY_FEE_TYPES,
  [ONRAMP_PROVIDERS.Mercuryo]: MERCURYO_FEE_TYPES,
  [ONRAMP_PROVIDERS.Transak]: MOONPAY_FEE_TYPES,
}

export const chainIdToNetwork: { [id: number]: string } = {
}

export const moonpayCurrencyChainIdentifier: { [id: number]: string } = {
}

export const fiatCurrencyMap: Record<string, { symbol: string; name: string }> = {
  USD: {
    name: 'United States Dollar',
    symbol: 'USD',
  },
  EUR: {
    name: 'Euro',
    symbol: 'EUR',
  },
  GBP: {
    name: 'Great British Pound',
    symbol: 'GBP',
  },
  HKD: {
    name: 'Hong Kong Dollar',
    symbol: 'HKD',
  },
  CAD: {
    name: 'Canadian Dollar',
    symbol: 'CAD',
  },
  AUD: {
    name: 'Australian Dollar',
    symbol: 'AUD',
  },
  BRL: {
    name: 'Brazilian Real',
    symbol: 'BRL',
  },
  JPY: {
    name: 'Japanese Yen',
    symbol: 'JPY',
  },
  KRW: {
    name: 'South Korean Won',
    symbol: 'KRW',
  },
  TWD: {
    name: 'New Taiwan Dollar',
    symbol: 'TWD',
  },
  IDR: {
    name: 'Indonesian Rupiah',
    symbol: 'IDR',
  },
  SGD: {
    name: 'Singapore Dollar',
    symbol: 'SGD',
  },
  VND: {
    name: 'Vietnamese Dong',
    symbol: 'VND',
  },
}
