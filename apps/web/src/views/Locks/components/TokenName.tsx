import { Flex, Text } from '@pancakeswap/uikit'
import { useToken } from 'hooks/Tokens'
import { useTheme } from 'styled-components'

const TokenName: React.FC<{ address: string; withSymbol?: boolean }> = ({ address, withSymbol }) => {
  const token = useToken(address)
  const theme = useTheme()

  if (withSymbol && token) {
    return (
      <Flex flexDirection="column">
        <span>{token.name}</span>
        <Text fontSize="0.75em" color={theme.colors.text99}>
          {token.symbol}
        </Text>
      </Flex>
    )
  }

  return <>{token?.name ?? '???'}</>
}

export default TokenName
