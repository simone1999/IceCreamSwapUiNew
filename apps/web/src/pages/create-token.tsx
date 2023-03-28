import { SUPPORT_LOCKS } from 'config/constants/supportChains'
import { CreateToken } from '../views/CreateToken'

const LocksOverviewPage = () => {
  return <CreateToken />
}

LocksOverviewPage.chains = SUPPORT_LOCKS

export default LocksOverviewPage
