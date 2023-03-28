import styled from 'styled-components'

export default styled.div<{ margin?: string }>`
  background-color: ${({ theme }) => theme.colors.textSubtle};
  height: 1px;
  margin: ${(props) => props.margin ?? '0 auto 32px'};
  width: 100%;
`
