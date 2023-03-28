import { Button, Flex, Heading, Table, Td, Text, Link, useMatchBreakpoints } from '@pancakeswap/uikit'
import { useLocksByToken } from './hooks'
import LockRow from './components/LockRow'
import { useActiveChain } from 'hooks/useActiveChain'
import { useToken } from 'hooks/Tokens'
import { useMemo, useCallback } from 'react'
import { BigNumber, utils } from 'ethers'
import { formatAmount } from 'views/Bridge/formatter'
import ConnectWalletButton from 'components/ConnectWalletButton'
import NextLink from 'next/link'
import { useAccount } from 'wagmi'
import AppWrapper from 'components/AppWrapper'

export const TokenLocksOverview: React.FC<{ tokenAddress?: string }> = ({ tokenAddress }) => {
  const { isMobile } = useMatchBreakpoints()
  const { data: locks } = useLocksByToken(tokenAddress)
  const { address } = useAccount()

  const chain = useActiveChain()
  const token = useToken(tokenAddress)
  const getAddressUrl = (add: string) => `${chain?.blockExplorers.default.url}/address/${add}`

  const tokensLocked = useMemo(() => {
    if (!locks) return BigNumber.from(0)
    return locks.reduce((acc, lock) => acc.add(lock.amount.sub(lock.amountUnlocked)), BigNumber.from(0))
  }, [locks])

  const format = useCallback(
    (value: BigNumber) => {
      if (!value) return ''
      const decimals = token?.decimals ?? 18
      return formatAmount(Number(utils.formatUnits(value, decimals)))
    },
    [token],
  )

  return (
    <AppWrapper
      backlink="/locks"
      hasBackButton
      title={`Locks of ${token?.name}`}
      subtitle="Lock your tokens for a fixed period"
    >
      <Flex flexDirection="column" gap="0.75em">
        <Text>Token Address:</Text>
        <Text color="textSubtle" fontSize="14px" textAlign="start">
          <Link
            external
            href={getAddressUrl(tokenAddress)}
            display="inline"
            target="_blank"
            style={{ wordBreak: 'break-word' }}
          >
            {tokenAddress}
          </Link>
        </Text>
        <Text>{`Currently Locked ${format(tokensLocked)} ${token?.symbol}`}</Text>
        {address ? (
          <NextLink href={`/locks/${tokenAddress}/create`} passHref legacyBehavior>
            <Button as="a">Create Lock</Button>
          </NextLink>
        ) : (
          <ConnectWalletButton />
        )}
        <Heading as="h2" marginY="3">
          Locks
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
      </Flex>
    </AppWrapper>
  )
}
