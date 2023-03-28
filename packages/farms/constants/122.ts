import { SerializedFarmConfig } from '@pancakeswap/farms'
import { fuseTokens } from '@pancakeswap/tokens'

const farms: SerializedFarmConfig[] = [
    {
        pid: 0,
        lpSymbol: 'ICE-FUSE LP',
        lpAddress: '0x550bff08cd0d3b1c1cf39d2725ce635aeffa32ff',
        token: fuseTokens.ice,
        quoteToken: fuseTokens.wfuse,
    }
].map((p) => ({ ...p, token: p.token.serialize, quoteToken: p.quoteToken.serialize }))

export default farms
