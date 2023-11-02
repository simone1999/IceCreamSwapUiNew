import { ChainId } from '@pancakeswap/chains'
import { AppHeader } from 'components/App'
import { BodyWrapper } from 'components/App/AppBody'
import { useRouter } from 'next/router'
import { safeGetAddress } from 'utils'
import LiquidityFormProvider from 'views/AddLiquidityV3/formViews/V3FormView/form/LiquidityFormProvider'
import { Migrate } from 'views/AddLiquidityV3/Migrate'
import Page from 'views/Page'
import { SUPPORT_SWAP, SUPPORT_SWAP_V3 } from "config/constants/supportChains";

function MigratePage() {
  // const { t } = useTranslation()

  const router = useRouter()

  const address = safeGetAddress(router.query.address)

  return (
    <LiquidityFormProvider>
      <Page>
        <BodyWrapper style={{ maxWidth: '858px' }}>
          <AppHeader title="Migrate Liquidity" />
          {address && <Migrate v2PairAddress={address} />}
        </BodyWrapper>
      </Page>
    </LiquidityFormProvider>
  )
}

export default MigratePage

// chains with V2 and V3 dex are supported
MigratePage.chains = SUPPORT_SWAP_V3.filter(chainId => SUPPORT_SWAP.includes(chainId))
