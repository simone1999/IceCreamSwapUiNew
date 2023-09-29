import { Flex, Modal, useModalContext, Text, Button, Heading, Spinner } from '@pancakeswap/uikit'
import { useCallback, useState } from 'react'
import { FormValues } from '../create-schema'
import styled from 'styled-components'
import { useAddUserToken } from 'state/user/hooks'
import { useToken } from 'hooks/Tokens'
import useUserAddedTokens from 'state/user/hooks/useUserAddedTokens'
import { useAccount } from 'wagmi'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { BigNumber, utils } from 'ethers'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { useCampaignFactory } from '../hooks'
import { useRouter } from 'next/router'
import { useUser } from 'strict/hooks/useUser'

interface DepositModalProps {
  formValues: FormValues
}

const Logo = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
`

const Subtitle = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSubtle};
`

type Steps = 'preview' | 'transfer' | 'completed'

const CreateModal: React.FC<DepositModalProps> = (props) => {
  const { formValues } = props
  const [step, setStep] = useState<Steps>('preview')
  const { onDismiss } = useModalContext()
  const { chainId } = useActiveChainId()
  const token = useToken(formValues?.tokenAddress)
  const { address, status } = useAccount()
  const campaignFactory = useCampaignFactory()
  const router = useRouter()
  const user = useUser()
  const handleDeposit = async () => {
    // const initialSupply = utils.parseUnits(String(formValues?.initialSupply || '0'), 18)
    // const maxSupply = utils.parseUnits(String(formValues?.maxSupply || '0'), 18)
    try {
      await fetch('/api/add-campaign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: user.data?.wallet,
          address: formValues?.tokenAddress,
          chainId: chainId as number,
          website: formValues?.website,
          banner: formValues?.banner,
          twitter: formValues?.twitter,
          telegram: formValues?.telegram,
          discord: formValues?.discord,
          github: formValues?.github,
          reddit: formValues?.reddit,
          description: formValues?.description,
          tags: ['KYC'],
          startDate: Math.floor(new Date(formValues?.startDate).getTime() / 1000),
        }),
      })

      setStep('transfer')

      await campaignFactory?.createCampaign(
        {
          rate: BigNumber.from(formValues?.rate || 0),
          hardCap: BigNumber.from(formValues?.hardCap || 0),
          softCap: BigNumber.from(formValues?.softCap || 0),
          min_allowed: BigNumber.from(formValues?.minAllowed || 0),
          max_allowed: BigNumber.from(formValues?.maxAllowed || 0),
          start_date: BigNumber.from(Math.floor(new Date(formValues?.startDate).getTime() / 1000) || 0),
          end_date: BigNumber.from(Math.floor(new Date(formValues?.startDate).getTime() / 1000) || 0),
          pool_rate: BigNumber.from(formValues?.poolRate || 0),
          liquidity_rate: BigNumber.from(formValues?.liquidityRate || 0),
          lock_duration: 60 * 60 * 24 * 30,
          whitelist_enabled: false,
        },
        formValues?.tokenAddress,
        0,
        '',
        '',
      )

      campaignFactory.on(campaignFactory.filters.CampaignAdded(address), (creator, ta, _tokenName) => {
        if (creator !== address) console.log('not creator')
      })
    } catch (err) {
      console.log(err)
    }
    setStep('completed')
  }

  const addToken = useAddUserToken()
  const userAddedTokens = useUserAddedTokens()

  const handleAddToken = useCallback(() => {
    if (token) {
      addToken(token)
    } else {
      console.error('No token found')
    }
  }, [addToken, token])

  const handleDismiss = () => {
    onDismiss()
    router.push('/launchpad')
  }

  const preview = (
    <>
      {/* {formValues?.burnable && ( */}
      {/*   <Flex alignItems="center" justifyContent="space-between"> */}
      {/*     <Text fontSize="1em">Burnable</Text> */}
      {/*     <Text fontSize="1em">Yes</Text> */}
      {/*   </Flex> */}
      {/* )} */}
      {status === 'connected' ? (
        <Button style={{ flexGrow: 1 }} onClick={handleDeposit}>
          Confirm
        </Button>
      ) : (
        <ConnectWalletButton />
      )}
    </>
  )

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
      <Text>Your Token is being created</Text>
    </>
  )

  const steps = {
    preview,
    transfer: waitingForTransfer,
    completed: transferCompleted,
  }

  return (
    <Modal title="Creating Token" onDismiss={handleDismiss} minWidth="min(100vw, 426px)">
      <Flex flexDirection="column" alignItems="stretch" style={{ gap: '1em' }}>
        {steps[step]}
      </Flex>
    </Modal>
  )
}

export default CreateModal
