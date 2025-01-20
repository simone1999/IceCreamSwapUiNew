import { languageList, useTranslation } from '@pancakeswap/localization'
import { footerLinks, Menu as UikitMenu, NextLinkFromReactRouter, useModal } from '@pancakeswap/uikit'
import USCitizenConfirmModal from 'components/Modal/USCitizenConfirmModal'
import { NetworkSwitcher } from 'components/NetworkSwitcher'
import PhishingWarningBanner from 'components/PhishingWarningBanner'
import { useCakePrice } from 'hooks/useCakePrice'
import useTheme from 'hooks/useTheme'
import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { usePhishingBanner } from '@pancakeswap/utils/user'
import { IdType } from 'hooks/useUserIsUsCitizenAcknowledgement'
import { BIG_ZERO } from '@pancakeswap/utils/bigNumber'
import GlobalSettings from './GlobalSettings'
import { SettingsMode } from './GlobalSettings/types'
import { useMenuItems } from './hooks/useMenuItems'
import UserMenu from './UserMenu'
import { getActiveMenuItem, getActiveSubMenuItem } from './utils'
import { ICE } from '@pancakeswap/tokens'

const LinkComponent = (linkProps) => {
  return <NextLinkFromReactRouter to={linkProps.href} {...linkProps} prefetch={false} />
}

const Menu = (props) => {
  const { chainId } = useActiveChainId()
  const { isDark, setTheme } = useTheme()
  const cakePrice = useCakePrice()
  const { currentLanguage, setLanguage, t } = useTranslation()
  const { pathname } = useRouter()
  const [onUSCitizenModalPresent] = useModal(
    <USCitizenConfirmModal title={t('IceCreamSwap Perpetuals')} id={IdType.PERPETUALS} />,
    false,
    false,
    'usCitizenConfirmModal',
  )
  const showPhishingWarningBanner = false

  const menuItems = useMenuItems(onUSCitizenModalPresent)

  const activeMenuItem = getActiveMenuItem({ menuConfig: menuItems, pathname })
  const activeSubMenuItem = getActiveSubMenuItem({ menuItem: activeMenuItem, pathname })

  const toggleTheme = useMemo(() => {
    return () => setTheme(isDark ? 'light' : 'dark')
  }, [setTheme, isDark])

  const getFooterLinks = useMemo(() => {
    return footerLinks(t)
  }, [t])

  const subLinks = useMemo(() => {
    if (activeSubMenuItem?.items?.length > 0) {
      return activeSubMenuItem.items
    }
    for (const menuItem of menuItems) {
      const parentSubLinks = menuItem.items?.find((item) => item.items?.includes(activeSubMenuItem))
      if (parentSubLinks) {
        return parentSubLinks.items
      }
    }

    return activeMenuItem?.hideSubNav || activeSubMenuItem?.hideSubNav ? [] : activeMenuItem?.items
  }, [activeMenuItem?.hideSubNav, activeMenuItem?.items, activeSubMenuItem, menuItems])

  const linkComponent = useCallback((linkProps) => {
    return <NextLinkFromReactRouter to={linkProps.href} {...linkProps} prefetch={false} />
  }, [])

  const rightSide = useMemo(() => {
    return (
      <>
        <GlobalSettings mode={SettingsMode.GLOBAL} />
        <NetworkSwitcher />
        <UserMenu />
      </>
    )
  }, [])

  return (
    <>
      <UikitMenu
        linkComponent={linkComponent}
        rightSide={rightSide}
        banner={showPhishingWarningBanner && typeof window !== 'undefined' && <PhishingWarningBanner />}
        isDark={isDark}
        toggleTheme={toggleTheme}
        currentLang={currentLanguage.code}
        langs={languageList}
        setLang={setLanguage}
        // cakePriceUsd={cakePrice.eq(BIG_ZERO) ? undefined : cakePrice}
        links={menuItems}
        subLinks={subLinks}
        footerLinks={getFooterLinks}
        activeItem={activeMenuItem?.href}
        activeSubItem={activeSubMenuItem?.href}
        buyCakeLabel={t('Buy ICE')}
        buyCakeLink={`/swap?chainId=${chainId}&outputCurrency=${ICE[chainId]}`}
        {...props}
      />
    </>
  )
}

export default Menu
