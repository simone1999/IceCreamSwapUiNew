import { Address } from "viem";
import {ChainId} from "@pancakeswap/sdk";

const chains = [
  {
    domainId: 1,
    networkId: 56,
    name: 'BinanceSmartChain',
    decimals: 18,
    bridgeAddress: '0x3D4440F335060a0341C9E6C3bBeE85E552505FFF' as Address,
    type: 'Ethereum',
    nativeTokenSymbol: 'BNB',
    tokens: [
      {
        address: '0xce6c9c70f91c6797873EFC80505f972290A88f5D' as Address,
        name: 'IceCream',
        symbol: 'ICE',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xB999Ea90607a826A3E6E6646B404c3C7d11fa39D/logo.png',
        resourceId: '0x0000000000000000000000B999Ea90607a826A3E6E6646B404c3C7d11fa39D02',
      },
      {
        address: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8' as Address,
        name: 'Ether',
        symbol: 'ETH',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xeA61Dc96F105469522d39cBF7bD59b42393678F7/logo.png',
        resourceId: '0x00000000000000000000002170Ed0880ac9A755fd29B2688956BD959F933F801',
      },
      {
        address: '0x55d398326f99059fF775485246999027B3197955' as Address,
        name: 'Tether USD',
        symbol: 'USDT',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xC7E6d7E08A89209F02af47965337714153c529F0/logo.png',
        resourceId: '0x0000000000000000000000C7E6d7E08A89209F02af47965337714153c529F001',
      },
      {
        address: '0xebD3619642d78F0C98c84f6Fa9a678653fB5A99B' as Address,
        name: 'ASX',
        symbol: 'ASX',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/core/assets/0xB28B43209d9de61306172Af0320f4f55e50E2f29/logo.png',
        resourceId: '0x000000000000000000000ebD3619642d78F0C98c84f6Fa9a678653fB5A99B001',
      },
      {
        address: '0xA4fb427C67DF2400315c794155401c7C998Ed97d' as Address,
        name: '3D City',
        symbol: '3DC',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0x5feDA75eaB27814Cba0694C9711F7d4abEa5b0b5/logo.png',
        resourceId: '0x00000000000000000000005feDA75eaB27814Cba0694C9711F7d4abEa5b0b502',
      },
    ],
  },
  {
    domainId: 2,
    networkId: 32520,
    name: 'Bitgert',
    decimals: 18,
    bridgeAddress: '0x6A6A2C9A9e9dDf3a6D76B8e1d05701d7D57596B8' as Address,
    type: 'Ethereum',
    nativeTokenSymbol: 'Brise',
    tokens: [
      {
        address: '0xB999Ea90607a826A3E6E6646B404c3C7d11fa39D' as Address,
        name: 'IceCream',
        symbol: 'ICE',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xB999Ea90607a826A3E6E6646B404c3C7d11fa39D/logo.png',
        resourceId: '0x0000000000000000000000B999Ea90607a826A3E6E6646B404c3C7d11fa39D02',
      },
      {
        address: '0xC7E6d7E08A89209F02af47965337714153c529F0' as Address,
        name: 'Tether USD IceCream',
        symbol: 'USDTi',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xC7E6d7E08A89209F02af47965337714153c529F0/logo.png',
        resourceId: '0x0000000000000000000000C7E6d7E08A89209F02af47965337714153c529F001',
      },
      {
        address: '0xe6400344D65011450FC49E569dc1A9F98Ee29849' as Address,
        name: '3D City',
        symbol: '3DC',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0x5feDA75eaB27814Cba0694C9711F7d4abEa5b0b5/logo.png',
        resourceId: '0x00000000000000000000005feDA75eaB27814Cba0694C9711F7d4abEa5b0b502',
      },
    ],
  },
  {
    domainId: 6,
    networkId: 50,
    name: 'XDC',
    decimals: 18,
    bridgeAddress: '0x7D5a56742C082FcDfc240cd7D1775f00e059771F' as Address,
    type: 'Ethereum',
    nativeTokenSymbol: 'XDC',
    tokens: [
      {
        address: '0x54051D9DbE99687867090d95fe15C3D3E35512Ba' as Address,
        name: 'IceCream',
        symbol: 'ICE',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xB999Ea90607a826A3E6E6646B404c3C7d11fa39D/logo.png',
        resourceId: '0x0000000000000000000000B999Ea90607a826A3E6E6646B404c3C7d11fa39D02',
      },
      {
        address: '0xc57F0eb99363e747D637B17BBdB4e1AB85e60631' as Address,
        name: 'Tether USD',
        symbol: 'USDT',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xC7E6d7E08A89209F02af47965337714153c529F0/logo.png',
        resourceId: '0x0000000000000000000000C7E6d7E08A89209F02af47965337714153c529F001',
      },
    ],
  },
  {
    domainId: 7,
    networkId: 1116,
    name: 'CORE',
    decimals: 18,
    bridgeAddress: '0x88cD606B63C4665499ad0d47d4685d2ffc78e2Be'  as Address,
    type: 'Ethereum',
    nativeTokenSymbol: 'CORE',
    tokens: [
      {
        address: '0xc0E49f8C615d3d4c245970F6Dc528E4A47d69a44' as Address,
        name: 'IceCream',
        symbol: 'ICE',
        imageUri: 'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xB999Ea90607a826A3E6E6646B404c3C7d11fa39D/logo.png',
        resourceId: '0x0000000000000000000000B999Ea90607a826A3E6E6646B404c3C7d11fa39D02',
      },
      {
        address: '0x12AA82525DEfF84777fa78578A68ceB854A85f43' as Address,
        name: 'BNB',
        symbol: 'BNB',
        imageUri:
            'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0x74446a7418BFbFCDe3F1f6bCaFFA097d050a6dD8/logo.png',
        resourceId: '0x0000000000000000000000bb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c01',
      },
      {
        address: '0xeF6b7BC74C9354BCf2e3F2A068e4b0B5CDf08F29' as Address,
        name: 'Ether',
        symbol: 'ETH',
        imageUri:
            'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xeA61Dc96F105469522d39cBF7bD59b42393678F7/logo.png',
        resourceId: '0x00000000000000000000002170Ed0880ac9A755fd29B2688956BD959F933F801',
      },
      {
        address: '0x81bCEa03678D1CEF4830942227720D542Aa15817' as Address,
        name: 'Tether USD',
        symbol: 'USDT',
        imageUri:
            'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xC7E6d7E08A89209F02af47965337714153c529F0/logo.png',
        resourceId: '0x0000000000000000000000C7E6d7E08A89209F02af47965337714153c529F001',
      },
      {
        address: '0xB28B43209d9de61306172Af0320f4f55e50E2f29' as Address,
        name: 'ASX',
        symbol: 'ASX',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/core/assets/0xB28B43209d9de61306172Af0320f4f55e50E2f29/logo.png',
        resourceId: '0x000000000000000000000ebD3619642d78F0C98c84f6Fa9a678653fB5A99B001',
      },
    ],
  },
  {
    domainId: 8,
    networkId: 2415,
    name: 'XoDex',
    decimals: 18,
    bridgeAddress: '0x40375C92d9FAf44d2f9db9Bd9ba41a3317a2404f',
    rpcUrl: 'https://xo-dex.io',
    type: 'Ethereum',
    nativeTokenSymbol: 'XODEX',
    tokens: [
      {
        address: '0x81bCEa03678D1CEF4830942227720D542Aa15817',
        name: 'IceCream',
        symbol: 'ICE',
        imageUri: 'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xB999Ea90607a826A3E6E6646B404c3C7d11fa39D/logo.png',
        resourceId: '0x0000000000000000000000B999Ea90607a826A3E6E6646B404c3C7d11fa39D02',
      },
      {
        address: '0x867f08A3ab824b42e8058a1B48e32E1dF205b092',
        name: 'BNB',
        symbol: 'BNB',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0x74446a7418BFbFCDe3F1f6bCaFFA097d050a6dD8/logo.png',
        resourceId: '0x0000000000000000000000bb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c01',
      },
      {
        address: '0x12AA82525DEfF84777fa78578A68ceB854A85f43',
        name: 'Ether',
        symbol: 'ETH',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xeA61Dc96F105469522d39cBF7bD59b42393678F7/logo.png',
        resourceId: '0x00000000000000000000002170Ed0880ac9A755fd29B2688956BD959F933F801',
      },
      {
        address: '0x54051D9DbE99687867090d95fe15C3D3E35512Ba',
        name: 'Tether USD',
        symbol: 'USDT',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xC7E6d7E08A89209F02af47965337714153c529F0/logo.png',
        resourceId: '0x0000000000000000000000C7E6d7E08A89209F02af47965337714153c529F001',
      },
    ],
  },
  {
    domainId: 9,
    networkId: 40,
    name: 'Telos',
    decimals: 18,
    bridgeAddress: '0xd65CceCFf339e5680b1A1E7821421932cc2b114f' as Address,
    type: 'Ethereum',
    nativeTokenSymbol: 'TLOS',
    tokens: [
      {
        address: '0xB25cB6a275a8D6a613228FB161eB3627b50EB696' as Address,
        name: 'IceCream',
        symbol: 'ICE',
        imageUri: 'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xB999Ea90607a826A3E6E6646B404c3C7d11fa39D/logo.png',
        resourceId: '0x0000000000000000000000B999Ea90607a826A3E6E6646B404c3C7d11fa39D02',
      },
      {
        address: '0xc57F0eb99363e747D637B17BBdB4e1AB85e60631' as Address,
        name: 'Tether USD',
        symbol: 'USDT',
        imageUri:
            'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xC7E6d7E08A89209F02af47965337714153c529F0/logo.png',
        resourceId: '0x0000000000000000000000C7E6d7E08A89209F02af47965337714153c529F001',
      },
    ],
  },
  {
    domainId: 10,
    networkId: 8453,
    name: 'Base',
    decimals: 18,
    bridgeAddress: '0xd65CceCFf339e5680b1A1E7821421932cc2b114f' as Address,
    type: 'Ethereum',
    nativeTokenSymbol: 'ETH',
    tokens: [
      {
        address: '0x40375C92d9FAf44d2f9db9Bd9ba41a3317a2404f' as Address,
        name: 'IceCream',
        symbol: 'ICE',
        imageUri: 'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xB999Ea90607a826A3E6E6646B404c3C7d11fa39D/logo.png',
        resourceId: '0x0000000000000000000000B999Ea90607a826A3E6E6646B404c3C7d11fa39D02',
      },
      {
        address: '0xc0E49f8C615d3d4c245970F6Dc528E4A47d69a44' as Address,
        name: 'Tether USD',
        symbol: 'USDT',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xC7E6d7E08A89209F02af47965337714153c529F0/logo.png',
        resourceId: '0x0000000000000000000000C7E6d7E08A89209F02af47965337714153c529F001',
      },
    ],
  },
  {
    domainId: 11,
    networkId: 148,
    name: 'Shimmer',
    decimals: 18,
    bridgeAddress: '0x4ddC9394b8371765588B10134AA79472C1d42b16' as Address,
    type: 'Ethereum',
    nativeTokenSymbol: 'SMR',
    tokens: [
      {
        address: '0x40375C92d9FAf44d2f9db9Bd9ba41a3317a2404f' as Address,
        name: 'IceCream',
        symbol: 'ICE',
        imageUri: 'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xB999Ea90607a826A3E6E6646B404c3C7d11fa39D/logo.png',
        resourceId: '0x0000000000000000000000B999Ea90607a826A3E6E6646B404c3C7d11fa39D02',
      },
      {
        address: '0xc0E49f8C615d3d4c245970F6Dc528E4A47d69a44' as Address,
        name: 'Tether USD',
        symbol: 'USDT',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xC7E6d7E08A89209F02af47965337714153c529F0/logo.png',
        resourceId: '0x0000000000000000000000C7E6d7E08A89209F02af47965337714153c529F001',
      },
    ],
  },
  {
    domainId: 12,
    networkId: 534352,
    name: 'Scroll',
    decimals: 18,
    bridgeAddress: '0xd65CceCFf339e5680b1A1E7821421932cc2b114f' as Address,
    type: 'Ethereum',
    nativeTokenSymbol: 'ETH',
    tokens: [
      {
        address: '0x40375C92d9FAf44d2f9db9Bd9ba41a3317a2404f' as Address,
        name: 'IceCream',
        symbol: 'ICE',
        imageUri: 'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xB999Ea90607a826A3E6E6646B404c3C7d11fa39D/logo.png',
        resourceId: '0x0000000000000000000000B999Ea90607a826A3E6E6646B404c3C7d11fa39D02',
      },
      {
        address: '0xc0E49f8C615d3d4c245970F6Dc528E4A47d69a44' as Address,
        name: 'Tether USD',
        symbol: 'USDT',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xC7E6d7E08A89209F02af47965337714153c529F0/logo.png',
        resourceId: '0x0000000000000000000000C7E6d7E08A89209F02af47965337714153c529F001',
      },
    ],
  },
  {
    domainId: 13,
    networkId: 245022934,
    name: 'Neon EVM',
    decimals: 18,
    bridgeAddress: '0x4ddC9394b8371765588B10134AA79472C1d42b16' as Address,
    type: 'Ethereum',
    nativeTokenSymbol: 'NEON',
    tokens: [
      {
        address: '0x40375C92d9FAf44d2f9db9Bd9ba41a3317a2404f' as Address,
        name: 'IceCream',
        symbol: 'ICE',
        imageUri: 'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xB999Ea90607a826A3E6E6646B404c3C7d11fa39D/logo.png',
        resourceId: '0x0000000000000000000000B999Ea90607a826A3E6E6646B404c3C7d11fa39D02',
      },
      {
        address: '0xc0E49f8C615d3d4c245970F6Dc528E4A47d69a44' as Address,
        name: 'Tether USD',
        symbol: 'USDT',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xC7E6d7E08A89209F02af47965337714153c529F0/logo.png',
        resourceId: '0x0000000000000000000000C7E6d7E08A89209F02af47965337714153c529F001',
      },
    ],
  },
  {
    domainId: 14,
    networkId: 813,
    name: 'Qitmeer',
    decimals: 18,
    bridgeAddress: '0x7b2a5C88AB9367147F6ac384F857CbaDF5aA70a7' as Address,
    type: 'Ethereum',
    nativeTokenSymbol: 'MEER',
    tokens: [
      {
        address: '0xd65CceCFf339e5680b1A1E7821421932cc2b114f' as Address,
        name: 'IceCream',
        symbol: 'ICE',
        imageUri: 'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xB999Ea90607a826A3E6E6646B404c3C7d11fa39D/logo.png',
        resourceId: '0x0000000000000000000000B999Ea90607a826A3E6E6646B404c3C7d11fa39D02',
      },
      {
        address: '0x7D5a56742C082FcDfc240cd7D1775f00e059771F' as Address,
        name: 'Tether USD',
        symbol: 'USDT',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xC7E6d7E08A89209F02af47965337714153c529F0/logo.png',
        resourceId: '0x0000000000000000000000C7E6d7E08A89209F02af47965337714153c529F001',
      },
    ],
  },
  {
    domainId: 15,
    networkId: 81457,
    name: 'Blast',
    decimals: 18,
    bridgeAddress: '0x575C065Bf1Fa9D6F0F94AAC620a6936dD8517c7D' as Address,
    type: 'Ethereum',
    nativeTokenSymbol: 'ETH',
    tokens: [
      {
        address: '0xD810A437e334B9C3660C18b38fB3C01000B91DD3' as Address,
        name: 'IceCream',
        symbol: 'ICE',
        imageUri: 'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xB999Ea90607a826A3E6E6646B404c3C7d11fa39D/logo.png',
        resourceId: '0x0000000000000000000000B999Ea90607a826A3E6E6646B404c3C7d11fa39D02',
      },
      {
        address: '0x0000000000000000000000000000000000000001' as Address,
        name: 'Ether',
        symbol: 'ETH',
        imageUri:
          'https://icecreamswap-assets.s3.amazonaws.com/token/81457/0x4300000000000000000000000000000000000004.png',
        resourceId: '0x00000000000000000000002170Ed0880ac9A755fd29B2688956BD959F933F801',
      },
    ],
  },
  {
    domainId: 16,
    networkId: 288,
    name: 'Boba',
    decimals: 18,
    bridgeAddress: '0x7b2a5C88AB9367147F6ac384F857CbaDF5aA70a7' as Address,
    type: 'Ethereum',
    nativeTokenSymbol: 'ETH',
    tokens: [
      {
        address: '0xd65CceCFf339e5680b1A1E7821421932cc2b114f' as Address,
        name: 'IceCream',
        symbol: 'ICE',
        imageUri: 'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xB999Ea90607a826A3E6E6646B404c3C7d11fa39D/logo.png',
        resourceId: '0x0000000000000000000000B999Ea90607a826A3E6E6646B404c3C7d11fa39D02',
      },
      {
        address: '0x7D5a56742C082FcDfc240cd7D1775f00e059771F' as Address,
        name: 'Tether USD',
        symbol: 'USDT',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xC7E6d7E08A89209F02af47965337714153c529F0/logo.png',
        resourceId: '0x0000000000000000000000C7E6d7E08A89209F02af47965337714153c529F001',
      },
    ],
  },
  {
    domainId: 17,
    networkId: 666666666,
    name: 'Degen',
    decimals: 18,
    bridgeAddress: '0x3D4440F335060a0341C9E6C3bBeE85E552505FFF' as Address,
    type: 'Ethereum',
    nativeTokenSymbol: 'DEGEN',
    tokens: [
      {
        address: '0x7b2a5C88AB9367147F6ac384F857CbaDF5aA70a7' as Address,
        name: 'IceCream',
        symbol: 'ICE',
        imageUri: 'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xB999Ea90607a826A3E6E6646B404c3C7d11fa39D/logo.png',
        resourceId: '0x0000000000000000000000B999Ea90607a826A3E6E6646B404c3C7d11fa39D02',
      },
      {
        address: '0x8ACeb2687B59F97Da274FE9135C3fAda0751ecb2' as Address,
        name: 'Tether USD',
        symbol: 'USDT',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xC7E6d7E08A89209F02af47965337714153c529F0/logo.png',
        resourceId: '0x0000000000000000000000C7E6d7E08A89209F02af47965337714153c529F001',
      },
    ],
  },
  {
    domainId: 18,
    networkId: ChainId.RARI,
    name: 'Rari',
    decimals: 18,
    bridgeAddress: '0x7b2a5C88AB9367147F6ac384F857CbaDF5aA70a7' as Address,
    type: 'Ethereum',
    nativeTokenSymbol: 'RARI',
    tokens: [
      {
        address: '0xd65CceCFf339e5680b1A1E7821421932cc2b114f' as Address,
        name: 'IceCream',
        symbol: 'ICE',
        imageUri: 'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xB999Ea90607a826A3E6E6646B404c3C7d11fa39D/logo.png',
        resourceId: '0x0000000000000000000000B999Ea90607a826A3E6E6646B404c3C7d11fa39D02',
      },
      {
        address: '0x7D5a56742C082FcDfc240cd7D1775f00e059771F' as Address,
        name: 'Tether USD',
        symbol: 'USDT',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xC7E6d7E08A89209F02af47965337714153c529F0/logo.png',
        resourceId: '0x0000000000000000000000C7E6d7E08A89209F02af47965337714153c529F001',
      },
    ],
  },
]

export type BridgeChain = typeof chains[number]
export type TokenConfig = BridgeChain['tokens'][number]

export const bridgeChains = chains as BridgeChain[]
