import { SUPPORT_LOCKS } from 'config/constants/supportChains'
import { useRouter } from 'next/router'
import { LockOverview } from '../../../views/Locks'

const LockOverviewPage = () => {
  const { lockId } = useRouter().query
  if (!lockId) return null
  return <LockOverview lockId={Number(lockId)} />
}

LockOverviewPage.chains = SUPPORT_LOCKS

export default LockOverviewPage
