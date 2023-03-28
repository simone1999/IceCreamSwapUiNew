import { ERC20Token } from '@pancakeswap/sdk'
import { utils } from 'ethers'
import { useEffect, useState } from 'react'
import { useBridge } from '../BridgeProvider'
import makeHandleCheckSupplies from '../contracts/makeHandleCheckSupplies'

interface FormErrors {
  currency?: string
  recipient?: string
}

export type FormValidation<T extends string> = Record<
  T,
  {
    [message: string]: (value: unknown) => boolean | Promise<boolean>
  }
>

type Checks =
  | 'tokenSelected'
  | 'amountValid'
  | 'max'
  | 'fee'
  | 'bridgeSupplies'
  | 'min'
  | 'tokenProvided'
  | 'recipientProvided'
  | 'recipientValid'

const checkToMessage: Record<
  Checks,
  {
    message: string
    field: keyof FormErrors
  }
> = {
  tokenSelected: { message: 'Please select a token', field: 'currency' },
  amountValid: { message: 'Please enter a valid amount', field: 'currency' },
  max: { message: 'Insufficient funds', field: 'currency' },
  fee: { message: 'Amount below min fee', field: 'currency' },
  bridgeSupplies: { message: 'Not enough tokens on the destination chain. Please contact support', field: 'currency' },
  min: { message: 'Amount must be greater than 0', field: 'currency' },
  tokenProvided: { message: 'Please select a token', field: 'currency' },
  recipientProvided: { message: 'Please enter a recipient address', field: 'recipient' },
  recipientValid: { message: 'Recipient is not a valid address', field: 'recipient' },
}

export const useFormErrors = (bridgeFee?: number, bridgeFeeToken?: string) => {
  const { currency, depositAmount, recipient, homeChainConfig, destinationChainConfig, tokenBalances } = useBridge()
  const tokenAddress =
    currency instanceof ERC20Token
      ? currency.address
      : currency?.isNative
      ? '0x0000000000000000000000000000000000000000'
      : undefined
  const [formErrors, setFormErrors] = useState<FormErrors>({})
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const DECIMALS = currency?.decimals || 18
  const REGEX = new RegExp(`^[0-9]{1,18}(\\.?[0-9]{0,${DECIMALS}})?$`)
  const handleCheckSupplies = makeHandleCheckSupplies(homeChainConfig)

  useEffect(() => {
    if (hasSubmitted) {
      validateForm()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency, depositAmount, recipient, bridgeFee, bridgeFeeToken])

  const validateForm = async () => {
    const errors: FormErrors = {}

    const checkMax = () => {
      if (!tokenBalances[tokenAddress]) return false
      if (homeChainConfig?.type === 'Ethereum') {
        return parseFloat(depositAmount || '0') <= parseFloat(tokenBalances[tokenAddress].toExact())
      }
      const ethFee = bridgeFeeToken
        ? bridgeFeeToken === '0x0000000000000000000000000000000000000000'
          ? bridgeFee
          : 0
        : 0
      return parseFloat(depositAmount) + ethFee <= parseFloat(tokenBalances[tokenAddress].toExact())
    }

    const checkFee = () => {
      if (depositAmount && tokenBalances[tokenAddress]) {
        return bridgeFeeToken && typeof bridgeFee !== 'undefined'
      }
      return false
    }

    const checkBridgeSupplies = async () => {
      if (handleCheckSupplies && destinationChainConfig && depositAmount) {
        const supplies = await handleCheckSupplies(
          parseFloat(depositAmount),
          tokenAddress,
          destinationChainConfig.networkId,
        )
        return supplies
      }
      return false
    }

    const checks: Record<Checks, boolean> = {
      tokenSelected: (!!depositAmount && !!tokenBalances[tokenAddress]) || false,
      amountValid: REGEX.test(depositAmount || ''),
      max: checkMax(),
      fee: checkFee(),
      bridgeSupplies: await checkBridgeSupplies(),
      min: parseFloat(depositAmount || '0') > 0,
      tokenProvided: !!tokenAddress,
      recipientProvided: !!recipient,
      recipientValid: !!recipient && utils.isAddress(recipient),
    }
    console.log('checks', checks)

    Object.entries(checks).forEach(([check, isValid]) => {
      if (!isValid) {
        const { message, field } = checkToMessage[check as Checks]
        errors[field] = message
      }
    })

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  return {
    validateForm,
    formErrors: hasSubmitted ? formErrors : {},
    setHasSubmitted,
  }
}
