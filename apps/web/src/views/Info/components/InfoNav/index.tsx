import { Box, ButtonMenu, ButtonMenuItem, Flex, NextLinkFromReactRouter } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Search from 'views/Info/components/InfoSearch'
import { useMultiChainPath } from 'state/info/hooks'

const NavWrapper = styled(Flex)`
  background: ${({ theme }) => theme.colors.gradientCardHeader};
  justify-content: space-between;
  padding: 20px 16px;
  flex-direction: column;
  gap: 8px;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 20px 40px;
    flex-direction: row;
  }
`

const InfoNav: React.FC<{ isStableSwap: boolean }> = ({ isStableSwap }) => {
  const { t } = useTranslation()
  const router = useRouter()
  const chainPath = useMultiChainPath()

  const isPools = router.pathname === `/info${chainPath && `/[chainName]`}/pools`
  const isTokens = router.pathname === `/info${chainPath && `/[chainName]`}/tokens`
  const stableSwapQuery = isStableSwap ? '?type=stableSwap' : ''
  let activeIndex = 0
  if (isPools) {
    activeIndex = 1
  }
  if (isTokens) {
    activeIndex = 2
  }
  return (
    <NavWrapper>
      <Flex>
        <Box>
          <ButtonMenu activeIndex={activeIndex} scale="sm" variant="subtle">
            <ButtonMenuItem as={NextLinkFromReactRouter} to={`/info${chainPath}${stableSwapQuery}`}>
              {t('Overview')}
            </ButtonMenuItem>
            <ButtonMenuItem as={NextLinkFromReactRouter} to={`/info${chainPath}/pools${stableSwapQuery}`}>
              {t('Pools')}
            </ButtonMenuItem>
            <ButtonMenuItem as={NextLinkFromReactRouter} to={`/info${chainPath}/tokens${stableSwapQuery}`}>
              {t('Tokens')}
            </ButtonMenuItem>
          </ButtonMenu>
        </Box>
      </Flex>
      <Box width={['100%', '100%', '250px']}>
        <Search />
      </Box>
    </NavWrapper>
  )
}

export default InfoNav
