import { Flex, Heading, Text, Link, useMatchBreakpoints, Input, Checkbox, Button, useModal } from '@pancakeswap/uikit'
import { useLocksByToken } from './hooks'
import { useActiveChain } from 'hooks/useActiveChain'
import { useToken } from 'hooks/Tokens'
import { useMemo, useCallback, useState } from 'react'
import { BigNumber, utils } from 'ethers'
import { formatAmount } from 'views/Bridge/formatter'
import CurrencyInputPanel from 'components/CurrencyInputPanel'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { useWeb3React } from '@pancakeswap/wagmi'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from './components/DatePicker'
import formatDuration from 'date-fns/formatDuration'
import { intervalToDuration } from 'date-fns'
import CreateModal from './components/CreateModal'
import { CurrencyAmount } from '@pancakeswap/sdk'
import FormError from 'views/Bridge/components/FormError'
import AppWrapper from 'components/AppWrapper'

const getNow = () => {
  const now = new Date()
  now.setSeconds(0)
  now.setMilliseconds(0)
  return now
}

export const CreateLock: React.FC<{ tokenAddress?: string }> = ({ tokenAddress }) => {
  const { data: locks } = useLocksByToken(tokenAddress)
  const { account } = useWeb3React()

  const chain = useActiveChain()
  const token = useToken(tokenAddress)
  const getAddressUrl = (add: string) => `${chain?.blockExplorers.default.url}/address/${add}`

  const [amount, setAmount] = useState('')
  const [vesting, setVesting] = useState(false)
  const minDate = useMemo(() => getNow(), [])
  const minEnding = useMemo(() => new Date(minDate.valueOf() + 1000 * 60 * 60 * 24), [minDate])
  const [startingDate, setStartingDate] = useState<Date>(minDate)
  const [endingDate, setEndingDate] = useState<Date>(minEnding)

  const balance = useCurrencyBalance(account ?? undefined, token ?? undefined)

  const [error, setError] = useState<string | null>(null)
  const validate = () => {
    if (!amount) {
      setError('Please enter an amount')
      return false
    }
    const balanceString = balance?.toExact() || '0'
    if (
      BigNumber.from(utils.parseUnits(amount, token?.decimals || 18)).gt(
        BigNumber.from(utils.parseUnits(balanceString, token?.decimals || 18)),
      )
    ) {
      setError('Insufficient balance')
      return false
    }
    if (vesting && startingDate > endingDate) {
      setError('Starting date must be before ending date')
      return false
    }
    setError(null)
    return true
  }
  const [onPresentCreateModal, , isOpen] = useModal(
    <CreateModal
      amount={
        amount &&
        Number(amount) &&
        CurrencyAmount.fromRawAmount(balance?.currency, utils.parseUnits(amount, token?.decimals || 18) as any)
      }
      duration={vesting ? Math.floor((endingDate.valueOf() - startingDate.valueOf()) / 1000) : 0}
      startingDate={startingDate}
    />,
    true,
    true,
    'lockCreateModal',
  )

  return (
    <AppWrapper hasBackButton title={`Locks of ${token?.name}`} subtitle="Lock your tokens for a fixed period">
      <Flex flexDirection="column" gap="0.75em">
        <Heading as="h2" marginY="3">
          Creating Lock for {token?.name}
        </Heading>
        <Text>Token Address:</Text>
        <Text color="textSubtle" fontSize="14px" textAlign="start" maxWidth="calc(100vw - 48px)">
          <Link
            external
            href={getAddressUrl(tokenAddress)}
            display="inline"
            target="_blank"
            style={{ wordWrap: 'break-word' }}
          >
            {tokenAddress}
          </Link>
        </Text>

        <CurrencyInputPanel
          label="Amount"
          value={amount.toString()}
          showMaxButton
          showQuickInputButton
          disableCurrencySelect
          onUserInput={(value) => {
            setAmount(value)
          }}
          onPercentInput={(percent) => {
            setAmount((+balance?.toExact() * 0.01 * percent).toString())
          }}
          onMax={() => {
            setAmount(balance?.toExact() || '0')
          }}
          currency={token}
          id="bridge-currency-input"
          hideManage
          showCommonBases={false}
          showNative={false}
        />
        <Flex alignItems="center">
          <Checkbox
            name="own-address"
            type="checkbox"
            checked={vesting}
            onChange={() => setVesting(!vesting)}
            scale="sm"
          />
          <Text ml="10px" style={{ userSelect: 'none' }} onClick={() => setVesting(!vesting)}>
            Use Vesting
          </Text>
        </Flex>
        <Text>{vesting ? 'Starting Date:' : 'Unlock Date:'}</Text>
        <DatePicker value={startingDate} onChange={setStartingDate} min={minDate} />
        {vesting && (
          <>
            <Text>Ending Date:</Text>
            <DatePicker value={endingDate} onChange={setEndingDate} min={startingDate} />
            <Text>
              Vesting Duration:{' '}
              {formatDuration(
                intervalToDuration({
                  start: startingDate,
                  end: endingDate,
                }),
              ) || '0'}
            </Text>
          </>
        )}
        {error && <FormError>{error}</FormError>}
        <Button
          onClick={() => {
            if (validate()) onPresentCreateModal()
          }}
        >
          Create
        </Button>
      </Flex>
    </AppWrapper>
  )
}
