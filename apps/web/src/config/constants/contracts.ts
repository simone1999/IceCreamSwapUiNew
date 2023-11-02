import { ChainId } from '@pancakeswap/chains'
import { masterChefAddresses , masterChefV3Addresses } from '@pancakeswap/farms'
import { DEPLOYER_ADDRESSES } from '@pancakeswap/v3-sdk'
import { V3_QUOTER_ADDRESSES } from '@pancakeswap/smart-router/evm'
import { chains } from "@icecreamswap/constants";
import { Address } from "wagmi";

export default {
  masterChef: masterChefAddresses,
  masterChefV3: masterChefV3Addresses,
  masterChefV1: {},
  multiCall: chains.reduce((acc, chain) => {
    if (!chain.contracts || !chain.contracts.multicall3) return acc
    return {...acc, [chain.id]: chain.contracts.multicall3.address}
  }, {}) as { [key in ChainId]: Address },
  sousChef: {},
  lotteryV2: {},
  pancakeProfile: {},
  pancakeBunnies: {},
  bunnyFactory: {},
  claimRefund: {},
  pointCenterIfo: {},
  bunnySpecial: {},
  tradingCompetitionEaster: {},
  tradingCompetitionFanToken: {},
  tradingCompetitionMobox: {},
  tradingCompetitionMoD: {},
  easterNft: {},
  cakeVault: {},
  cakeFlexibleSideVault: {},
  predictionsBNB: {},
  predictionsICE: {},
  chainlinkOracleBNB: {},
  chainlinkOracleICE: {},
  predictionsV1: {},
  bunnySpecialCakeVault: {},
  bunnySpecialPrediction: {},
  bunnySpecialLottery: {},
  bunnySpecialXmas: {},
  farmAuction: {},
  AnniversaryAchievement: {},
  nftMarket: {},
  nftSale: {},
  pancakeSquad: {},
  potteryDraw: {},
  zap: {},
  stableSwapNativeHelper: {},
  iCake: {},
  bCakeFarmBooster: {},
  bCakeFarmBoosterProxyFactory: {},
  nonBscVault: {},
  crossFarmingSender: {},
  crossFarmingReceiver: {},
  mmLinkedPool: {},
  tradingReward: {},
  nftPositionManager: {
    [ChainId.CORE]: '0xfb7bcf090937F870e6E72f9a31e0839aa2a7b513',
  },
  v3PoolDeployer: DEPLOYER_ADDRESSES,
  v3Migrator: {
    [ChainId.CORE]: '0x97Ea19e39bDe5c55D5891dEA54196824DBfC2fFb',
  },
  quoter: V3_QUOTER_ADDRESSES,
  v3Airdrop: {},
  affiliateProgram: {},
  tradingRewardTopTrades: {},
  vCake: {},
  revenueSharingPool: {},
  anniversaryAchievement: {},
  fixedStaking: {},
} as const satisfies Record<string, Record<number, `0x${string}`>>
