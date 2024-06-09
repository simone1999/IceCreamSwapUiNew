import { Flex, Modal, useModalContext, Text, Button, Spinner } from '@pancakeswap/uikit'
import { useState } from 'react'
import { FormValues } from '../create-schema'
import { useToken } from 'hooks/Tokens'
import { useAccount } from 'wagmi'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { useCampaignFactory } from '../hooks'
import { useRouter } from 'next/router'
import { trpc } from '@icecreamswap/backend'
import { ICE } from "@pancakeswap/tokens";
import useCatchTxError from "hooks/useCatchTxError";
import { TransactionReceipt } from "viem";

interface DepositModalProps {
  formValues: FormValues
}
type Steps = 'preview' | 'transfer' | 'completed'
const CreateModal: React.FC<DepositModalProps> = (props) => {
  const { formValues } = props
  const [step, setStep] = useState<Steps>('preview')
  const { onDismiss } = useModalContext()
  const { chainId } = useActiveChainId()
  const token = useToken(formValues?.tokenAddress)
  const raisedToken = ICE[chainId]
  const { status } = useAccount()
  const campaignFactory = useCampaignFactory()
  const router = useRouter()
  const submit = trpc.campaign.add.useMutation()
  const { fetchWithCatchTxError } = useCatchTxError()

  const handleDeposit = async () => {
    setStep('transfer')

    const nativeFee = await campaignFactory.read.nativeFee()

    const receipt: TransactionReceipt = await fetchWithCatchTxError(() =>
      campaignFactory.write.createCampaign(
        [
          {
            softCap: BigInt(formValues.softCap) * 10n**BigInt(raisedToken.decimals),
            hardCap: BigInt(formValues.hardCap) * 10n**BigInt(raisedToken.decimals),
            startDate: BigInt(Math.floor(formValues.startDate.getTime() / 1000)),
            endDate: BigInt(Math.floor(formValues.endDate.getTime() / 1000)),
            rate: BigInt(formValues.rate) * 10n**18n,
            poolRate: BigInt(formValues.poolRate) * 10n**18n,
            minAllowed: BigInt(formValues.minAllowed) * 10n**BigInt(raisedToken.decimals),
            maxAllowed: BigInt(formValues.maxAllowed) * 10n**BigInt(raisedToken.decimals),
            lockDuration: BigInt(Math.floor((formValues.liquidityUnlockDate.getTime() - formValues.endDate.getTime()) / 1000)),
            liquidityPercentage: BigInt(formValues.liquidityRate),
            vestingPercentage: BigInt(formValues.vestingPercentage),
            vestingPeriod: BigInt(Math.floor((formValues.vestingEndDate.getTime() - formValues.endDate.getTime()) / 1000)),
            whitelistEnabled: false,
          },
          token.address,
          raisedToken.address
        ], { value: nativeFee }
      )
    )
    const launchPadAddress = receipt.logs[0].address

    const data = {
      address: launchPadAddress,
      chainId: chainId as number,
      website: formValues?.website,
      banner: formValues?.banner?.blob,
      twitter: formValues?.twitter,
      telegram: formValues?.telegram,
      discord: formValues?.discord,
      github: formValues?.github,
      reddit: formValues?.reddit,
      description: formValues?.description,
      startDate: Math.floor(new Date(formValues?.startDate).getTime() / 1000),
    }

    await submit
      .mutateAsync(data)
      .then(() => setStep('completed'))
      .catch((err) => console.error(err))
  }

  const handleDismiss = () => {
    onDismiss()
    router.push('/launchpad')
  }

  const preview = status === 'connected' ?
    <Button style={{ flexGrow: 1 }} onClick={handleDeposit}>Confirm</Button> :
    <ConnectWalletButton/>

  const transferCompleted = (
    <>
      <Text>Campaign Created</Text>
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
      <Text>Your Campaign is being created</Text>
    </>
  )

  const steps = {
    preview,
    transfer: waitingForTransfer,
    completed: transferCompleted,
  }

  return (
    <Modal title="Creating Campaign" onDismiss={handleDismiss} minWidth="min(100vw, 426px)">
      <Flex flexDirection="column" alignItems="stretch" style={{ gap: '1em' }}>
        {steps[step]}
      </Flex>
    </Modal>
  )
}

export default CreateModal
