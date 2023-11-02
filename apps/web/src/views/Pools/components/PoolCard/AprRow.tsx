import BigNumber from 'bignumber.js'
import Apr from 'views/Pools/components/Apr'
import { Token } from '@pancakeswap/sdk'
import { Pool } from '@pancakeswap/widgets-internal'

interface AprRowProps {
  pool: Pool.DeserializedPool<Token>
  stakedBalance: BigNumber
  performanceFee?: number
  showIcon?: boolean
  vaultKey?: boolean
  forceApy?: boolean
}

const AprRow: React.FC<React.PropsWithChildren<AprRowProps>> = ({
  pool,
  stakedBalance,
  performanceFee = 0,
  showIcon = true,
  forceApy= false
}) => {
  return (
    <Pool.AprRowWithToolTip forceApy={forceApy}>
      <Apr pool={pool} stakedBalance={stakedBalance} performanceFee={performanceFee} showIcon={showIcon} forceApy={forceApy} />
    </Pool.AprRowWithToolTip>
  )
}

export default AprRow
