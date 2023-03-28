import { Flex, Td, Text, Button, useMatchBreakpoints } from '@pancakeswap/uikit'
import { useToken } from 'hooks/Tokens'
import styled, { useTheme } from 'styled-components'
import { renderDate } from '../../../utils/renderDate'
import TokenName from './TokenName'
import { Lock } from '../hooks'
import { utils, BigNumber } from 'ethers'
import { useCallback } from 'react'
import { formatAmount } from 'views/Bridge/formatter'
import Link from 'next/link'

const RowStyled = styled.tr`
  &:hover {
    background: ${({ theme }) => theme.colors.backgroundDisabled};
  }

  &:last-of-type {
    border-radius: 0 0 16px 16px;
  }
`

interface LockRowProps {
  lock: Lock
}

const LockRow: React.FC<LockRowProps> = ({ lock }) => {
  const claimed = lock.amount.eq(lock.amountUnlocked)
  const token = useToken(lock.token)
  const { isMobile } = useMatchBreakpoints()
  const theme = useTheme()
  const format = useCallback(
    (value: BigNumber) => {
      if (!value) return ''
      const decimals = token?.decimals ?? 18
      return formatAmount(Number(utils.formatUnits(value, decimals)))
    },
    [token],
  )

  const percentClaimed = (lock.amountUnlocked.mul(10000).div(lock.amount).toNumber() / 100).toString()

  if (isMobile) {
    return (
      <>
        <RowStyled>
          <Td style={{ borderBottom: '0px', paddingBottom: '0px' }}>
            <TokenName withSymbol address={lock.token} />
          </Td>
          <Td style={{ borderBottom: '0px', paddingBottom: '0px' }}>
            <Flex flexDirection="column">
              <span>{`${format(lock.amount)} ${token?.symbol}`}</span>
              <Text fontSize="0.75em" color={theme.colors.text99}>
                {percentClaimed}% Claimed
              </Text>
            </Flex>
          </Td>
        </RowStyled>
        <RowStyled>
          <Td color={lock.amountToUnlock?.gt(0) && theme.colors.success}>
            {claimed ? (
              'Fully Claimed'
            ) : lock.amountToUnlock?.gt(0) ? (
              format(lock.amountToUnlock)
            ) : (
              <Flex flexDirection="column" gap="0.5em">
                <span>Starting at</span>
                <span>{renderDate(lock.start_time.mul(1000).toNumber())}</span>
              </Flex>
            )}
          </Td>
          <Td>
            <Link href={`/locks/lock/${lock.lockId}`} passHref legacyBehavior>
              <Button as="a" variant="subtle" scale="sm" style={{ fontSize: '0.75rem', textAlign: 'center' }}>
                View Details
              </Button>
            </Link>
          </Td>
        </RowStyled>
      </>
    )
  }

  return (
    <RowStyled>
      <Td>
        <TokenName withSymbol address={lock.token} />
      </Td>
      <Td>
        <Flex flexDirection="column">
          <span>{`${format(lock.amount)} ${token?.symbol}`}</span>
          <Text fontSize="0.75em" color={theme.colors.text99}>
            {percentClaimed}% Claimed
          </Text>
        </Flex>
      </Td>
      {!isMobile && (
        <Td color={lock.amountToUnlock?.gt(0) && theme.colors.success}>
          {claimed ? (
            'Fully Claimed'
          ) : lock.amountToUnlock?.gt(0) ? (
            format(lock.amountToUnlock)
          ) : (
            <Flex flexDirection="column" gap="0.5em">
              <span>Starting at</span>
              <span>{renderDate(lock.start_time.mul(1000).toNumber())}</span>
            </Flex>
          )}
        </Td>
      )}
      <Td>
        <Link href={`/locks/lock/${lock.lockId}`} passHref legacyBehavior>
          <Button as="a" variant="subtle" scale="sm" style={{ fontSize: '0.75rem', textAlign: 'center' }}>
            {isMobile ? 'View' : 'View Details'}
          </Button>
        </Link>
      </Td>
    </RowStyled>
  )
}

export default LockRow
