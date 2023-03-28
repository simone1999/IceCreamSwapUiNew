import { Flex, Modal, useModalContext, Text, Button, Spinner } from '@pancakeswap/uikit'
import { formatAmount } from '../../Bridge/formatter'
import { useState } from 'react'
import { useToken } from 'hooks/Tokens'
import { useAccount } from 'wagmi'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { utils } from 'ethers'
import { CampaignData, useCampaign, useGivenAmount } from '../hooks'
import CurrencyInputPanel from 'components/CurrencyInputPanel'
import useNativeCurrency from 'hooks/useNativeCurrency'
import { useNativeBalances } from 'state/wallet/hooks'
import { CurrencyAmount } from '@pancakeswap/sdk'
import { useTransactionAdder } from 'state/transactions/hooks'

interface DepositModalProps {
  campaign: CampaignData
}

type Steps = 'preview' | 'transfer' | 'completed'

const BuyModal: React.FC<DepositModalProps> = (props) => {
  const { campaign } = props
  const [step, setStep] = useState<Steps>('preview')
  const { onDismiss } = useModalContext()
  const token = useToken(campaign?.tokenAddress)
  const { address, status } = useAccount()
  const campaignInstance = useCampaign(campaign?.address)
  const nativeCurrency = useNativeCurrency()
  const balances = useNativeBalances([address])
  const balance = (balances ?? {})[address]
  const contributed = useGivenAmount(campaign?.address, address)
  const addTransaction = useTransactionAdder()

  const [amount, setAmount] = useState('')

  const amountBigint =
    amount &&
    Number(amount) &&
    CurrencyAmount.fromRawAmount(balance?.currency, utils.parseUnits(amount, token?.decimals || 18) as any)

  const handleDeposit = async () => {
    // const initialSupply = utils.parseUnits(String(formValues?.initialSupply || '0'), 18)
    // const maxSupply = utils.parseUnits(String(formValues?.maxSupply || '0'), 18)
    const tx = await campaignInstance?.buyTokens({
      value: utils.parseEther(amount),
    })
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

  const allowed = contributed.data ? campaign.max_allowed.sub(contributed.data) : campaign.max_allowed
  const canContribute = !amount || utils.parseEther(amount).lte(allowed)

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
          currency={nativeCurrency}
          id="campaign-currency-input"
          hideManage
          showCommonBases={false}
          showNative={false}
        />
      </Flex>
      <Flex flexDirection="column">
        <Text>You will recieve</Text>
        <Text>
          {formatAmount(amountBigint ? utils.formatUnits(utils.parseEther(amount).mul(campaign.rate), 2 * 18) : '0')}{' '}
          {token?.symbol}
        </Text>
      </Flex>
      {!canContribute ? (
        <Text style={{ color: 'var(--colors-failure)' }}>
          You can&apos;t buy more than {utils.formatUnits(campaign.max_allowed.mul(campaign.rate), 2 * 18)}{' '}
          {token?.symbol} per account!
        </Text>
      ) : undefined}
      {status === 'connected' ? (
        <Button style={{ flexGrow: 1 }} onClick={handleDeposit} disabled={!canContribute}>
          Confirm
        </Button>
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
