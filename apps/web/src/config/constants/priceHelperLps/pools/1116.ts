import { SerializedFarmConfig } from '@pancakeswap/farms'
import { coreTokens } from '@pancakeswap/tokens'

const priceHelperLps: SerializedFarmConfig[] = [
    {
        pid: null,
        lpSymbol: '',
        lpAddress: '0xFEE8F527e3909b3f16CbdA437DA6876dEeA132Ca',
        token: coreTokens.ice,
        quoteToken: coreTokens.wcore,
    },
    {
        pid: null,
        lpSymbol: '',
        lpAddress: '0x876C62C8C94ca04aFE45a9Ef9DB39799D3CddF34',
        token: coreTokens.score,
        quoteToken: coreTokens.wcore,
    },
    {
        pid: null,
        lpSymbol: '',
        lpAddress: '0x2d32d80bbefff482b0c58332590e7afe6c436979',
        token: coreTokens.aicore,
        quoteToken: coreTokens.wcore,
    },
    {
        pid: null,
        lpSymbol: '',
        lpAddress: '0xcadda376b2840094cf6efa16a4c8483d6064adee',
        token: coreTokens.bcore,
        quoteToken: coreTokens.usdt,
    },
    {
        pid: null,
        lpSymbol: '',
        lpAddress: '0xb737cb83f5e7c365b95e54517f37a67eb3de88a6',
        token: coreTokens.kishu,
        quoteToken: coreTokens.wcore,
    },
    {
        pid: null,
        lpSymbol: '',
        lpAddress: '0x087E0c6547f9dA7F89AFDd8e4b08541959Bd4462',
        token: coreTokens.gte,
        quoteToken: coreTokens.wcore,
    },
    {
        pid: null,
        lpSymbol: '',
        lpAddress: '0x1609775ef02856E4fA83BDa833e8975cA1EA091F',
        token: coreTokens.word,
        quoteToken: coreTokens.wcore,
    },
    {
        pid: null,
        lpSymbol: '',
        lpAddress: '0xd16aA6313adF04C02B64898EfD96ceDC59D2D167',
        token: coreTokens.hobo,
        quoteToken: coreTokens.score,
    },
    {
        pid: null,
        lpSymbol: '',
        lpAddress: '0xf73DC0399A9aEA8549278fbd9c074D5E5D1D244B',
        token: coreTokens.coreshiba,
        quoteToken: coreTokens.usdt,
    },
    {
        pid: null,
        lpSymbol: '',
        lpAddress: '0x6a1a2b2af9683d810b7660b9a8addca19f466f17',
        token: coreTokens.usdtrain,
        quoteToken: coreTokens.wcore,
    },
    {
        pid: null,
        lpSymbol: '',
        lpAddress: '0xe9aF781e080424F93a05a297BaDeC5caA2EAE018',
        token: coreTokens.fsxm,
        quoteToken: coreTokens.wcore,
    },
    {
        pid: null,
        lpSymbol: '',
        lpAddress: '0x6932543112c90dfc265afb2918a6f2490deaf91f',
        token: coreTokens.royale,
        quoteToken: coreTokens.score,
    },
    {
        pid: null,
        lpSymbol: '',
        lpAddress: '0x6932543112c90dfc265afb2918a6f2490deaf91f',
        token: coreTokens.royale,
        quoteToken: coreTokens.score,
    },
    {
        pid: null,
        lpSymbol: '',
        lpAddress: '0x30d84a940a7209c4c63fc4636afdf3fe52591ec2',
        token: coreTokens.cfee,
        quoteToken: coreTokens.wcore,
    }
].map((p) => ({ ...p, token: p.token.serialize, quoteToken: p.quoteToken.serialize }))

export default priceHelperLps
