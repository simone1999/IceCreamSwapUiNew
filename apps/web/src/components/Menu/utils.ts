import orderBy from 'lodash/orderBy'
import { ConfigMenuItemsType } from './config/config'

export const getActiveMenuItem = ({ pathname, menuConfig }: { pathname: string; menuConfig: ConfigMenuItemsType[] }) =>
  menuConfig.find((menuItem) => pathname.startsWith(menuItem.href) || getActiveSubMenuItem({ menuItem, pathname }))

export const getActiveSubMenuItem = ({ pathname, menuItem }: { pathname: string; menuItem?: ConfigMenuItemsType }) => {
  const subItems = menuItem?.items?.reduce((acc, item) => {
    if (item.items) {
      return [...acc, ...item.items]
    }
    return [...acc, item]
  }, [])
  const allItems = [...(menuItem?.items ?? []), ...(subItems ?? [])]
  const activeSubMenuItems = allItems.filter((subMenuItem) => pathname.startsWith(subMenuItem.href)) ?? []

  const exactMatch = activeSubMenuItems.find((subMenuItem) => subMenuItem.href === pathname)
  if (exactMatch) {
    return exactMatch
  }

  // Pathname doesn't include any submenu item href - return undefined
  if (!activeSubMenuItems || activeSubMenuItems.length === 0) {
    return undefined
  }

  // Pathname includes one sub menu item href - return it
  if (activeSubMenuItems.length === 1) {
    return activeSubMenuItems[0]
  }

  // Pathname includes multiple sub menu item hrefs - find the most specific match
  const mostSpecificMatch = orderBy(activeSubMenuItems, (subMenuItem) => subMenuItem?.href?.length, 'desc')[0]

  return mostSpecificMatch
}
