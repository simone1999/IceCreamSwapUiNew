import { CHAIN_IDS } from 'utils/wagmi'
import CoreLandingpage from 'views/CoreLandingpage'

const CorePage = () => {
  return <CoreLandingpage />
}

CorePage.chains = CHAIN_IDS

export default CorePage
