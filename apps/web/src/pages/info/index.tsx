import { InfoPageLayout } from 'views/Info'
import Overview from 'views/Info/Overview'
import {SUPPORT_INFO} from "../../config/constants/supportChains";

const InfoPage = () => {
  return <Overview />
}

InfoPage.Layout = InfoPageLayout
InfoPage.chains = SUPPORT_INFO

export default InfoPage
