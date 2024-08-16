import { SerializedFarmConfig } from '..'
import { shimmerTokens } from '@pancakeswap/tokens'
import {getAddress} from "viem";

const farms: SerializedFarmConfig[] = [
    {
        pid: 0,
        lpSymbol: 'SMR-USDT LP',
        lpAddress: '0x82A7F6a7C2f54a552349A2C59Ecb3ceca7BF4a60',
        token: shimmerTokens.usdt,
        quoteToken: shimmerTokens.wsmr,
    },
    {
        pid: 1,
        lpSymbol: 'ICE-USDT LP',
        lpAddress: '0x5A46a9416624903805CfDcbF772b1ee45A2e6dD2',
        token: shimmerTokens.ice,
        quoteToken: shimmerTokens.usdt,
    },
].map((p) => ({ ...p, token: p.token.serialize, quoteToken: p.quoteToken.serialize, lpAddress: getAddress(p.lpAddress), }))

export default farms
