import { useRouter } from 'next/router'
import LaunchpadList from 'views/Launchpad/CampaignList'
import { CampaignOverview } from 'views/Launchpad/CampaignOverview'
import { SUPPORT_LAUNCHPAD } from "config/constants/supportChains";

const LaunchpadPage = () => {
  const { id } = useRouter()?.query || {}
  return <CampaignOverview id={Number(id)} />
}

LaunchpadPage.chains = SUPPORT_LAUNCHPAD

export default LaunchpadPage
