import { SerializedFarmConfig } from '@pancakeswap/farms'
import { xdcTokens } from '@pancakeswap/tokens'

const farms: SerializedFarmConfig[] = [
    {
        pid: 2,
        lpSymbol: 'ICE-USDT LP',
        lpAddress: '0x76629B41825f342519139D8Be7B05F38C0E7422c',
        token: xdcTokens.ice,
        quoteToken: xdcTokens.usdt,
    },
    {
        pid: 1,
        lpSymbol: 'USDT-XDC LP',
        lpAddress: '0xe9450d66a493C3ae6eBC3Bb0B2B01a5107ea8bDb',
        token: xdcTokens.usdt,
        quoteToken: xdcTokens.wxdc,
    },
    {
        pid: 0,
        lpSymbol: 'ICE-XDC LP',
        lpAddress: '0x1b42Bd5464812930146E78d5DAa69CF8669e463b',
        token: xdcTokens.ice,
        quoteToken: xdcTokens.wxdc,
    },
    {
        pid: 3,
        lpSymbol: 'BTCx-XDC LP',
        lpAddress: '0xB3d43084C258B3f6465CAc874e43FD0328557c73',
        token: xdcTokens.btcx,
        quoteToken: xdcTokens.wxdc,
    }/*
    ,
    {
        pid: 4,
        lpSymbol: 'US+-ICE LP',
        lpAddress: '0x632636d9f2dfbe6cda2afbaab5ecd55d82d5ef67',
        token: xdcTokens.usplus,
        quoteToken: xdcTokens.ice,
    },
    {
        pid: 5,
        lpSymbol: 'US+-XDC LP',
        lpAddress: '0x0acace3153134de8fc25a759a967a18e1edd5ac1',
        token: xdcTokens.usplus,
        quoteToken: xdcTokens.wxdc,
    }
    */
].map((p) => ({ ...p, token: p.token.serialize, quoteToken: p.quoteToken.serialize }))

export default farms
