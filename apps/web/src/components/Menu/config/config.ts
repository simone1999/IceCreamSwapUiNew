import {
  MenuItemsType,
  SwapIcon,
  SwapFillIcon,
  EarnFillIcon,
  EarnIcon,
  DropdownMenuItems,
  BridgeIcon,
  DropdownMenuItemType,
  RocketIcon,
  InfoIcon,
  MoreHorizontalIcon,
} from '@pancakeswap/uikit'
import { ContextApi } from '@pancakeswap/localization'
import {
  SUPPORT_BUY_CRYPTO,
  SUPPORT_FARMS,
  SUPPORT_STAKING,
  SUPPORT_INFO,
  SUPPORT_SWAP,
  SUPPORT_BRIDGE,
  SUPPORT_LOCKS,
  SUPPORT_LAUNCHPAD,
  SUPPORT_TOKEN_DEPLOYER,
  SUPPORT_KYC,
  SUPPORT_KYC_DELEGATION,
} from 'config/constants/supportChains'

export type ConfigMenuDropDownItemsType = DropdownMenuItems & {
  hideSubNav?: boolean
  items?: ConfigMenuDropDownItemsType[]
}
export type ConfigMenuItemsType = Omit<MenuItemsType, 'items'> & { hideSubNav?: boolean; image?: string } & {
  items?: ConfigMenuDropDownItemsType[]
}

const addMenuItemSupported = (item, chainId) => {
  if (!chainId || !item.supportChainIds) {
    return item
  }
  if (item.supportChainIds?.includes(chainId)) {
    return item
  }
  return {
    ...item,
    disabled: true,
  }
}

const config: (
  t: ContextApi['t'],
  isDark: boolean,
  languageCode?: string,
  chainId?: number,
) => ConfigMenuItemsType[] = (t, isDark, languageCode, chainId) =>
  [
    {
      label: t('Trade'),
      icon: SwapIcon,
      fillIcon: SwapFillIcon,
      href: '/swap',
      supportChainIds: SUPPORT_SWAP,
      showItemsOnMobile: false,
      items: [
        {
          label: t('Swap'),
          href: '/swap',
        },
        {
          label: t('Liquidity'),
          href: '/liquidity',
        },
        /*{
          label: t('Buy Crypto'),
          href: '/buy-crypto',
          supportChainIds: SUPPORT_BUY_CRYPTO,
        }, */
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
    /*{
      label: t('Earn'),
      href: '/farms',
      icon: EarnIcon,
      fillIcon: EarnFillIcon,
      image: '/images/decorations/pe2.png',
      showItemsOnMobile: false,
      supportChainIds: [...SUPPORT_FARMS, ...SUPPORT_STAKING],
      items: [
        {
          label: t('Liquidity Farms'),
          href: '/farms',
          supportChainIds: SUPPORT_FARMS,
        },
        {
          label: t('Staking'),
          href: '/pools',
          supportChainIds: SUPPORT_STAKING,
        },
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
    {
      label: t('Bridge'),
      href: '/bridge',
      hideSubNav: true,
      icon: BridgeIcon,
      supportChainIds: SUPPORT_BRIDGE,
      showItemsOnMobile: false,
      items: [],
    },
    {
      label: t('Launchpad'),
      href: '/launchpad',
      icon: RocketIcon,
      hideSubNav: true,
      showItemsOnMobile: false,
      supportChainIds: SUPPORT_LAUNCHPAD,
      items: [],
    },
    {
      label: t('Info'),
      href: '/info',
      icon: InfoIcon,
      hideSubNav: true,
      showItemsOnMobile: false,
      supportChainIds: SUPPORT_INFO,
      items: [],
    },
    {
      label: t('More'),
      icon: MoreHorizontalIcon,
      showItemsOnMobile: true,
      hideSubNav: true,
      // supportChainIds: [...SUPPORT_INFO, ...SUPPORT_LOCKS, ...SUPPORT_KYC],
      items: [
        {
          label: t('Locks'),
          href: '/locks',
          supportChainIds: SUPPORT_LOCKS,
        },
        {
          label: t('KYC'),
          href: '/kyc',
          supportChainIds: SUPPORT_KYC,
          items: [
            {
              label: t('KYC'),
              href: '/kyc',
            },
            {
              label: t('KYC Checker'),
              href: '/kyc-checker',
            },
            {
              label: t('KYC Delegator'),
              href: '/kyc-delegator',
              supportChainIds: SUPPORT_KYC_DELEGATION,
            },
          ],
        },
        {
          label: t('Launchpad'),
          href: '/launchpad',
          supportChainIds: SUPPORT_LAUNCHPAD,
        },
        {
          label: t('Token Deployer'),
          href: '/create-token',
          supportChainIds: SUPPORT_TOKEN_DEPLOYER,
        },
        {
          label: t('Wiki'),
          href: languageCode === 'zh-cn' ? 'https://wiki.icecreamswap.com/v/zh' : 'https://wiki.icecreamswap.com',
          type: DropdownMenuItemType.EXTERNAL_LINK,
        },
        // {
        //   label: t('Create Token'),
        //   href: '/create-token',
        //   supportChainIds: SUPPORT_LOCKS,
        // },
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
    /*
    {
      label: '',
      href: '/info',
      icon: MoreIcon,
      hideSubNav: true,
      items: [
        {
          label: t('Info'),
          href: '/info/v3',
        },
        {
          label: t('IFO'),
          href: '/ifo',
          supportChainIds: SUPPORT_ONLY_BSC,
          image: '/images/ifos/ifo-bunny.png',
        },
        {
          label: t('Affiliate Program'),
          href: '/affiliates-program',
        },
        {
          label: t('Voting'),
          href: '/voting',
          supportChainIds: SUPPORT_ONLY_BSC,
          image: '/images/voting/voting-bunny.png',
        },
        {
          type: DropdownMenuItemType.DIVIDER,
        },
        {
          label: t('Leaderboard'),
          href: '/teams',
          supportChainIds: SUPPORT_ONLY_BSC,
          image: '/images/decorations/leaderboard.png',
        },
        {
          type: DropdownMenuItemType.DIVIDER,
        },
        {
          label: t('Blog'),
          href: 'https://blog.pancakeswap.finance',
          type: DropdownMenuItemType.EXTERNAL_LINK,
        },
        {
          label: t('Docs'),
          href: 'https://docs.icecreamswap.com',
          type: DropdownMenuItemType.EXTERNAL_LINK,
        },
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
       */
  ].map((item) => addMenuItemSupported(item, chainId))

export default config
