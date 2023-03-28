import Tokens from 'views/Info/Tokens'
import { InfoPageLayout } from 'views/Info'
import { SUPPORT_INFO } from 'config/constants/supportChains'

const InfoTokensPage = () => {
  return <Tokens />
}

InfoTokensPage.Layout = InfoPageLayout
InfoTokensPage.chains = SUPPORT_INFO

export default InfoTokensPage
