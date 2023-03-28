import { BigNumber } from '@ethersproject/bignumber'
import {PoolCategory, SerializedPoolConfig} from './types'
import {bitgertTokens, coreTokens, xdcTokens} from '@pancakeswap/tokens'

export const MAX_LOCK_DURATION = 31536000
export const UNLOCK_FREE_DURATION = 604800
export const ONE_WEEK_DEFAULT = 604800
export const BOOST_WEIGHT = BigNumber.from('20000000000000')
export const DURATION_FACTOR = BigNumber.from('31536000')

export const vaultPoolConfig = {
} as const

export const livePools: SerializedPoolConfig[] = [
  // souceId can be any positive number as long as it is unique and not 0
  // version can't be 3 as that uses the pancake profiles that we did not implement
  {
    sousId: 14,
    stakingToken: coreTokens.ice,
    earningToken: coreTokens.fsxm,
    contractAddress: {
      1116: '0xb947fb0c93fae288e25033181e148492c050f32c',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '57.87',
    version: 2,
  },
  {
    sousId: 15,
    stakingToken: coreTokens.ice,
    earningToken: coreTokens.coreshiba,
    contractAddress: {
      1116: '0x1e94d69785533a2CEDBA25E512BFAfc2Cc2c2bcf',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '5.8',
    version: 2,
  },
  {
    sousId: 16,
    stakingToken: coreTokens.ice,
    earningToken: coreTokens.usdtrain,
    contractAddress: {
      1116: '0x4905A81167519B4fE63d8816e0c7Ee7030258b51',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '23000000',
    version: 2,
  },
  {
    sousId: 2,
    stakingToken: xdcTokens.ice,
    earningToken: xdcTokens.btcx,
    contractAddress: {
      50: '0x7b7387513444D4336e5a7E9cF75A2Bc7a38721A9',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '0.02093',
    version: 2,
  },
  {
    sousId: 3,
    stakingToken: xdcTokens.btcx,
    earningToken: xdcTokens.btcx,
    contractAddress: {
      50: '0x788C14Ddb3D4e9036D1fC98D2324f3F86FD43fCf',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '0.02093',
    version: 2,
  },
  {
    sousId: 4,
    stakingToken: bitgertTokens.miidas,
    earningToken: bitgertTokens.miidas,
    contractAddress: {
      32520: '0xf4c78d403527ba2fb67ab599efea0a739d3d6547',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '12.5',
    version: 2,
  },
  {
    sousId: 6,
    stakingToken: coreTokens.bcore,
    earningToken: coreTokens.bcore,
    contractAddress: {
      1116: '0x5CA06A5A6393382B6d8EcEEC6EC23A667eC85850',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '1.66',
    version: 2,
  },
  {
    sousId: 7,
    stakingToken: coreTokens.kishu,
    earningToken: coreTokens.kishu,
    contractAddress: {
      1116: '0x3A38Ef4f445D0e9546d076506eE1a411cf62f879',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '34722222',
    version: 2,
  },
  {
    sousId: 8,
    stakingToken: coreTokens.gte,
    earningToken: coreTokens.gte,
    contractAddress: {
      1116: '0xA34506a08ea9F4CF83732D52449909ce631b65B6',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '23.1481',
    version: 2,
  },
  {
    sousId: 9,
    stakingToken: coreTokens.word,
    earningToken: coreTokens.word,
    contractAddress: {
      1116: '0xE72c8D91fc12b38D31A091Deff08cf411e062842',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '0.038',
    version: 2,
  },
  {
    sousId: 10,
    stakingToken: coreTokens.coreshiba,
    earningToken: coreTokens.coreshiba,
    contractAddress: {
      1116: '0x04C433cd75054Ca73C048807B9b927077Fe0C5a0',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '4.63',
    version: 2,
  },
  {
    sousId: 11,
    stakingToken: coreTokens.hobo,
    earningToken: coreTokens.hobo,
    contractAddress: {
      1116: '0x091616e68eb6858B1EDFf2b95772038d1243aB0c',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '0.000578',
    version: 2,
  },
  {
    sousId: 12,
    stakingToken: coreTokens.usdtrain,
    earningToken: coreTokens.usdtrain,
    contractAddress: {
      1116: '0x072501B86fd40EC9cBF3aC032096fc9945A83aC8',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '115740740',
    version: 2,
  },
  {
    sousId: 13,
    stakingToken: coreTokens.fsxm,
    earningToken: coreTokens.fsxm,
    contractAddress: {
      1116: '0x1753e17c9b4dedca9cfb879f7a5eaf16554e942f',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '57.87',
    version: 2,
  },
    /*
  {
    sousId: 17,
    stakingToken: coreTokens.ice,
    earningToken: coreTokens.royale,
    contractAddress: {
      1116: '0x6ebcb39fa52253ec702518981b6449182e70dc74',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '4398148',
    version: 2,
  },
  {
    sousId: 18,
    stakingToken: coreTokens.royale,
    earningToken: coreTokens.royale,
    contractAddress: {
      1116: '0x18e1fee6da6af48296dfb1f9d8da9e3cc65aa35e',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '5657696',
    version: 2,
  },
    */
  {
    sousId: 19,
    stakingToken: coreTokens.cfee,
    earningToken: coreTokens.cfee,
    contractAddress: {
      1116: '0x258f0b7efbbdd088fca6162cc86b53e0133a7148',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '0.023',
    version: 2,
  },
  {
    sousId: 20,
    stakingToken: coreTokens.bcore,
    earningToken: coreTokens.bcore,
    contractAddress: {
      1116: '0x7ac860a1737b82c01f92c920c33e0434c8550fbd',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '2.31',
    version: 2,
  }
].map((p) => ({
  ...p,
  stakingToken: p.stakingToken.serialize,
  earningToken: p.earningToken.serialize,
}))

// known finished pools
const finishedPools = [
  {
    sousId: 5,
    stakingToken: coreTokens.aicore,
    earningToken: coreTokens.aicore,
    contractAddress: {
      1116: '0x573625F4D250b2a9Cf29fC030227Be00F2d13F92',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '50',
    version: 2,
  },
].map((p) => ({
  ...p,
  isFinished: true,
  stakingToken: p.stakingToken.serialize,
  earningToken: p.earningToken.serialize,
}))



export default [...livePools, ...finishedPools]
