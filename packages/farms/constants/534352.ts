import { SerializedFarmConfig } from '..'
import { scrollTokens } from '@pancakeswap/tokens'
import {getAddress} from "viem";

const farms: SerializedFarmConfig[] = [
    {
        pid: 0,
        lpSymbol: 'USDT-ETH LP',
        lpAddress: '0x98182F51fAcEaca17cAe1aF7b0b94B1E2c2D1BA0',
        token: scrollTokens.weth,
        quoteToken: scrollTokens.usdt,
    },
    {
        pid: 1,
        lpSymbol: 'ICE-USDT LP',
        lpAddress: '0xFEE8F527e3909b3f16CbdA437DA6876dEeA132Ca',
        token: scrollTokens.ice,
        quoteToken: scrollTokens.usdt,
    },
].map((p) => ({ ...p, token: p.token.serialize, quoteToken: p.quoteToken.serialize, lpAddress: getAddress(p.lpAddress), }))

export default farms
