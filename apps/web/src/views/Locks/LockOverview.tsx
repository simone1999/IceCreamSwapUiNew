import { Button, Flex, Heading, Link, Table, Td, Text, useMatchBreakpoints } from '@pancakeswap/uikit'
import { PropsWithChildren, useMemo, useCallback } from 'react'
import { useLockingData, useLocks } from './hooks'
import { FetchStatus } from 'config/constants/types'
import { BigNumber, utils } from 'ethers'
import styled from 'styled-components'
import TokenName from './components/TokenName'
import { useActiveChain } from 'hooks/useActiveChain'
import { useToken } from 'hooks/Tokens'
import { formatAmount } from 'views/Bridge/formatter'
import { renderDate } from '../../utils/renderDate'
import { useAccount } from 'wagmi'
import AppWrapper from 'components/AppWrapper'

const RowStyled = styled.tr`
  &:hover {
    background: ${({ theme }) => theme.colors.backgroundDisabled};
  }

  &:last-of-type {
    border-radius: 0 0 16px 16px;
  }

  max-width: calc(100vw - 48px);

  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: table-row;
  }
`

const Td1: React.FC<PropsWithChildren> = ({ children }) => {
  const { isMobile } = useMatchBreakpoints()
  return (
    <Td style={{ paddingBottom: isMobile ? '0px' : undefined, borderBottom: isMobile ? '0px' : undefined }}>
      {children}
    </Td>
  )
}

const Td2: React.FC<PropsWithChildren> = ({ children }) => {
  const { isMobile } = useMatchBreakpoints()
  return <Td style={{ paddingTop: isMobile ? '12px' : undefined, wordWrap: 'break-word' }}>{children}</Td>
}

export const LockOverview: React.FC<{ lockId: number }> = ({ lockId }) => {
  const { isMobile } = useMatchBreakpoints()
  const { address } = useAccount()
  const lockIdBigNumber = useMemo(() => BigNumber.from(lockId), [lockId])
  const { data, status } = useLockingData([lockIdBigNumber])
  const locks = useLocks()
  const lock = data?.[0]
  const chain = useActiveChain()
  const getAddressUrl = (add: string) => `${chain?.blockExplorers.default.url}/address/${add}`

  const token = useToken(lock?.token)
  const format = useCallback(
    (value: BigNumber) => {
      if (!value) return ''
      const decimals = token?.decimals ?? 18
      return formatAmount(Number(utils.formatUnits(value, decimals)))
    },
    [token],
  )
  const claimed = lock?.amount.eq(lock.amountUnlocked)

  const claim = useCallback(() => {
    if (!lock) return
    locks.unlockAvailable(lock.lockId)
  }, [lock, locks])

  return (
    <AppWrapper hasBackButton title={`Viewing Lock #${lockId}`} subtitle="Lock your tokens for a fixed period">
      <Flex flexDirection="column" gap="0.75em">
        {status === FetchStatus.Failed ? (
          <Heading as="h2" marginY="3">
            Lock with id {lockId} not found
          </Heading>
        ) : (
          <>
            <Heading as="h2" marginY="3">
              Lock #{lockId}
            </Heading>
            {lock && (
              <>
                <Table>
                  <tbody>
                    <RowStyled>
                      <Td1>Token{isMobile && ':'}</Td1>
                      <Td2>
                        <TokenName withSymbol address={lock.token} />
                      </Td2>
                    </RowStyled>
                    <RowStyled>
                      <Td1>Token Address{isMobile && ':'}</Td1>
                      <Td2>
                        <Link external href={getAddressUrl(lock.token)} display="inline" target="_blank">
                          {lock.token}
                        </Link>
                      </Td2>
                    </RowStyled>
                    <RowStyled>
                      <Td1>Lock Owner</Td1>
                      <Td2>
                        <Link external href={getAddressUrl(lock.owner)} display="inline" target="_blank">
                          {lock.owner}
                        </Link>
                      </Td2>
                    </RowStyled>
                    <RowStyled>
                      <Td1>Amount</Td1>
                      <Td2>{format(lock.amount)}</Td2>
                    </RowStyled>
                    <RowStyled>
                      <Td1>Amount Unlocked</Td1>
                      <Td2>{format(lock.amountUnlocked)}</Td2>
                    </RowStyled>
                    <RowStyled>
                      <Td1>Amount Claimable</Td1>
                      <Td2>{format(lock.amountToUnlock)}</Td2>
                    </RowStyled>
                    {lock.duration.gt(0) ? (
                      <>
                        <RowStyled>
                          <Td1>Vesting start</Td1>
                          <Td2>{renderDate(lock.start_time.mul(1000).toNumber())}</Td2>
                        </RowStyled>
                        <RowStyled>
                          <Td1>Vesting end</Td1>
                          <Td2>{renderDate(lock.start_time.add(lock.duration).mul(1000).toNumber())}</Td2>
                        </RowStyled>
                      </>
                    ) : (
                      <RowStyled>
                        <Td1>Claimable at</Td1>
                        <Td2>{renderDate(lock.start_time.mul(1000).toNumber())}</Td2>
                      </RowStyled>
                    )}
                  </tbody>
                </Table>
                {lock.owner === address && (
                  <>
                    <Heading marginTop="16px" as="h2">
                      Claim Lock
                    </Heading>
                    <Text>
                      {claimed ? (
                        'Fully Claimed'
                      ) : lock.start_time.mul(1000).toNumber() < Date.now() ? (
                        `${format(lock.amountToUnlock)} claimable`
                      ) : (
                        <Flex flexDirection="column" gap="0.5em">
                          <span>Starting at</span>
                          <span>{renderDate(lock.start_time.mul(1000).toNumber())}</span>
                        </Flex>
                      )}
                    </Text>
                    {lock.start_time.mul(1000).toNumber() < Date.now() && !claimed && (
                      <Button
                        onClick={() => {
                          claim()
                        }}
                      >
                        Claim
                      </Button>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
      </Flex>
    </AppWrapper>
  )
}
