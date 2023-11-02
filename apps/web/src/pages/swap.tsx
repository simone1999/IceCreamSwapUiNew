import { CHAIN_IDS } from 'utils/wagmi'

import { V3SubgraphHealthIndicator } from 'components/SubgraphHealthIndicator'

import { SwapFeaturesProvider } from 'views/Swap/SwapFeaturesContext'
import Swap from 'views/Swap'
import { SUPPORT_SWAP } from 'config/constants/supportChains'

const SwapPage = () => {
  return (
    <SwapFeaturesProvider>
      <Swap />
      <V3SubgraphHealthIndicator />
    </SwapFeaturesProvider>
  )
}

SwapPage.chains = SUPPORT_SWAP

export default SwapPage
