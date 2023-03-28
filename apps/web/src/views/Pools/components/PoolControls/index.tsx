import { useWeb3React } from '@pancakeswap/wagmi'
import { Pool } from '@pancakeswap/uikit'
import { useUserPoolStakedOnly, useUserPoolsViewMode } from 'state/user/hooks'
import { useInitialBlock } from 'state/block/hooks'
import { Token } from '@pancakeswap/sdk'
import { getChain } from "@icecreamswap/constants"
import {useActiveChainId} from "../../../../hooks/useActiveChainId";

export default function PoolControlsContainer(props) {
  const [stakedOnly, setStakedOnly] = useUserPoolStakedOnly()
  const [viewMode, setViewMode] = useUserPoolsViewMode()
  const { account } = useWeb3React()
  const initialBlock = useInitialBlock()
  const { chainId } = useActiveChainId()
  const poolStartBlockThreshold = (60 / getChain(chainId).blockInterval) * 60  // show pool 60 min before it goes live
  const threshHold = initialBlock > 0 ? initialBlock + poolStartBlockThreshold : 0

  return (
    <Pool.PoolControls<Token>
      {...props}
      stakedOnly={stakedOnly}
      setStakedOnly={setStakedOnly}
      viewMode={viewMode}
      setViewMode={setViewMode}
      account={account}
      threshHold={threshHold}
    />
  )
}
