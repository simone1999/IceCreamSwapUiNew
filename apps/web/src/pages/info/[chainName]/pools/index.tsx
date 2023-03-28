import Pools from 'views/Info/Pools'
import { InfoPageLayout } from 'views/Info'
import { SUPPORT_INFO } from 'config/constants/supportChains'

const InfoPoolsPage = () => {
  return <Pools />
}

InfoPoolsPage.Layout = InfoPageLayout
InfoPoolsPage.chains = SUPPORT_INFO

export default InfoPoolsPage
