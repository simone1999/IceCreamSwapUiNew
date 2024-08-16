import { SerializedFarmConfig } from '..'
import { baseTokens } from "@pancakeswap/tokens";
import {getAddress} from "viem";

const farms: SerializedFarmConfig[] = [
  {
    pid: 0,
    lpSymbol: 'ETH-USDT',
    lpAddress: '0xfCe2fcc39738DbCdFF2B4EfD9A0B142eC6BcE4AD',
    token: baseTokens.weth,
    quoteToken: baseTokens.usdt,
  },
  {
    pid: 1,
    lpSymbol: 'ICE-USDT',
    lpAddress: '0xFEE8F527e3909b3f16CbdA437DA6876dEeA132Ca',
    token: baseTokens.ice,
    quoteToken: baseTokens.usdt,
  },
].map((p) => ({ ...p, token: p.token.serialize, quoteToken: p.quoteToken.serialize, lpAddress: getAddress(p.lpAddress), }))

export default farms
