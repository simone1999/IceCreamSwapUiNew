import { Text } from '@pancakeswap/uikit'
import Warning from '@pancakeswap/uikit/src/components/Svg/Icons/Warning'
import styled from 'styled-components'

export const StyledMessage = styled(Text)`
  display: flex;
  padding: 0.5em;
  gap: 1em;
  color: ${({ theme }) => theme.colors.failure};
`

export const StyledIcon = styled(Warning)`
  fill: ${({ theme }) => theme.colors.failure};
`

const FormError = ({ children }) => {
  return (
    <StyledMessage>
      <StyledIcon />
      {children}
    </StyledMessage>
  )
}

export default FormError
