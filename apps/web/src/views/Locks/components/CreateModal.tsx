import { Currency, CurrencyAmount } from '@pancakeswap/sdk'
import { Flex, Modal, useModalContext, Text, Button, Column } from '@pancakeswap/uikit'
import { CurrencyLogo } from 'components/Logo'
import Divider from 'views/Farms/components/Divider'
import { formatAmount } from '../../Bridge/formatter'
import ProgressSteps from 'views/Swap/components/ProgressSteps'
import { useMemo, useState } from 'react'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import { useLocks } from '../hooks'
import { useRouter } from 'next/router'
import { renderDate } from '../../../utils/renderDate'

interface DepositModalProps {
  amount: CurrencyAmount<Currency>
  startingDate: Date
  duration: number
}

const CreateModal: React.FC<DepositModalProps> = (props) => {
  const { amount, startingDate, duration } = props
  const [finished, setFinished] = useState(false)
  const locks = useLocks()
  const { onDismiss } = useModalContext()
  const [approvalState, approve] = useApproveCallback(amount, locks.address, true)
  const showApprovalFlow = useMemo(() => {
    return approvalState !== ApprovalState.APPROVED
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [approvalState !== ApprovalState.UNKNOWN])

  const router = useRouter()
  const handleDeposit = () => {
    if (!amount.currency.isToken) return
    locks
      .lock(amount.currency.address, amount.numerator.toString(), startingDate.getTime() / 1000, duration)
      .then(() => {
        setFinished(true)
        if (!amount.currency.isToken) return
        router.push(`/locks/${amount.currency.address}`)
      })
  }

  const handleApprove = () => {
    approve()
  }

  const handleDismiss = () => {
    onDismiss()
  }

  const preview = (
    <>
      <Flex alignItems="center" justifyContent="space-between">
        <Text fontSize="1em" display="flex" style={{ alignItems: 'center', gap: '0.5em' }}>
          <CurrencyLogo currency={amount.currency} />
          <span>Amount</span>
        </Text>
        <Text fontSize="1em">
          {formatAmount(amount.toExact())} {amount?.currency?.symbol}
        </Text>
      </Flex>
      <Flex alignItems="center" justifyContent="space-between">
        <Text fontSize="1em" display="flex" style={{ alignItems: 'center', gap: '0.5em' }}>
          Claimable starting at
        </Text>
        <Text fontSize="1em">{renderDate(startingDate.getTime())}</Text>
      </Flex>
      {duration ? (
        <Flex alignItems="center" justifyContent="space-between">
          <Text fontSize="1em" display="flex" style={{ alignItems: 'center', gap: '0.5em' }}>
            Claimable ending at
          </Text>
          <Text fontSize="1em">{renderDate(startingDate.getTime() + duration * 1000)}</Text>
        </Flex>
      ) : null}
      {showApprovalFlow ? (
        <>
          <Flex style={{ gap: '0.5em' }} alignItems="stretch">
            <Button
              style={{ flexGrow: 1 }}
              onClick={handleApprove}
              disabled={approvalState !== ApprovalState.NOT_APPROVED}
              isLoading={approvalState === ApprovalState.PENDING}
            >
              Approve
            </Button>
            <Button style={{ flexGrow: 1 }} onClick={handleDeposit} disabled={approvalState !== ApprovalState.APPROVED}>
              Confirm
            </Button>
          </Flex>
          <Column style={{ marginTop: '1rem' }}>
            <ProgressSteps steps={[approvalState === ApprovalState.APPROVED]} />
          </Column>
        </>
      ) : (
        <Button style={{ flexGrow: 1 }} onClick={handleDeposit}>
          Confirm
        </Button>
      )}
    </>
  )

  const transferCompleted = (
    <>
      <Text>The Lock has been created!</Text>
      <Button onClick={handleDismiss}>Close</Button>
    </>
  )

  const content = finished ? transferCompleted : preview

  return (
    <Modal title="Creating Lock" onDismiss={handleDismiss} minWidth="min(100vw, 426px)">
      <Flex flexDirection="column" alignItems="stretch" style={{ gap: '1em' }}>
        {content}
      </Flex>
    </Modal>
  )
}

export default CreateModal
