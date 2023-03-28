import { SUPPORT_INFO } from 'config/constants/supportChains'
import { InfoPageLayout } from 'views/Info'
import Overview from 'views/Info/Overview'

const MultiChainPage = () => {
  return <Overview />
}

MultiChainPage.Layout = InfoPageLayout
MultiChainPage.chains = SUPPORT_INFO

export default MultiChainPage
