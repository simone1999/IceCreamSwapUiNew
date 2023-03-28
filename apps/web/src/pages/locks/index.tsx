import { SUPPORT_LOCKS } from 'config/constants/supportChains'
import { LocksOverview } from '../../views/Locks'

const LocksOverviewPage = () => {
  return <LocksOverview />
}

LocksOverviewPage.chains = SUPPORT_LOCKS

export default LocksOverviewPage
