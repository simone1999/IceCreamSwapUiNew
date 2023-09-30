const chains = [
  {
    domainId: 1,
    networkId: 56,
    name: 'BinanceSmartChain',
    decimals: 18,
    bridgeAddress: '0x8e6dAa037b7F130020b30562f1E2a5D02233E6c5',
    rpcUrl: 'https://bscrpc.com',
    type: 'Ethereum',
    nativeTokenSymbol: 'BNB',
    tokens: [
      {
        address: '0xce6c9c70f91c6797873EFC80505f972290A88f5D',
        name: 'IceCream',
        symbol: 'ICE',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xB999Ea90607a826A3E6E6646B404c3C7d11fa39D/logo.png',
        resourceId: '0x0000000000000000000000B999Ea90607a826A3E6E6646B404c3C7d11fa39D02',
      },
      {
        address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
        name: 'Wrapped BNB',
        symbol: 'WBNB',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0x74446a7418BFbFCDe3F1f6bCaFFA097d050a6dD8/logo.png',
        resourceId: '0x0000000000000000000000bb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c01',
      },
      /* {
        address: '0x8FFf93E810a2eDaaFc326eDEE51071DA9d398E83',
        name: 'Brise',
        symbol: 'BRISE',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0x0000000000000000000000000000000000000000/logo.png',
        resourceId: '0x0000000000000000000000000000000000000000000000000000000000000002',
      }, */
      {
        address: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
        name: 'BUSD',
        symbol: 'BUSD',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xd0CE781960c6356A7175988751bfC8d7cd28EA60/logo.png',
        resourceId: '0x0000000000000000000000e9e7CEA3DedcA5984780Bafc599bD69ADd087D5601',
      },
      {
        address: '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3',
        name: 'Dai',
        symbol: 'DAI',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0x71Ef0A490E53Cc177F640169b0347Be4d0f23cc9/logo.png',
        resourceId: '0x00000000000000000000001AF3F329e8BE154074D8769D1FFa4eE058B1DBc301',
      },
      {
        address: '0xbA2aE424d960c26247Dd6c32edC70B295c744C43',
        name: 'Dogecoin',
        symbol: 'DOGE',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0x46a8E16dB8Bb241618873bCA21Ef02F120EA4125/logo.png',
        resourceId: '0x0000000000000000000000bA2aE424d960c26247Dd6c32edC70B295c744C4301',
      },
      {
        address: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
        name: 'Ether',
        symbol: 'ETH',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xeA61Dc96F105469522d39cBF7bD59b42393678F7/logo.png',
        resourceId: '0x00000000000000000000002170Ed0880ac9A755fd29B2688956BD959F933F801',
      },
      {
        address: '0x2859e4544C4bB03966803b044A93563Bd2D0DD4D',
        name: 'Shiba Inu',
        symbol: 'SHIB',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xADF3051f6fbC1f42ee20B2eDb47EA7f6CcaBe978/logo.png',
        resourceId: '0x00000000000000000000002859e4544C4bB03966803b044A93563Bd2D0DD4D01',
      },
      {
        address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
        name: 'USD Coin',
        symbol: 'USDC',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xaEdD3Ff7b9Fc5fc4e44d140b80f0B1C7FdB6102c/logo.png',
        resourceId: '0x00000000000000000000008AC76a51cc950d9822D68b83fE1Ad97B32Cd580d01',
      },
      {
        address: '0x55d398326f99059fF775485246999027B3197955',
        name: 'Tether USD',
        symbol: 'USDT',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xC7E6d7E08A89209F02af47965337714153c529F0/logo.png',
        resourceId: '0x0000000000000000000000C7E6d7E08A89209F02af47965337714153c529F001',
      },
      {
        address: '0x71Ef0A490E53Cc177F640169b0347Be4d0f23cc9',
        name: 'HotDoge',
        symbol: 'HOTDOGE',
        imageUri: 'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/doge/assets/0x05888e66703c1e79aD5803433CF25a05f18e76C6/logo.png',
        resourceId: '0x000000000000000000000005888e66703c1e79aD5803433CF25a05f18e76C603',
      },
      {
        address: '0x7a89fae255957C190ac8552f559be0Ad0401A081',
        name: 'MemeRoyale',
        symbol: 'ROYALE',
        imageUri: 'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/binance/assets/0x7a89fae255957C190ac8552f559be0Ad0401A081/logo.png',
        resourceId: '0x00000000000000000000007a89fae255957C190ac8552f559be0Ad0401A08101',
      },
      {
        address: '0xf8F82F2CE26E7840f15B7f0C7ecF8b7f73e035Ca',
        name: 'Young Parrot',
        symbol: 'YPC',
        imageUri:
            'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0x11203a00a9134Db8586381C4B2fca0816476b3FD/logo.png',
        resourceId: '0x000000000000000000000011203a00a9134Db8586381C4B2fca0816476b3FD02',
      },
      {
        address: '0x0938a5d325A8496c186Cf122946e9dD22f8a625b',
        name: 'Digital Files',
        symbol: 'DIFI',
        imageUri: 'https://www.bscscan.com/token/images/difi_32.png?v=093',
        resourceId: '0x00000000000000000000000938a5d325A8496c186Cf122946e9dD22f8a625b01',
      },
      {
        address: '0xe252FCb1Aa2E0876E9B5f3eD1e15B9b4d11A0b00',
        name: 'CRYSTAL STONES',
        symbol: 'CRYSTAL',
        imageUri: 'https://icecreamswap-assets.s3.amazonaws.com/token/1116/0x005133502d02ddDe90D5f5283E4Af0F33A4a4db2.png',
        resourceId: '0x0000000000000000000000005133502d02ddDe90D5f5283E4Af0F33A4a4db207',
      },
    ],
  },
  {
    domainId: 2,
    networkId: 32520,
    name: 'Bitgert',
    decimals: 18,
    bridgeAddress: '0xE8b0dF74192CCA9C4de66F23653476f6e6CD1d98',
    rpcUrl: 'https://rpc.icecreamswap.com',
    type: 'Ethereum',
    nativeTokenSymbol: 'Brise',
    tokens: [
      /* {
        address: '0x0000000000000000000000000000000000000000',
        name: 'Brise',
        symbol: 'BRISE',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0x0000000000000000000000000000000000000000/logo.png',
        resourceId: '0x0000000000000000000000000000000000000000000000000000000000000002',
      }, */
      {
        address: '0xB999Ea90607a826A3E6E6646B404c3C7d11fa39D',
        name: 'IceCream',
        symbol: 'ICE',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xB999Ea90607a826A3E6E6646B404c3C7d11fa39D/logo.png',
        resourceId: '0x0000000000000000000000B999Ea90607a826A3E6E6646B404c3C7d11fa39D02',
      },
      {
        address: '0x74446a7418BFbFCDe3F1f6bCaFFA097d050a6dD8',
        name: 'BNB',
        symbol: 'BNBi',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0x74446a7418BFbFCDe3F1f6bCaFFA097d050a6dD8/logo.png',
        resourceId: '0x0000000000000000000000bb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c01',
      },
      {
        address: '0xd0CE781960c6356A7175988751bfC8d7cd28EA60',
        name: 'BUSD',
        symbol: 'BUSDi',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xd0CE781960c6356A7175988751bfC8d7cd28EA60/logo.png',
        resourceId: '0x0000000000000000000000e9e7CEA3DedcA5984780Bafc599bD69ADd087D5601',
      },
      {
        address: '0x71Ef0A490E53Cc177F640169b0347Be4d0f23cc9',
        name: 'Dai',
        symbol: 'DAIi',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0x71Ef0A490E53Cc177F640169b0347Be4d0f23cc9/logo.png',
        resourceId: '0x00000000000000000000001AF3F329e8BE154074D8769D1FFa4eE058B1DBc301',
      },
      {
        address: '0x46a8E16dB8Bb241618873bCA21Ef02F120EA4125',
        name: 'Dogecoin',
        symbol: 'DOGEi',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0x46a8E16dB8Bb241618873bCA21Ef02F120EA4125/logo.png',
        resourceId: '0x0000000000000000000000bA2aE424d960c26247Dd6c32edC70B295c744C4301',
      },
      {
        address: '0xeA61Dc96F105469522d39cBF7bD59b42393678F7',
        name: 'Ether',
        symbol: 'ETHi',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xeA61Dc96F105469522d39cBF7bD59b42393678F7/logo.png',
        resourceId: '0x00000000000000000000002170Ed0880ac9A755fd29B2688956BD959F933F801',
      },
      {
        address: '0xc3b730dD10A7e9A69204bDf6cb5A426e4f1F09E3',
        name: 'LunaGens',
        symbol: 'LUNG',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xc3b730dD10A7e9A69204bDf6cb5A426e4f1F09E3/logo.png',
        resourceId: '0x000000000000000000000028B9aed756De31B6b362aA0f23211D13093EBb7901',
      },
      {
        address: '0xADF3051f6fbC1f42ee20B2eDb47EA7f6CcaBe978',
        name: 'Shiba Inu',
        symbol: 'SHIBi',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xADF3051f6fbC1f42ee20B2eDb47EA7f6CcaBe978/logo.png',
        resourceId: '0x00000000000000000000002859e4544C4bB03966803b044A93563Bd2D0DD4D01',
      },
      {
        address: '0xaEdD3Ff7b9Fc5fc4e44d140b80f0B1C7FdB6102c',
        name: 'USD Coin',
        symbol: 'USDCi',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xaEdD3Ff7b9Fc5fc4e44d140b80f0B1C7FdB6102c/logo.png',
        resourceId: '0x00000000000000000000008AC76a51cc950d9822D68b83fE1Ad97B32Cd580d01',
      },
      {
        address: '0xC7E6d7E08A89209F02af47965337714153c529F0',
        name: 'Tether USD IceCream',
        symbol: 'USDTi',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xC7E6d7E08A89209F02af47965337714153c529F0/logo.png',
        resourceId: '0x0000000000000000000000C7E6d7E08A89209F02af47965337714153c529F001',
      },
      {
        address: '0x11203a00a9134Db8586381C4B2fca0816476b3FD',
        name: 'Young Parrot',
        symbol: 'YPC',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0x11203a00a9134Db8586381C4B2fca0816476b3FD/logo.png',
        resourceId: '0x000000000000000000000011203a00a9134Db8586381C4B2fca0816476b3FD02',
      },
      {
        address: '0x6D347fdCb302a5879545E01EceE7A176db23dCDa',
        name: '4D Twin Maps',
        symbol: 'MAP',
        imageUri: 'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0x6D347fdCb302a5879545E01EceE7A176db23dCDa/logo.png',
        resourceId: '0x00000000000000000000006D347fdCb302a5879545E01EceE7A176db23dCDa02',
      },
      {
        address: '0x9F7Bb6E8386ac9ad5e944d66fBa80F3F7231FA94',
        name: 'AIBRA',
        symbol: 'ABR',
        imageUri: 'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0x9F7Bb6E8386ac9ad5e944d66fBa80F3F7231FA94/logo.png',
        resourceId: '0x00000000000000000000009F7Bb6E8386ac9ad5e944d66fBa80F3F7231FA9402',
      },
      {
        address: '0x5feDA75eaB27814Cba0694C9711F7d4abEa5b0b5',
        name: '3D City',
        symbol: '$3DC',
        imageUri: 'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0x5feDA75eaB27814Cba0694C9711F7d4abEa5b0b5/logo.png',
        resourceId: '0x00000000000000000000005feDA75eaB27814Cba0694C9711F7d4abEa5b0b502',
      },
    ],
  },
  {
    domainId: 3,
    networkId: 2000,
    name: 'Dogechain',
    decimals: 18,
    bridgeAddress: '0x40375C92d9FAf44d2f9db9Bd9ba41a3317a2404f',
    rpcUrl: 'https://rpc.dogechain.dog',
    type: 'Ethereum',
    nativeTokenSymbol: 'Doge',
    tokens: [
      {
        address: '0x81bCEa03678D1CEF4830942227720D542Aa15817',
        name: 'IceCream',
        symbol: 'ICE',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/doge/assets/0x81bCEa03678D1CEF4830942227720D542Aa15817/logo.png',
        resourceId: '0x0000000000000000000000B999Ea90607a826A3E6E6646B404c3C7d11fa39D02',
      },
      {
        address: '0xB7ddC6414bf4F5515b52D8BdD69973Ae205ff101',
        name: 'Wrapped WDogecoin',
        symbol: 'WWDOGE',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/doge/assets/0xb7ddc6414bf4f5515b52d8bdd69973ae205ff101/logo.png',
        resourceId: '0x0000000000000000000000bA2aE424d960c26247Dd6c32edC70B295c744C4301',
      },
      {
        address: '0xD2683b22287E63D22928CBe4514003a92507f474',
        name: 'Tether USD',
        symbol: 'USDT',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/doge/assets/0xD2683b22287E63D22928CBe4514003a92507f474/logo.png',
        resourceId: '0x0000000000000000000000C7E6d7E08A89209F02af47965337714153c529F001',
      },
      {
        address: '0xDC2393dc10734BF153153038943a5deB42b209cd',
        name: 'Ether',
        symbol: 'ETH',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/doge/assets/0xDC2393dc10734BF153153038943a5deB42b209cd/logo.png',
        resourceId: '0x00000000000000000000002170Ed0880ac9A755fd29B2688956BD959F933F801',
      },
      {
        address: '0xC7E6d7E08A89209F02af47965337714153c529F0',
        name: 'BNB',
        symbol: 'BNB',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/doge/assets/0xC7E6d7E08A89209F02af47965337714153c529F0/logo.png',
        resourceId: '0x0000000000000000000000bb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c01',
      },
      {
        address: '0xB25cB6a275a8D6a613228FB161eB3627b50EB696',
        name: 'Shiba Inu',
        symbol: 'SHIB',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/doge/assets/0xB25cB6a275a8D6a613228FB161eB3627b50EB696/logo.png',
        resourceId: '0x00000000000000000000002859e4544C4bB03966803b044A93563Bd2D0DD4D01',
      },
      {
        address: '0xc57F0eb99363e747D637B17BBdB4e1AB85e60631',
        name: 'Dai',
        symbol: 'DAI',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/doge/assets/0xc57F0eb99363e747D637B17BBdB4e1AB85e60631/logo.png',
        resourceId: '0x00000000000000000000001AF3F329e8BE154074D8769D1FFa4eE058B1DBc301',
      },
      {
        address: '0xce6c9c70f91c6797873EFC80505f972290A88f5D',
        name: 'USD Coin',
        symbol: 'USDC',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/doge/assets/0xce6c9c70f91c6797873EFC80505f972290A88f5D/logo.png',
        resourceId: '0x00000000000000000000008AC76a51cc950d9822D68b83fE1Ad97B32Cd580d01',
      },
      {
        address: '0x905caAE1627856529BEd7b9572F02af5e5Ac6cA7',
        name: 'BUSD',
        symbol: 'BUSD',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/doge/assets/0x905caAE1627856529BEd7b9572F02af5e5Ac6cA7/logo.png',
        resourceId: '0x0000000000000000000000e9e7CEA3DedcA5984780Bafc599bD69ADd087D5601',
      },
      {
        address: '0x876607adc4CC715CDE0183fdC49eA2539053f358',
        name: 'LunaGens',
        symbol: 'LUNG',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/doge/assets/0x876607adc4CC715CDE0183fdC49eA2539053f358/logo.png',
        resourceId: '0x000000000000000000000028B9aed756De31B6b362aA0f23211D13093EBb7901',
      },
      {
        address: '0x05888e66703c1e79aD5803433CF25a05f18e76C6',
        name: 'HotDoge',
        symbol: 'HOTDOGE',
        imageUri: 'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/doge/assets/0x05888e66703c1e79aD5803433CF25a05f18e76C6/logo.png',
        resourceId: '0x000000000000000000000005888e66703c1e79aD5803433CF25a05f18e76C603',
      },
    ],
  },
    /*
  {
    domainId: 4,
    networkId: 61916,
    name: 'Doken',
    decimals: 18,
    bridgeAddress: '0xc0E49f8C615d3d4c245970F6Dc528E4A47d69a44',
    rpcUrl: 'https://ukrpc.doken.dev',
    type: 'Ethereum',
    nativeTokenSymbol: 'DKN',
    tokens: [
      {
        address: '0x54051D9DbE99687867090d95fe15C3D3E35512Ba',
        name: 'IceCream',
        symbol: 'ICE',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xB999Ea90607a826A3E6E6646B404c3C7d11fa39D/logo.png',
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
        name: 'BUSD',
        symbol: 'BUSD',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xd0CE781960c6356A7175988751bfC8d7cd28EA60/logo.png',
        resourceId: '0x0000000000000000000000e9e7CEA3DedcA5984780Bafc599bD69ADd087D5601',
      },
      {
        address: '0x8687cD1d02A28098571067ddB18F33fEF667C929',
        name: 'Dai',
        symbol: 'DAI',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0x71Ef0A490E53Cc177F640169b0347Be4d0f23cc9/logo.png',
        resourceId: '0x00000000000000000000001AF3F329e8BE154074D8769D1FFa4eE058B1DBc301',
      },
      {
        address: '0xD2683b22287E63D22928CBe4514003a92507f474',
        name: 'Dogecoin',
        symbol: 'DOGE',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0x46a8E16dB8Bb241618873bCA21Ef02F120EA4125/logo.png',
        resourceId: '0x0000000000000000000000bA2aE424d960c26247Dd6c32edC70B295c744C4301',
      },
      {
        address: '0xDC2393dc10734BF153153038943a5deB42b209cd',
        name: 'Ether',
        symbol: 'ETH',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xeA61Dc96F105469522d39cBF7bD59b42393678F7/logo.png',
        resourceId: '0x00000000000000000000002170Ed0880ac9A755fd29B2688956BD959F933F801',
      },
      {
        address: '0x669E7828dF230eccEc83f3a9a850b5A3F1141Af2',
        name: 'LunaGens',
        symbol: 'LUNG',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xc3b730dD10A7e9A69204bDf6cb5A426e4f1F09E3/logo.png',
        resourceId: '0x000000000000000000000028B9aed756De31B6b362aA0f23211D13093EBb7901',
      },
      {
        address: '0xC7E6d7E08A89209F02af47965337714153c529F0',
        name: 'Shiba Inu',
        symbol: 'SHIB',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xADF3051f6fbC1f42ee20B2eDb47EA7f6CcaBe978/logo.png',
        resourceId: '0x00000000000000000000002859e4544C4bB03966803b044A93563Bd2D0DD4D01',
      },
      {
        address: '0xB25cB6a275a8D6a613228FB161eB3627b50EB696',
        name: 'USD Coin',
        symbol: 'USDC',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xaEdD3Ff7b9Fc5fc4e44d140b80f0B1C7FdB6102c/logo.png',
        resourceId: '0x00000000000000000000008AC76a51cc950d9822D68b83fE1Ad97B32Cd580d01',
      },
      {
        address: '0x8e6dAa037b7F130020b30562f1E2a5D02233E6c5',
        name: 'Tether USD',
        symbol: 'USDT',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xC7E6d7E08A89209F02af47965337714153c529F0/logo.png',
        resourceId: '0x0000000000000000000000C7E6d7E08A89209F02af47965337714153c529F001',
      },
      {
        address: '0x882d496af0c89c842F81Cd4850e75f75F7a3B9aE',
        name: 'Young Parrot',
        symbol: 'YPC',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0x11203a00a9134Db8586381C4B2fca0816476b3FD/logo.png',
        resourceId: '0x000000000000000000000011203a00a9134Db8586381C4B2fca0816476b3FD02',
      },
    ],
  },
  */
  {
    domainId: 5,
    networkId: 122,
    name: 'Fuse',
    decimals: 18,
    bridgeAddress: '0x81bCEa03678D1CEF4830942227720D542Aa15817',
    rpcUrl: 'https://rpc.fuse.io',
    type: 'Ethereum',
    nativeTokenSymbol: 'FUSE',
    tokens: [
      {
        address: '0x867f08A3ab824b42e8058a1B48e32E1dF205b092',
        name: 'IceCream',
        symbol: 'ICE',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xB999Ea90607a826A3E6E6646B404c3C7d11fa39D/logo.png',
        resourceId: '0x0000000000000000000000B999Ea90607a826A3E6E6646B404c3C7d11fa39D02',
      },
      {
        address: '0x12AA82525DEfF84777fa78578A68ceB854A85f43',
        name: 'Dogecoin',
        symbol: 'DOGE',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0x46a8E16dB8Bb241618873bCA21Ef02F120EA4125/logo.png',
        resourceId: '0x0000000000000000000000bA2aE424d960c26247Dd6c32edC70B295c744C4301',
      },
      {
        address: '0x8687cD1d02A28098571067ddB18F33fEF667C929',
        name: 'Shiba Inu',
        symbol: 'SHIB',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xADF3051f6fbC1f42ee20B2eDb47EA7f6CcaBe978/logo.png',
        resourceId: '0x00000000000000000000002859e4544C4bB03966803b044A93563Bd2D0DD4D01',
      },
    ],
  },
  {
    domainId: 6,
    networkId: 50,
    name: 'XDC',
    decimals: 18,
    bridgeAddress: '0x40375C92d9FAf44d2f9db9Bd9ba41a3317a2404f',
    rpcUrl: 'https://erpc.xinfin.network',
    type: 'Ethereum',
    nativeTokenSymbol: 'XDC',
    tokens: [
      {
        address: '0x54051D9DbE99687867090d95fe15C3D3E35512Ba',
        name: 'IceCream',
        symbol: 'ICE',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xB999Ea90607a826A3E6E6646B404c3C7d11fa39D/logo.png',
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
        name: 'BUSD',
        symbol: 'BUSD',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xd0CE781960c6356A7175988751bfC8d7cd28EA60/logo.png',
        resourceId: '0x0000000000000000000000e9e7CEA3DedcA5984780Bafc599bD69ADd087D5601',
      },
      {
        address: '0x8687cD1d02A28098571067ddB18F33fEF667C929',
        name: 'Dai',
        symbol: 'DAI',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0x71Ef0A490E53Cc177F640169b0347Be4d0f23cc9/logo.png',
        resourceId: '0x00000000000000000000001AF3F329e8BE154074D8769D1FFa4eE058B1DBc301',
      },
      {
        address: '0xD2683b22287E63D22928CBe4514003a92507f474',
        name: 'Dogecoin',
        symbol: 'DOGE',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0x46a8E16dB8Bb241618873bCA21Ef02F120EA4125/logo.png',
        resourceId: '0x0000000000000000000000bA2aE424d960c26247Dd6c32edC70B295c744C4301',
      },
      {
        address: '0xDC2393dc10734BF153153038943a5deB42b209cd',
        name: 'Ether',
        symbol: 'ETH',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xeA61Dc96F105469522d39cBF7bD59b42393678F7/logo.png',
        resourceId: '0x00000000000000000000002170Ed0880ac9A755fd29B2688956BD959F933F801',
      },
      {
        address: '0xC7E6d7E08A89209F02af47965337714153c529F0',
        name: 'Shiba Inu',
        symbol: 'SHIB',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xADF3051f6fbC1f42ee20B2eDb47EA7f6CcaBe978/logo.png',
        resourceId: '0x00000000000000000000002859e4544C4bB03966803b044A93563Bd2D0DD4D01',
      },
      {
        address: '0xB25cB6a275a8D6a613228FB161eB3627b50EB696',
        name: 'USD Coin',
        symbol: 'USDC',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xaEdD3Ff7b9Fc5fc4e44d140b80f0B1C7FdB6102c/logo.png',
        resourceId: '0x00000000000000000000008AC76a51cc950d9822D68b83fE1Ad97B32Cd580d01',
      },
      {
        address: '0xc57F0eb99363e747D637B17BBdB4e1AB85e60631',
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
    bridgeAddress: '0x54051D9DbE99687867090d95fe15C3D3E35512Ba',
    rpcUrl: 'https://rpc.coredao.org/',
    type: 'Ethereum',
    nativeTokenSymbol: 'CORE',
    tokens: [
      {
        address: '0xc0E49f8C615d3d4c245970F6Dc528E4A47d69a44',
        name: 'IceCream',
        symbol: 'ICE',
        imageUri: 'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xB999Ea90607a826A3E6E6646B404c3C7d11fa39D/logo.png',
        resourceId: '0x0000000000000000000000B999Ea90607a826A3E6E6646B404c3C7d11fa39D02',
      },
      {
        address: '0x12AA82525DEfF84777fa78578A68ceB854A85f43',
        name: 'BNB',
        symbol: 'BNB',
        imageUri:
            'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0x74446a7418BFbFCDe3F1f6bCaFFA097d050a6dD8/logo.png',
        resourceId: '0x0000000000000000000000bb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c01',
      },
      {
        address: '0x8687cD1d02A28098571067ddB18F33fEF667C929',
        name: 'BUSD',
        symbol: 'BUSD',
        imageUri:
            'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xd0CE781960c6356A7175988751bfC8d7cd28EA60/logo.png',
        resourceId: '0x0000000000000000000000e9e7CEA3DedcA5984780Bafc599bD69ADd087D5601',
      },
      {
        address: '0x1f82d787a1186c67360E62869C46eADbc192846a',
        name: 'Dai',
        symbol: 'DAI',
        imageUri:
            'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0x71Ef0A490E53Cc177F640169b0347Be4d0f23cc9/logo.png',
        resourceId: '0x00000000000000000000001AF3F329e8BE154074D8769D1FFa4eE058B1DBc301',
      },
      {
        address: '0x7de0Bc2cf736f0a307299A0acFf1e89843C109a2',
        name: 'Dogecoin',
        symbol: 'DOGE',
        imageUri:
            'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0x46a8E16dB8Bb241618873bCA21Ef02F120EA4125/logo.png',
        resourceId: '0x0000000000000000000000bA2aE424d960c26247Dd6c32edC70B295c744C4301',
      },
      {
        address: '0xeF6b7BC74C9354BCf2e3F2A068e4b0B5CDf08F29',
        name: 'Ether',
        symbol: 'ETH',
        imageUri:
            'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xeA61Dc96F105469522d39cBF7bD59b42393678F7/logo.png',
        resourceId: '0x00000000000000000000002170Ed0880ac9A755fd29B2688956BD959F933F801',
      },
      {
        address: '0xD45eC0D923E7CD61666A46bfc0A8BE9C234Ae6d7',
        name: 'Shiba Inu',
        symbol: 'SHIB',
        imageUri:
            'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xADF3051f6fbC1f42ee20B2eDb47EA7f6CcaBe978/logo.png',
        resourceId: '0x00000000000000000000002859e4544C4bB03966803b044A93563Bd2D0DD4D01',
      },
      {
        address: '0xD2683b22287E63D22928CBe4514003a92507f474',
        name: 'USD Coin',
        symbol: 'USDC',
        imageUri:
            'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xaEdD3Ff7b9Fc5fc4e44d140b80f0B1C7FdB6102c/logo.png',
        resourceId: '0x00000000000000000000008AC76a51cc950d9822D68b83fE1Ad97B32Cd580d01',
      },
      {
        address: '0x81bCEa03678D1CEF4830942227720D542Aa15817',
        name: 'Tether USD',
        symbol: 'USDT',
        imageUri:
            'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xC7E6d7E08A89209F02af47965337714153c529F0/logo.png',
        resourceId: '0x0000000000000000000000C7E6d7E08A89209F02af47965337714153c529F001',
      },
      {
        address: '0xDC2393dc10734BF153153038943a5deB42b209cd',
        name: 'Young Parrot',
        symbol: 'YPC',
        imageUri:
            'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0x11203a00a9134Db8586381C4B2fca0816476b3FD/logo.png',
        resourceId: '0x000000000000000000000011203a00a9134Db8586381C4B2fca0816476b3FD02',
      },
      {
        address: '0xE8b0dF74192CCA9C4de66F23653476f6e6CD1d98',
        name: 'LunaGens',
        symbol: 'LUNG',
        imageUri:
            'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xc3b730dD10A7e9A69204bDf6cb5A426e4f1F09E3/logo.png',
        resourceId: '0x000000000000000000000028B9aed756De31B6b362aA0f23211D13093EBb7901',
      },
      {
        address: '0xA7c0B19645B653B4373E3592C84fce8C64D89E8F',
        name: 'MemeRoyale',
        symbol: 'ROYALE',
        imageUri: 'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/binance/assets/0x7a89fae255957C190ac8552f559be0Ad0401A081/logo.png',
        resourceId: '0x00000000000000000000007a89fae255957C190ac8552f559be0Ad0401A08101',
      },
      {
        address: '0xAB82f8b18ea7929815076F152b8Fd24F8b267274',
        name: '4D Twin Maps',
        symbol: 'MAP',
        imageUri: 'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0x6D347fdCb302a5879545E01EceE7A176db23dCDa/logo.png',
        resourceId: '0x00000000000000000000006D347fdCb302a5879545E01EceE7A176db23dCDa02',
      },
        /*
      {
        address: '0xe56016187C0fb36f76c33d0D0B36b47648A42D0A',
        name: 'AIBRA',
        symbol: 'ABR',
        imageUri: 'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0x9F7Bb6E8386ac9ad5e944d66fBa80F3F7231FA94/logo.png',
        resourceId: '0x00000000000000000000009F7Bb6E8386ac9ad5e944d66fBa80F3F7231FA9402',
      },
      */
      {
        address: '0x979A34f98b9a1bF2B38fD18f5c038423e4902db9',
        name: '3D City',
        symbol: '$3DC',
        imageUri: 'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/core/assets/0x979A34f98b9a1bF2B38fD18f5c038423e4902db9/logo.png',
        resourceId: '0x00000000000000000000005feDA75eaB27814Cba0694C9711F7d4abEa5b0b502',
      },
      {
        address: '0x2C291980Eeabd3571cEE64e76e8c481E773919Ac',
        name: 'Digital Files',
        symbol: 'DIFI',
        imageUri: 'https://www.bscscan.com/token/images/difi_32.png?v=093',
        resourceId: '0x00000000000000000000000938a5d325A8496c186Cf122946e9dD22f8a625b01',
      },
      {
        address: '0x5C44d3D2312AbA4d5F2406A98Bf374Bc76455092',
        name: 'WOOF',
        symbol: 'WOOF',
        imageUri: 'https://icecreamswap-assets.s3.amazonaws.com/token/1116/0x5C44d3D2312AbA4d5F2406A98Bf374Bc76455092.png',
        resourceId: '0x00000000000000000000005C44d3D2312AbA4d5F2406A98Bf374Bc7645509207',
      },
      {
        address: '0x005133502d02ddDe90D5f5283E4Af0F33A4a4db2',
        name: 'CRYSTAL STONES',
        symbol: 'CRYSTAL',
        imageUri: 'https://icecreamswap-assets.s3.amazonaws.com/token/1116/0x005133502d02ddDe90D5f5283E4Af0F33A4a4db2.png',
        resourceId: '0x0000000000000000000000005133502d02ddDe90D5f5283E4Af0F33A4a4db207',
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
    bridgeAddress: '0xce6c9c70f91c6797873EFC80505f972290A88f5D',
    rpcUrl: 'https://mainnet.telos.net/evm',
    type: 'Ethereum',
    nativeTokenSymbol: 'TLOS',
    tokens: [
      {
        address: '0xB25cB6a275a8D6a613228FB161eB3627b50EB696',
        name: 'IceCream',
        symbol: 'ICE',
        imageUri: 'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xB999Ea90607a826A3E6E6646B404c3C7d11fa39D/logo.png',
        resourceId: '0x0000000000000000000000B999Ea90607a826A3E6E6646B404c3C7d11fa39D02',
      },
      {
        address: '0xc57F0eb99363e747D637B17BBdB4e1AB85e60631',
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
    bridgeAddress: '0x81bCEa03678D1CEF4830942227720D542Aa15817',
    rpcUrl: 'https://developer-access-mainnet.base.org',
    type: 'Ethereum',
    nativeTokenSymbol: 'ETH',
    tokens: [
      {
        address: '0x40375C92d9FAf44d2f9db9Bd9ba41a3317a2404f',
        name: 'IceCream',
        symbol: 'ICE',
        imageUri: 'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xB999Ea90607a826A3E6E6646B404c3C7d11fa39D/logo.png',
        resourceId: '0x0000000000000000000000B999Ea90607a826A3E6E6646B404c3C7d11fa39D02',
      },
      {
        address: '0xc0E49f8C615d3d4c245970F6Dc528E4A47d69a44',
        name: 'Tether USD',
        symbol: 'USDT',
        imageUri:
          'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xC7E6d7E08A89209F02af47965337714153c529F0/logo.png',
        resourceId: '0x0000000000000000000000C7E6d7E08A89209F02af47965337714153c529F001',
      },
      {
        address: '0xde686b9a1BbCCC62Fb1bb75f0952C84e7D9d79E4',
        name: 'WOOF',
        symbol: 'WOOF',
        imageUri: 'https://icecreamswap-assets.s3.amazonaws.com/token/1116/0x5C44d3D2312AbA4d5F2406A98Bf374Bc76455092.png',
        resourceId: '0x00000000000000000000005C44d3D2312AbA4d5F2406A98Bf374Bc7645509207',
      },
    ],
  },
  {
    domainId: 11,
    networkId: 148,
    name: 'Shimmer',
    decimals: 18,
    bridgeAddress: '0x81bCEa03678D1CEF4830942227720D542Aa15817',
    rpcUrl: 'https://json-rpc.evm.shimmer.network',
    type: 'Ethereum',
    nativeTokenSymbol: 'SMR',
    tokens: [
      {
        address: '0x40375C92d9FAf44d2f9db9Bd9ba41a3317a2404f',
        name: 'IceCream',
        symbol: 'ICE',
        imageUri: 'https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/bitgert/assets/0xB999Ea90607a826A3E6E6646B404c3C7d11fa39D/logo.png',
        resourceId: '0x0000000000000000000000B999Ea90607a826A3E6E6646B404c3C7d11fa39D02',
      },
      {
        address: '0xc0E49f8C615d3d4c245970F6Dc528E4A47d69a44',
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
