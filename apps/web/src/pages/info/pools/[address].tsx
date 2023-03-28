import { SUPPORT_INFO } from 'config/constants/supportChains'
import { useRouter } from 'next/router'
import { InfoPageLayout } from 'views/Info'
import Pool from 'views/Info/Pools/PoolPage'

const PoolPage = () => {
  const router = useRouter()
  return <Pool address={String(router.query.address)} />
}

PoolPage.Layout = InfoPageLayout
PoolPage.chains = SUPPORT_INFO

export default PoolPage
