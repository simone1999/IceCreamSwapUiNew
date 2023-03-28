import { useRouter } from 'next/router'
import LaunchpadList from 'views/Launchpad/CampaignList'
import { CampaignOverview } from 'views/Launchpad/CampaignOverview'

const LaunchpadPage = () => {
  const { id } = useRouter()?.query || {}
  return <CampaignOverview id={Number(id)} />
}

LaunchpadPage.chains = [1116]

export default LaunchpadPage
