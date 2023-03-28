import { SerializedFarmConfig } from '@pancakeswap/farms'
import { dogechainTokens } from '@pancakeswap/tokens'

const farms: SerializedFarmConfig[] = [
    {
        pid: 0,
        lpSymbol: 'ICE-Doge LP',
        lpAddress: '0x91454bea2a5467065b196440cd33dbd339b0a1c0',
        token: dogechainTokens.wdoge,
        quoteToken: dogechainTokens.ice,
    },
    {
        pid: 1,
        lpSymbol: 'ICE-USDT LP',
        lpAddress: '0xd90b2942f79f72143fdb58049ea5e6b7a9c65407',
        token: dogechainTokens.ice,
        quoteToken: dogechainTokens.usdt,
    },
].map((p) => ({ ...p, token: p.token.serialize, quoteToken: p.quoteToken.serialize }))

export default farms
