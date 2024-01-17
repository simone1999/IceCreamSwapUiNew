import { useTranslation } from '@pancakeswap/localization'
import { ChainId, NATIVE } from '@pancakeswap/sdk'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  Box,
  BoxProps,
  Button,
  Flex,
  InfoIcon,
  Text,
  UserMenu,
  UserMenuDivider,
  UserMenuItem,
  useTooltip,
  ModalV2,
  IconButton
} from '@pancakeswap/uikit'
import { useWeb3React } from '@pancakeswap/wagmi'
import { useNetwork } from 'wagmi'
import { useActiveChainId, useLocalNetworkChain } from 'hooks/useActiveChainId'
import { useNetworkConnectorUpdater } from 'hooks/useActiveWeb3React'
import { useHover } from 'hooks/useHover'
import { useSessionChainId } from 'hooks/useSessionChainId'
import { useSwitchNetwork } from 'hooks/useSwitchNetwork'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { chains } from 'utils/wagmi'

import { ChainLogo } from './Logo/ChainLogo'
import chainName from '../config/constants/chainName'
import { useSupportedChains } from '../hooks/useSupportedChains'
import dynamic from 'next/dynamic'

const NetworkSelectModal = dynamic(() => import('./NetworkModal/NetworkSelectModal').then((mod) => mod.NetworkSelectModal), {
  ssr: false,
})

export const NetworkSwitcher: React.FC<BoxProps> = (props) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { t } = useTranslation()
  const { chainId, isWrongNetwork, isNotMatched } = useActiveChainId()
  const { pendingChainId, isLoading, canSwitch, switchNetworkAsync } = useSwitchNetwork()

  useNetworkConnectorUpdater()

  const foundChain = useMemo(
    () => chains.find((c) => c.id === (isLoading ? pendingChainId || chainId : chainId)),
    [isLoading, pendingChainId, chainId],
  )
  const symbol = NATIVE[foundChain?.id]?.symbol ?? foundChain?.nativeCurrency?.symbol
  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    t('Unable to switch network. Please try it on your wallet'),
    { placement: 'bottom' },
  )

  const cannotChangeNetwork = !canSwitch

  if (!chainId) {
    return null
  }

  const onToggleModal = (isOpen: boolean) => {
    setIsOpenModal(isOpen);
  }

  return (
    <Box  {...props} ref={cannotChangeNetwork ? targetRef : null} height="100%" style={{display:"flex", alignItems:"center"}}>
      {cannotChangeNetwork && tooltipVisible && tooltip}
      <Button
        variant="divider"
        style={{padding:'0px 0px', marginRight:"8px", height:'32px'}}
        onClick={()=>onToggleModal(true)}
      >
        <img src = {`/images/chains/${chainId}.png`} width="32px"/> &nbsp;
        <>
          <Box display={['none', null, null, null, null, 'block']}>{chainName[foundChain.id]}</Box>
          <Box display={['block', null, null, null, null, 'none']}>{symbol}</Box>
        </>
        <svg viewBox="0 0 24 24" color="text" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M8.11997 9.29006L12 13.1701L15.88 9.29006C16.27 8.90006 16.9 8.90006 17.29 9.29006C17.68 9.68006 17.68 10.3101 17.29 10.7001L12.7 15.2901C12.31 15.6801 11.68 15.6801 11.29 15.2901L6.69997 10.7001C6.30997 10.3101 6.30997 9.68006 6.69997 9.29006C7.08997 8.91006 7.72997 8.90006 8.11997 9.29006Z"></path></svg>
      </Button>
      {/* <UserMenu
        width="100%"
        height="55px"
        pr="8px"
        onClick={()=>onToggleModal(true)}
        placement="right"
        variant={isLoading ? 'pending' : isWrongNetwork ? 'danger' : 'default'}
        avatarSrc={`/images/chains/${chainId}.png`}
        disabled={cannotChangeNetwork}
        text={
          isLoading ? (
            t('Requesting')
          ) : isWrongNetwork ? (
            t('Network')
          ) : foundChain ? (
            <>
              <Box display={['none', null, null, null, null, 'block']}>{chainName[foundChain.id]}</Box>
              <Box display={['block', null, null, null, null, 'none']}>{symbol}</Box>
            </>
          ) : (
            t('Select a Network')
          )
        }
      >
        {
          () => undefined
        }
      </UserMenu> */}
      <ModalV2 isOpen={isOpenModal} closeOnOverlayClick onDismiss={()=>onToggleModal(false)}>
        <NetworkSelectModal onCloseModal={onToggleModal}/>
      </ModalV2>
    </Box>
  )
}
