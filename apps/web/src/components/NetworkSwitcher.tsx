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
  ModalV2
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
    <Box {...props} ref={cannotChangeNetwork ? targetRef : null} height="100%">
      {cannotChangeNetwork && tooltipVisible && tooltip}
      <UserMenu
        width="100%"
        pr="8px"
        onClick={()=>onToggleModal(true)}
        placement="bottom"
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
      </UserMenu>
      <ModalV2 isOpen={isOpenModal} closeOnOverlayClick onDismiss={()=>onToggleModal(false)}>
        <NetworkSelectModal onCloseModal={onToggleModal}/>
      </ModalV2>
    </Box>
  )
}
