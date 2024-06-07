import { SerializedFarmConfig } from "../../src";
import {coreTokens} from "@pancakeswap/tokens";
import {getAddress} from "viem";

const priceHelperLps: SerializedFarmConfig[] = [
  {
    pid: null,
    lpSymbol: '',
    lpAddress: '0x8a49135969229d840A990A1c719D366529F2Cb22',
    token: coreTokens.wcore,
    quoteToken: coreTokens.usdtl0,
  },
  {
    pid: null,
    lpSymbol: '',
    lpAddress: '0x1737aE7490559C34541831dbf492399A9A105Cb6',
    token: coreTokens.wcore_old,
    quoteToken: coreTokens.wcore,
  },
  {
    pid: null,
    lpSymbol: '',
    lpAddress: '0xa5dA4314d0729626Ed7C92A240105bA80acF54AB',
    token: coreTokens.usdt,
    quoteToken: coreTokens.wcore_old,
  },
].map((p) => ({ ...p, token: p.token.serialize, quoteToken: p.quoteToken.serialize, lpAddress: getAddress(p.lpAddress), }))

export default priceHelperLps
