import contract from 'config/constants/contracts'
import { getAddress } from 'viem'

export const NATIVE_CURRENCY_ADDRESS = getAddress('0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE')

export const MM_SUPPORT_CHAIN = {
}

export const MM_SWAP_CONTRACT_ADDRESS = contract.mmLinkedPool

export const MM_STABLE_TOKENS_WHITE_LIST: Record<number, Record<string, string>> = {
}

export const MM_SIGNER = {
}

export const SAFE_MM_QUOTE_EXPIRY_SEC = 25
export const IS_SUPPORT_NATIVE_TOKEN = true
