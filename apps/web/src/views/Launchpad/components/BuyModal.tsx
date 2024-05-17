import { Flex, Modal, useModalContext, Text, Button, Spinner } from '@pancakeswap/uikit'
import { formatAmount } from '../../Bridge/formatter'
import { useState } from 'react'
import { useToken } from 'hooks/Tokens'
import { useAccount } from 'wagmi'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { CampaignData, useCampaign, useGivenAmount } from '../hooks'
import CurrencyInputPanel from 'components/CurrencyInputPanel'
import { useTokenBalances } from 'state/wallet/hooks'
import { CurrencyAmount } from '@pancakeswap/sdk'
import { useTransactionAdder } from 'state/transactions/hooks'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import {formatUnits, parseEther, parseUnits} from "viem";

interface DepositModalProps {
  campaign: CampaignData
}

type Steps = 'preview' | 'transfer' | 'completed'

const BuyModal: React.FC<DepositModalProps> = (props) => {
  const { campaign } = props
  const [step, setStep] = useState<Steps>('preview')
  const { onDismiss } = useModalContext()
  const token = useToken(campaign?.tokenAddress)
  const raisedToken = useToken(campaign?.raisedToken)
  const { address, status } = useAccount()
  const campaignInstance = useCampaign(campaign?.address as `0x${string}`)
  const balances = useTokenBalances(address, raisedToken && [raisedToken])
  const balance = (balances ?? {})[raisedToken?.address ?? '']
  const contributed = useGivenAmount(campaign?.address as `0x${string}`, address)
  const addTransaction = useTransactionAdder()

  const [amount, setAmount] = useState('')

  const amountBigint =
    amount &&
    Number(amount) &&
    CurrencyAmount.fromRawAmount(balance?.currency, parseUnits(amount, token?.decimals || 18) as any)

  const handleDeposit = async () => {
    // @ts-expect-error ABI not up to date
    const tx = await campaignInstance?.buyTokens(parseEther(amount))
    setStep('transfer')
    addTransaction(tx, {
      summary: `Contribute ${amount} to ${token?.symbol}`,
    })
    await tx?.wait(1)
    setStep('completed')
  }

  const handleDismiss = () => {
    onDismiss()
  }

  const allowed = contributed.data ? campaign.max_allowed - contributed.data : campaign.max_allowed
  const canContribute = !amount || parseEther(amount) <= allowed

  const {approvalState, approveCallback: approve} = useApproveCallback(
    CurrencyAmount.fromRawAmount(
      raisedToken,
      parseUnits(Number(amount) ? amount : '0', raisedToken?.decimals || 18) as any,
    ),
    campaign.address,
    {addToTransaction: true},
  )

  const preview = (
    <>
      <Flex flexDirection="column">
        <Text>How much do you want to buy</Text>
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
          currency={raisedToken}
          id="campaign-currency-input"
          hideManage
          showCommonBases={false}
          showNative={false}
        />
      </Flex>
      <Flex flexDirection="column">
        <Text>You will recieve</Text>
        <Text>
          {formatAmount(amountBigint ? formatUnits(parseEther(amount) * campaign.rate, 2 * 18) : '0')}{' '}
          {token?.symbol}
        </Text>
      </Flex>
      {!canContribute ? (
        <Text style={{ color: 'var(--colors-failure)' }}>
          You can't buy more than {formatUnits(campaign.max_allowed * campaign.rate, 2 * 18)}{' '}
          {token?.symbol} per account!
        </Text>
      ) : undefined}
      {status === 'connected' ? (
        approvalState !== ApprovalState.APPROVED ? (
          <Button style={{ flexGrow: 1 }} onClick={approve} disabled={!canContribute}>
            Approve
          </Button>
        ) : (
          <Button style={{ flexGrow: 1 }} onClick={handleDeposit} disabled={!canContribute}>
            Confirm
          </Button>
        )
      ) : (
        <ConnectWalletButton />
      )}
    </>
  )

  const transferCompleted = (
    <>
      <Text>Contribution successful</Text>
      <Button onClick={handleDismiss} variant="secondary">
        Close
      </Button>
    </>
  )

  const waitingForTransfer = (
    <>
      <Flex justifyContent="center">
        <Spinner />
      </Flex>
      <Text>Processing Transaction</Text>
    </>
  )

  const steps = {
    preview,
    transfer: waitingForTransfer,
    completed: transferCompleted,
  }

  return (
    <Modal title="Buy Token" onDismiss={handleDismiss} minWidth="min(100vw, 426px)">
      <Flex flexDirection="column" alignItems="stretch" style={{ gap: '1em' }}>
        {steps[step]}
      </Flex>
    </Modal>
  )
}

export default BuyModal
