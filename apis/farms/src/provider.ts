import { providers } from 'ethers'

const { StaticJsonRpcProvider } = providers

export const bscProvider = new StaticJsonRpcProvider(
  {
    url: BSC_NODE,
    skipFetchSetup: true,
  },
  56,
)

export const bitgertProvider = new StaticJsonRpcProvider(
    {
        url: 'https://rpc.icecreamswap.com',
        skipFetchSetup: true,
    },
    32520,
)

export const bscTestnetProvider = new StaticJsonRpcProvider(
  {
    url: BSC_TESTNET_NODE,
    skipFetchSetup: true,
  },
  97,
)

export const goerliProvider = new StaticJsonRpcProvider(
  {
    url: GOERLI_NODE,
    skipFetchSetup: true,
  },
  5,
)

export const ethProvider = new StaticJsonRpcProvider(
  {
    url: ETH_NODE,
    skipFetchSetup: true,
  },
  1,
)
