import { useTranslation } from '@pancakeswap/localization'
import { ChainId } from '@pancakeswap/sdk'
import { SubMenuItems } from '@pancakeswap/uikit'
import { useWeb3React } from '@pancakeswap/wagmi'
import { useEffect } from 'react'
import { useGetChainName } from 'state/info/hooks'
import { useRouter } from 'next/router'
import { useActiveChainId } from 'hooks/useActiveChainId'
import InfoNav from './components/InfoNav'

export const InfoPageLayout = ({ children }) => {
  const router = useRouter()
  const chainName = useGetChainName()
  const { t } = useTranslation()

  /*
  useEffect(() => {
    if (account && chainId === ChainId.BSC && router.query.chainName === 'eth')
      router.replace('/info', undefined, { shallow: true })
  }, [chainId, account, chainName, router])
  */

  const isStableSwap = router.query.type === 'stableSwap'
  return (
    <>
      <InfoNav isStableSwap={isStableSwap} />
      {children}
    </>
  )
}
