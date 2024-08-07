import { bitgert } from './bitgert'
import { boba } from "./boba"
import { bsc } from './bsc'
import { core } from './core'
import { dogechain } from './dogechain'
import { fuse } from './fuse'
import { xdc } from './xdc'
import { xodex } from "./xodex";
import { shardeumTestnet } from "./shardeumTestnet";
import { telos } from "./telos";
import { shimmerTestnet } from "./shimmerTestnet";
import { base } from "./base";
import { shimmer } from "./shimmer"
import { scroll } from "./scroll"
import { neon } from "./neon"
import { blast } from "./blast"
import { qitmeer } from "./qitmeer"
import { degen } from "./degen"
import { rari } from "./rari"
import { bob } from "./bob"
import { lightlink } from "./lightlink"
import { mint } from "./mint"
import { stratovmTestnet } from "./stratovmTestnet"
import { oneWorld } from "./oneworld"
import { swanmainnet } from "./swanmainnet"
import { bitfinitytestnet } from "./bitfinitytestnet"
import { ternoatestnet } from "./ternoatestnet"

export const chainMap = {
  core,
  bsc,
  bob,
  boba,
  base,
  qitmeer,
  lightlink,
  neon,
  rari,
  degen,
  blast,
  bitgert,
  telos,
  shimmer,
  scroll,
  oneWorld,
  xdc,
  dogechain,
  fuse,
  xodex,
  shardeumTestnet,
  // shimmerTestnet,
  mint,
  stratovmTestnet,
  swanmainnet,
  bitfinitytestnet,
  ternoatestnet,
}
export const chains = Object.values(chainMap)

export const getChain = (chainId: number) => {
  return chains.find((chain) => chain.id === chainId)
}

export enum ChainId {
  CORE = core.id,
  BLAST = blast.id,
  NEON = neon.id,
  SHIMMER = shimmer.id,
  BSC = bsc.id,
  SCROLL = scroll.id,
  XDC = xdc.id,
  TELOS = telos.id,
  BITGERT = bitgert.id,
  BASE = base.id,
  DOGE = dogechain.id,
  FUSE = fuse.id,
  XODEX = xodex.id,
  SHARDEUM_TEST = shardeumTestnet.id,
  SHIMMER_TEST = shimmerTestnet.id,
  QITMEER = qitmeer.id,
  DEGEN = degen.id,
  RARI = rari.id,
  BOB = bob.id,
  BOBA = boba.id,
  LIGHTLINK = lightlink.id,
  MINT = mint.id,
  STRATOM_TEST = stratovmTestnet.id,
  ONE_WORLD = oneWorld.id,
  SWAN = swanmainnet.id,
  BITFINITY_TEST = bitfinitytestnet.id,
  TERNOA_TEST = ternoatestnet.id,
}

export const defaultChainId = ChainId.CORE
