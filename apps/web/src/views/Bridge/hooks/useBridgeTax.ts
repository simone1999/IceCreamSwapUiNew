import { BigNumber } from '@ethersproject/bignumber'
import { useEffect, useState } from 'react'
import { useSigner } from 'wagmi'
import { utils } from 'ethers'
import { useBridge } from '../BridgeProvider'
import { Erc20DetailedFactory } from '../contracts/Erc20DetailedFactory'
import { ERC20Token } from '@pancakeswap/sdk'

export const useBridgeTax = () => {
  const {
    bridge: homeBridge,
    homeChainConfig,
    currency,
    depositAmount,
    destinationChainConfig,
    tokenBalances,
  } = useBridge()
  const { data: signer } = useSigner()
  const provider = signer?.provider
  const [bridgeFee, setBridgeFee] = useState<number | undefined>()
  const [bridgeFeeToken, setBridgeFeeToken] = useState<string | undefined>()
  const [relayerThreshold, setRelayerThreshold] = useState<number | undefined>()

  useEffect(() => {
    const getRelayerThreshold = async () => {
      if (homeBridge) {
        const threshold = BigNumber.from(await homeBridge._relayerThreshold()).toNumber()
        setRelayerThreshold(threshold)
      }
    }
    getRelayerThreshold()
  }, [homeBridge])

  const selectedToken =
    currency instanceof ERC20Token
      ? currency.address
      : currency?.isNative
      ? '0x0000000000000000000000000000000000000000'
      : undefined
  const destinationDomainId = destinationChainConfig?.domainId

  useEffect(() => {
    const getBridgeFee = async () => {
      if (
        homeBridge &&
        selectedToken &&
        selectedToken !== '' &&
        homeChainConfig &&
        provider &&
        depositAmount &&
        destinationDomainId
      ) {
        const token = homeChainConfig.tokens.find((t) => t.address === selectedToken)
        if (!token) {
          console.error('Token not found')
          return
        }
        const recipient = await signer.getAddress()
        const erc20 = Erc20DetailedFactory.connect(token.address, signer)
        const isNative = token.address === '0x0000000000000000000000000000000000000000'
        const erc20Decimals = homeChainConfig.decimals || (isNative ? 18 : await erc20.decimals())

        const data = `0x${utils
          .hexZeroPad(BigNumber.from(utils.parseUnits(depositAmount.toString(), erc20Decimals)).toHexString(), 32)
          .substring(2)}${utils.hexZeroPad(utils.hexlify((recipient.length - 2) / 2), 32).substring(2)}${
          recipient.substring(2) // recipientAddress (?? bytes)
        }`

        try {
          const { feeToken, fee } = await homeBridge.calculateFee(
            BigNumber.from(destinationDomainId),
            token.resourceId,
            data,
          )
          const feeTokenInfos = homeChainConfig.tokens.find((t) => t.address === feeToken)
          let decimals: number | undefined
          if (feeToken === '0x0000000000000000000000000000000000000000') {
            decimals = 18
          } else if (!feeTokenInfos) {
            const feeTokenErc20 = Erc20DetailedFactory.connect(feeToken, signer)
            decimals = await feeTokenErc20.decimals()
          } else {
            decimals = homeChainConfig.decimals
          }
          // eslint-disable-next-line @typescript-eslint/no-shadow
          const bridgeFee = Number(utils.formatUnits(fee, decimals))
          setBridgeFee(bridgeFee)
          setBridgeFeeToken(feeToken)
        } catch (e) {
          console.error(e)
          setBridgeFee(undefined)
          setBridgeFeeToken(undefined)
        }
      }
    }
    getBridgeFee()
  }, [depositAmount, destinationDomainId, homeBridge, homeChainConfig, provider, selectedToken, signer])

  const bridgeFeeCurrency = homeChainConfig?.tokens.find((t) => t.address === bridgeFeeToken)

  const checkFee = () => {
    if (depositAmount && tokenBalances[selectedToken || '']) {
      return bridgeFeeToken && typeof bridgeFee !== 'undefined'
    }
    return false
  }

  return {
    bridgeFee,
    bridgeFeeToken,
    relayerThreshold,
    bridgeFeeCurrency,
    hasBridgeFee: checkFee(),
  }
}
