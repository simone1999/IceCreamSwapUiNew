import { useTranslation } from '@pancakeswap/localization'
import { ChainId } from '@pancakeswap/chains'
import {
  Box,
  Flex,
  LogoutIcon,
  RefreshIcon,
  useModal,
  UserMenu as UIKitUserMenu,
  UserMenuDivider,
  UserMenuItem,
  UserMenuVariant,
} from '@pancakeswap/uikit'
import ConnectWalletButton from 'components/ConnectWalletButton'
import Trans from 'components/Trans'
import { useActiveChainId } from 'hooks/useActiveChainId'
import useAuth from 'hooks/useAuth'
import NextLink from 'next/link'
import { useEffect, useState, useCallback } from 'react'
import { usePendingTransactions } from 'state/transactions/hooks'
import { useAccount } from 'wagmi'
import { useDomainNameForAddress } from 'hooks/useDomain'
import WalletModal, { WalletView } from './WalletModal'
import WalletUserMenuItem from './WalletUserMenuItem'
import LoginButton from '../../../strict/components/LoginButton'

const UserMenuItems = () => {
  const { t } = useTranslation()
  const { chainId, isWrongNetwork } = useActiveChainId()
  const { logout } = useAuth()
  const { hasPendingTransactions, pendingNumber } = usePendingTransactions()
  const [onPresentWalletModal] = useModal(<WalletModal initialView={WalletView.WALLET_INFO} />)
  const [onPresentTransactionModal] = useModal(<WalletModal initialView={WalletView.TRANSACTIONS} />)
  const [onPresentWrongNetworkModal] = useModal(<WalletModal initialView={WalletView.WRONG_NETWORK} />)
  const hasProfile = false

  const onClickWalletMenu = useCallback((): void => {
    if (isWrongNetwork) {
      onPresentWrongNetworkModal()
    } else {
      onPresentWalletModal()
    }
  }, [isWrongNetwork, onPresentWalletModal, onPresentWrongNetworkModal])

  return (
    <>
      <WalletUserMenuItem isWrongNetwork={isWrongNetwork} onPresentWalletModal={onClickWalletMenu} />
      <UserMenuItem as="button" disabled={isWrongNetwork} onClick={onPresentTransactionModal}>
        {t('Recent Transactions')}
        {hasPendingTransactions && <RefreshIcon spin />}
      </UserMenuItem>
      <UserMenuDivider />
      <UserMenuDivider />
      <UserMenuItem as="button" onClick={logout}>
        <Flex alignItems="center" justifyContent="space-between" width="100%">
          {t('Disconnect')}
          <LogoutIcon />
        </Flex>
      </UserMenuItem>
    </>
  )
}

const UserMenu = () => {
  const { t } = useTranslation()
  const { address: account } = useAccount()
  const { domainName, avatar } = useDomainNameForAddress(account)
  const { isWrongNetwork } = useActiveChainId()
  const { hasPendingTransactions, pendingNumber } = usePendingTransactions()
  const [userMenuText, setUserMenuText] = useState<string>('')
  const [userMenuVariable, setUserMenuVariable] = useState<UserMenuVariant>('default')

  useEffect(() => {
    if (hasPendingTransactions) {
      setUserMenuText(t('%num% Pending', { num: pendingNumber }))
      setUserMenuVariable('pending')
    } else {
      setUserMenuText('')
      setUserMenuVariable('default')
    }
  }, [hasPendingTransactions, pendingNumber, t])

  const menu = useCallback(({ isOpen }) => (isOpen ? <UserMenuItems /> : null), [UserMenuItems])

  if (account) {
    return (
      <UIKitUserMenu
        account={domainName || account}
        ellipsis={!domainName}
        text={userMenuText}
        variant={userMenuVariable}
      >
        {({ isOpen }) => (isOpen ? <UserMenuItems /> : null)}
      </UIKitUserMenu>
    )
  }

  if (isWrongNetwork) {
    return (
      <UIKitUserMenu text={t('Network')} variant="danger">
        {menu}
      </UIKitUserMenu>
    )
  }

  return (
    <ConnectWalletButton scale="sm">
      <Box display={['none', , , 'block']}>
        <Trans>Connect Wallet</Trans>
      </Box>
      <Box display={['block', , , 'none']}>
        <Trans>Connect</Trans>
      </Box>
    </ConnectWalletButton>
  )
}

export default UserMenu
