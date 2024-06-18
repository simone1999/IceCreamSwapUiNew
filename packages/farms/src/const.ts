import { ChainId } from '@pancakeswap/sdk'
import { chains } from '@icecreamswap/constants'

export const supportedChainIdV2 = chains.filter((chain) => chain.features.includes('farms')).map((chain) => chain.id)
export const supportedChainIdV3 = chains.filter((chain) => chain.features.includes('farmsV3')).map((chain) => chain.id)
export const bCakeSupportedChainId: ChainId[] = []

export const FARM_AUCTION_HOSTING_IN_SECONDS = 691200

export type FarmV2SupportedChainId = (typeof supportedChainIdV2)[number]

export type FarmV3SupportedChainId = (typeof supportedChainIdV3)[number]

export const SMART_ROUTER_ADDRESSES: Record<ChainId, `0x${string}`> = chains.reduce((acc, chain) => {
  return chain.farmV2Address
    ?{...acc, [chain.id]: chain.farmV2Address}
    :acc
}, {})

export const masterChefAddresses: Record<number, `0x${string}`> = {
  32520: '0x090B19ea55b93C969EC98E1D8E3db0695698efCa',
  2000: "0xc44a6eb41f02740A6778CCb9591448a5EBC73b74",
  122: "0xBbB4CCfc93657AC125F4b1f734111349d1bFF611",
  50: "0xdD156cA7bff002f7827BDfFd38a0651CFBbe400e",
  1116: "0xe3277bb0f3C4b9C6FC1DBf81E328E14F3C9368C3",
  2415: "0xBD2e577dEa54602C7c367fa144981c8ACA6FD570",
  40: "0xBD2e577dEa54602C7c367fa144981c8ACA6FD570",
  1072: "0xb5C7882e37359572FD1cCFAA276e7Fdf70145D42",
  8453: "0xb5C7882e37359572FD1cCFAA276e7Fdf70145D42",
  148: "0xC4b5F645134DDc57c25D44095e5C1318A83C8481",
  534352: "0x1E0b5202F8D4a247d12528ac865ab73C61Db35Af",
  245022934: "0xe028aa99fe8e4c562f2477306eb7b98c8e083e4d",
  288: "0x8bCf938b30575594B02420e86b100121c92A54a3",
}

export const masterChefV3Addresses: Record<number, `0x${string}`> = {
  [ChainId.CORE]: '0xc378c540A8CD4e2F7475a1850d9E854C1Ea8b9E8',
} as const satisfies Record<FarmV3SupportedChainId, string>

export const nonBSCVaultAddresses = {
} as const
