import { Box, Flex } from '@pancakeswap/uikit'
import styled from 'styled-components'

export const StyledBridgeContainer = styled(Flex)`
  flex-shrink: 0;
  height: fit-content;
  padding: 0 24px;

  ${({ theme }) => theme.mediaQueries.lg} {
    padding: 0 40px;
  }
`

export const StyledInputCurrencyWrapper = styled(Box)`
  width: min(428px, calc(100vw - 48px));
`

export const StyledBridgeBody = styled(Flex)`
  flex-direction: column;
  width: 100%;
  padding: 1em;
  gap: 1em;
`
