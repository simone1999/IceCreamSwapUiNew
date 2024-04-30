import { arbitrum } from './arbitrum';
import { avalanche } from './avalanche';
import { base } from './base';
import { bitgert } from './bitgert';
import { blast } from './blast';
import { bsc } from './bsc';
import { celo } from './celo';
import { core } from './core';
import { cronos } from './cronos';
import { degen } from './degen';
import { dogechain } from './dogechain';
import { dokenchain } from './dokenchain';
import { fantom } from './fantom';
import { fuse } from './fuse';
import { kroma } from './kroma';
import { linea } from './linea';
import { mantle } from './mantle';
import { metis } from './metis';
import { mode } from './mode';
import { moonbeam } from './moonbeam';
import { moonriver } from './moonriver';
import { neon } from './neon';
import { optimism } from './optimism';
import { qitmeer } from './qitmeer';
import { rari } from './rari';
import { scroll } from './scroll';
import { shardeumTestnet } from './shardeumTestnet';
import { shimmer } from './shimmer';
import { shimmerTestnet } from './shimmerTestnet';
import { telos } from './telos';
import { xdc } from './xdc';
import { xlayer } from './xlayer';
import { xodex } from "./xodex";

export const chainMap = {
  arbitrum,
  avalanche,
  base,
  bitgert,
  blast,
  bsc,
  celo,
  core,
  cronos,
  degen,
  dogechain,
  dokenchain,
  fantom,
  fuse,
  kroma,
  linea,
  mantle,
  metis,
  mode,
  moonbeam,
  moonriver,
  neon,
  optimism,
  qitmeer,
  rari,
  scroll,
  shardeumTestnet,
  shimmer,
  shimmerTestnet,
  telos,
  xdc,
  xlayer,
  xodex
};

export const chains = Object.values(chainMap);

export const getChain = (chainId: number) => {
  return chains.find((chain) => chain.id === chainId)
}

export enum ChainId {
  ARBITRUM = arbitrum.id,
  AVALANCHE = avalanche.id,
  BASE = base.id,
  BITGERT = bitgert.id,
  BLAST = blast.id,
  BSC = bsc.id,
  CELO = celo.id,
  CORE = core.id,
  CRONOS = cronos.id,
  DEGEN = degen.id,
  DOGE = dogechain.id,
  DOKEN = dokenchain.id,
  FANTOM = fantom.id,
  FUSE = fuse.id,
  KROMA = kroma.id,
  LINEA = linea.id,
  MANTLE = mantle.id,
  METIS = metis.id,
  MODE = mode.id,
  MOONBEAM = moonbeam.id,
  MOONRIVER = moonriver.id,
  NEON = neon.id,
  OPTIMISM = optimism.id,
  QITMEER = qitmeer.id,
  RARI = rari.id,
  SCROLL = scroll.id,
  SHARDEUM_TEST = shardeumTestnet.id,
  SHIMMER = shimmer.id,
  SHIMMER_TEST = shimmerTestnet.id,
  TELOS = telos.id,
  XDC = xdc.id,
  XLAYER = xlayer.id,
  XODEX = xodex.id
}

export const defaultChainId = ChainId.CORE;
