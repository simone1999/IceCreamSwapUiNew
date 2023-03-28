import { Flex, Modal, useModalContext, Text, Button, Heading, Spinner } from '@pancakeswap/uikit'
import { formatAmount } from '../../Bridge/formatter'
import { useCallback, useState } from 'react'
import { FormValues } from '../create-schema'
import styled from 'styled-components'
import { useAddUserToken } from 'state/user/hooks'
import { useToken } from 'hooks/Tokens'
import useUserAddedTokens from 'state/user/hooks/useUserAddedTokens'
import AddToWallet from './AddToWallet'
import useTokenDeployer from '../useTokenDeployer'
import { useAccount } from 'wagmi'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { BigNumber, utils } from 'ethers'
import { useActiveChainId } from 'hooks/useActiveChainId'

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

const hasFeatures = (formValues: FormValues) => {
  return formValues?.burnable || formValues?.mintable
}

type Steps = 'preview' | 'transfer' | 'completed'

const CreateModal: React.FC<DepositModalProps> = (props) => {
  const { formValues } = props
  const [step, setStep] = useState<Steps>('preview')
  const { onDismiss } = useModalContext()
  const { chainId } = useActiveChainId()
  const [tokenAddress, setTokenAddress] = useState<string | null>(null)
  const token = useToken(tokenAddress)
  console.log(token)
  console.log(tokenAddress)
  const tokenDeployer = useTokenDeployer()
  const { address, status } = useAccount()

  const handleDeposit = async () => {
    const initialSupply = utils.parseUnits(String(formValues?.initialSupply || '0'), 18)
    const maxSupply = utils.parseUnits(String(formValues?.maxSupply || '0'), 18)
    await tokenDeployer.createToken(
      {
        name: formValues?.tokenName,
        symbol: formValues?.tokenSymbol,
        initialSupply,
        maximumSupply: maxSupply,
        burnable: formValues?.burnable,
        mintable: formValues?.mintable,
        crossChain: false,
        minterDelay: 0,
        vault: '0x0000000000000000000000000000000000000000',
        underlying: '0x0000000000000000000000000000000000000000',
      },
      { gasLimit: 1000000 },
    )
    setStep('transfer')
    tokenDeployer.on(tokenDeployer.filters.TokenCreated(address), (creator, ta, _tokenName) => {
      if (creator !== address) return
      setTokenAddress(ta)
      setStep('completed')
      fetch('/api/add-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formValues?.tokenName,
          symbol: formValues?.tokenSymbol,
          logo: formValues?.logo?.blob,
          address: ta,
          chainId,
          decimals: 18,
        }),
      })
    })
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
  }

  const preview = (
    <>
      <Flex alignItems="center" justifyContent="space-between">
        <Text fontSize="1em" display="flex" style={{ alignItems: 'center', gap: '0.5em' }}>
          {/* <CurrencyLogo currency={amount.currency} /> */}
          <Logo src={formValues?.logo?.blob} />
          <div>
            <Heading>{formValues?.tokenName}</Heading>
            <Subtitle>{formValues?.tokenSymbol}</Subtitle>
          </div>
        </Text>
      </Flex>
      <Flex alignItems="center" justifyContent="space-between">
        <Text fontSize="1em">Initial Supply</Text>
        <Text fontSize="1em">{formValues?.initialSupply}</Text>
      </Flex>
      {hasFeatures(formValues) && <Heading>Features</Heading>}
      {formValues?.burnable && (
        <Flex alignItems="center" justifyContent="space-between">
          <Text fontSize="1em">Burnable</Text>
          <Text fontSize="1em">Yes</Text>
        </Flex>
      )}
      {formValues?.mintable && (
        <>
          <Flex alignItems="center" justifyContent="space-between">
            <Text fontSize="1em">Mintable</Text>
            <Text fontSize="1em">Yes</Text>
          </Flex>
          <Flex alignItems="center" justifyContent="space-between">
            <Text fontSize="1em">Max Supply</Text>
            <Text fontSize="1em">{formValues?.maxSupply}</Text>
          </Flex>
        </>
      )}
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
      <Text>Token created Successful!</Text>
      <Text display="inline" style={{ wordBreak: 'break-all' }}>
        Token Address: {tokenAddress}
      </Text>
      <Text>What&apos;s next?</Text>
      <Button
        onClick={handleAddToken}
        disabled={userAddedTokens?.some((addedToken) => addedToken.address === tokenAddress)}
      >
        {userAddedTokens?.some((addedToken) => addedToken.address === tokenAddress) ? 'Imported' : 'Import to Swap'}
      </Button>
      <AddToWallet
        tokenAddress={tokenAddress!}
        tokenSymbol={formValues?.tokenSymbol}
        tokenDecimals={18}
        tokenImage={formValues?.logo?.blob}
      />
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
