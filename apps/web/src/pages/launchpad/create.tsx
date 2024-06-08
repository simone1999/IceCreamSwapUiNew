import { CreateCampaign } from 'views/Launchpad/CreateCampaign'
import { SUPPORT_LAUNCHPAD } from "config/constants/supportChains";

const LaunchpadPage = () => {
  return <CreateCampaign />
}

LaunchpadPage.chains = SUPPORT_LAUNCHPAD

export default LaunchpadPage
