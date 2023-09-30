import { bitgert } from './bitgert'
import { bsc } from './bsc'
import { core } from './core'
import { dogechain } from './dogechain'
import { dokenchain } from './dokenchain'
import { fuse } from './fuse'
import { xdc } from './xdc'
import { xodex } from "./xodex";
import { shardeumTestnet } from "./shardeumTestnet";
import { telos } from "./telos";
import { shimmerTestnet } from "./shimmerTestnet";
import { base } from "./base";
import { shimmer } from "./shimmer"

export const chainMap = {
  core,
  shimmer,
  bitgert,
  bsc,
  xdc,
  telos,
  base,
  dogechain,
  fuse,
  xodex,
  dokenchain,
  shardeumTestnet,
  // shimmerTestnet,
}
export const chains = Object.values(chainMap)

export const getChain = (chainId: number) => {
  return chains.find((chain) => chain.id === chainId)
}

export enum ChainId {
  CORE = core.id,
  SHIMMER = shimmer.id,
  BITGERT = bitgert.id,
  BSC = bsc.id,
  XDC = xdc.id,
  TELOS = telos.id,
  BASE = base.id,
  DOGE = dogechain.id,
  FUSE = fuse.id,
  XODEX = xodex.id,
  DOKEN = dokenchain.id,
  SHARDEUM_TEST = shardeumTestnet.id,
  SHIMMER_TEST = shimmerTestnet.id,
}
