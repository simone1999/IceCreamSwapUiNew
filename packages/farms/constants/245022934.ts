import { SerializedFarmConfig } from '..'
import { neonTokens } from "@pancakeswap/tokens";
import {getAddress} from "viem";

const farms: SerializedFarmConfig[] = [
  {
    pid: 0,
    lpSymbol: 'NEON-USDT',
    lpAddress: '0x8EA822e85D2eABFE8cfbAF90F153B393f802aAEa',
    token: neonTokens.usdt,
    quoteToken: neonTokens.wneon,
  },
  {
    pid: 1,
    lpSymbol: 'NEON-ICE',
    lpAddress: '0xE6aFb3448F3bC6EC09A55A8722b97410DAa81517',
    token: neonTokens.ice,
    quoteToken: neonTokens.wneon,
  },
  {
    pid: 2,
    lpSymbol: 'ICE-CHONK',
    lpAddress: '0xaFecF4C0e5018025F564A3FdBcA9A70799e2FFe2',
    token: neonTokens.chonk,
    quoteToken: neonTokens.ice,
  },
].map((p) => ({ ...p, token: p.token.serialize, quoteToken: p.quoteToken.serialize, lpAddress: getAddress(p.lpAddress), }))

export default farms
