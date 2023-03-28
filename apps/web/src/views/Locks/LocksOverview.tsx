import { Button, Flex, Heading, Input, Table, Td, Text, useMatchBreakpoints } from '@pancakeswap/uikit'
import { useState } from 'react'
import { useLocksByUser } from './hooks'
import LockRow from './components/LockRow'
import { useRouter } from 'next/router'
import TokenInput from 'components/TokenInput'
import { Currency } from '@pancakeswap/sdk'
import AppWrapper from 'components/AppWrapper'

export const LocksOverview: React.FC = () => {
  const [token, setToken] = useState<Currency>()
  const { isMobile } = useMatchBreakpoints()
  const { data: locks } = useLocksByUser()
  const router = useRouter()

  const handleSearch = () => {
    if (token && token.isToken) router.push(`/locks/${token.address}`)
  }

  return (
    <AppWrapper title="Locks" subtitle="Lock your tokens for a fixed period">
      <Flex flexDirection="column" gap="0.75em">
        <Text>Token Address</Text>
        <Text color="textSubtle" fontSize="14px" textAlign="start">
          View and Create Locks
        </Text>
        <Flex alignItems="start" gap="1em" flexDirection={isMobile ? 'column' : 'row'} justifyContent="stretch">
          {/* <AddressInput value={tokenAddress} onChange={setTokenAddress} /> */}
          <Input as="div" padding="0px" display="flex" alignItems="center">
            <TokenInput currency={token} onCurrencySelect={setToken} showNative={false} showCommonBases={false} />
          </Input>
          <Button onClick={handleSearch} height="40px" width={isMobile && '100%'}>
            Go
          </Button>
        </Flex>
        {locks?.length ? (
          <>
            <Heading as="h2" marginY="3">
              My Locks
            </Heading>
            <Table>
              {!isMobile && (
                <thead>
                  <tr>
                    <Td>Token</Td>
                    <Td>Amount</Td>
                    <Td>Claimable</Td>
                    <Td />
                  </tr>
                </thead>
              )}
              <tbody>{locks && locks.map((lock) => <LockRow key={lock.lockId.toString()} lock={lock} />)}</tbody>
            </Table>
          </>
        ) : undefined}
      </Flex>
    </AppWrapper>
  )
}
