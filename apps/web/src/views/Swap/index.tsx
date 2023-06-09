import { useEffect, useContext, useState } from 'react'
import { JSBI, NATIVE, Currency, ChainId } from '@pancakeswap/sdk'
import {
  Box,
  Flex,
  BottomDrawer,
  useMatchBreakpoints,
  Text,
  Swap as SwapUI,
  Link,
  Heading,
  Message,
} from '@pancakeswap/uikit'
import { EXCHANGE_DOCS_URLS, NATIVE_TOKEN_ADDRESS } from 'config/constants'
import { AppBody } from 'components/App'

import { useCurrency } from '../../hooks/Tokens'
import { Field } from '../../state/swap/actions'
import { useSwapState, useSingleTokenSwapInfo, useDerivedSwapInfo } from '../../state/swap/hooks'
import Page from '../Page'
import PriceChartContainer from './components/Chart/PriceChartContainer'

import SwapForm from './components/SwapForm'
import StableSwapFormContainer from './StableSwap'
import { StyledInputCurrencyWrapper, StyledSwapContainer } from './styles'
import SwapTab, { SwapType } from './components/SwapTab'
import { SwapFeaturesContext } from './SwapFeaturesContext'
import { useWeb3React } from '@pancakeswap/wagmi'
import { useIsAkkaAlternateModeActive, useIsAkkaContractSwapModeActive, useIsAkkaSwapModeActive, useIsAkkaSwapModeStatus } from 'state/global/hooks'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { useAkkaSwapInfo } from './AkkaSwap/hooks/useAkkaSwapInfo'
import { useUserSlippageTolerance } from 'state/user/hooks'
import { useAkkaRouterContract, useAkkaRouterCoreContract } from 'utils/exchange'
import { ApprovalState } from 'hooks/useApproveCallback'
import { useApproveCallbackFromAkkaTrade } from './AkkaSwap/hooks/useApproveCallbackFromAkkaTrade'
import useWrapCallback, { WrapType } from 'hooks/useWrapCallback'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useSupportedChainList, useSupportedChains } from 'hooks/useSupportedChains'
import { useBalance } from 'wagmi'
import chainName from 'config/constants/chainName'
import { captureMessage } from '@sentry/nextjs'
import { akkaAlternateActive } from 'state/global/actions'

export default function Swap() {
  const { isMobile } = useMatchBreakpoints()
  const { isChartExpanded, isChartDisplayed, setIsChartDisplayed, setIsChartExpanded, isChartSupported } =
    useContext(SwapFeaturesContext)

  const { account } = useWeb3React()

  // swap state & price data
  const {
    independentField,
    typedValue,
    recipient,
    [Field.INPUT]: { currencyId: inputCurrencyId },
    [Field.OUTPUT]: { currencyId: outputCurrencyId },
  } = useSwapState()

  const inputCurrency = useCurrency(inputCurrencyId)
  const outputCurrency = useCurrency(outputCurrencyId)
  const currencies: { [field in Field]?: Currency } = {
    [Field.INPUT]: inputCurrency ?? undefined,
    [Field.OUTPUT]: outputCurrency ?? undefined,
  }

  const { chainId: walletChainId } = useWeb3React()

  // isAkkaSwapMode checks if this is akka router form or not from redux
  const [isAkkaSwapMode, toggleSetAkkaMode, toggleSetAkkaModeToFalse, toggleSetAkkaModeToTrue] =
    useIsAkkaSwapModeStatus()

  // get custom setting values for user
  const [allowedSlippage] = useUserSlippageTolerance()

  // Take swap information from pancakeswap router
  const {
    v2Trade,
    currencyBalances,
    parsedAmount,
    inputError: swapInputError,
  } = useDerivedSwapInfo(independentField, typedValue, inputCurrency, outputCurrency, recipient)

  // Take swap information from AKKA router
  const {
    trade: akkaRouterTrade,
    currencyBalances: akkaCurrencyBalances,
    parsedAmount: akkaParsedAmount,
    inputError: akkaSwapInputError,
  } = useAkkaSwapInfo(independentField, typedValue, inputCurrency, outputCurrency, allowedSlippage)

  const {
    wrapType,
    execute: onWrap,
    inputError: wrapInputError,
  } = useWrapCallback(currencies[Field.INPUT], currencies[Field.OUTPUT], typedValue)

  const showWrap: boolean = wrapType !== WrapType.NOT_APPLICABLE
  const trade = showWrap ? undefined : v2Trade
  const parsedAmounts = showWrap
    ? {
      [Field.INPUT]: parsedAmount,
      [Field.OUTPUT]: parsedAmount,
    }
    : {
      [Field.INPUT]: independentField === Field.INPUT ? parsedAmount : trade?.inputAmount,
      [Field.OUTPUT]: independentField === Field.OUTPUT ? parsedAmount : trade?.outputAmount,
    }
  const akkaContract = useAkkaRouterContract()
  const akkaCoreContract = useAkkaRouterCoreContract()
  const { isConnected } = useWeb3React()
  const methodName = 'multiPathSwap'
  const [akkaApproval, akkaApproveCallback] = useApproveCallbackFromAkkaTrade(parsedAmounts[Field.INPUT])

  // isAkkaSwapActive checks if akka router is generally active or not
  const [isAkkaSwapActive, toggleSetAkkaActive, toggleSetAkkaActiveToFalse, toggleSetAkkaActiveToTrue] =
    useIsAkkaSwapModeActive()

  // isAkkaContractSwapMode checks if this is akka router form or not from redux
  const [
    isAkkaContractSwapMode,
    toggleSetAkkaContractMode,
    toggleSetAkkaContractModeToFalse,
    toggleSetAkkaContractModeToTrue,
  ] = useIsAkkaContractSwapModeActive()

  const { chainId } = useActiveWeb3React()

  // Check Independent Field for AKKA
  useEffect(() => {
    if (independentField === Field.OUTPUT) {
      toggleSetAkkaActiveToFalse()
    } else {
      toggleSetAkkaActiveToTrue()
    }
  }, [independentField])

  // Check if pancakeswap route is better than akka route or not
  useEffect(() => {
    if (akkaRouterTrade?.route?.returnAmountWithoutTaxWei && v2Trade?.outputAmount) {
      if (v2Trade?.outputAmount.greaterThan(JSBI.BigInt(akkaRouterTrade?.route?.returnAmountWei))) {
        toggleSetAkkaModeToFalse()
        // captureMessage(`AKKA: RateError`, {
        //   tags: {
        //     chain_id: chainId,
        //     amount: parsedAmount?.multiply(10 ** inputCurrency?.decimals)?.toExact(),
        //     fromToken: inputCurrencyId === NATIVE[chainId]?.symbol ? NATIVE_TOKEN_ADDRESS : inputCurrency?.wrapped?.address,
        //     toToken: outputCurrencyId === NATIVE[chainId]?.symbol ? NATIVE_TOKEN_ADDRESS : outputCurrency?.wrapped?.address,
        //     pksRate: v2Trade?.outputAmount.toExact(),
        //     akkaRate: akkaRouterTrade?.route?.returnAmountWei,
        //   },
        // })
      } else {
        toggleSetAkkaModeToTrue()
      }
    }
  }, [typedValue, akkaRouterTrade, inputCurrencyId, outputCurrencyId])

  useEffect(() => {
    if (isConnected) {
      if (akkaApproval === ApprovalState.APPROVED) {
        if (currencyBalances[Field.INPUT] && parsedAmount && (currencyBalances[Field.INPUT].greaterThan(parsedAmount) || currencyBalances[Field.INPUT].equalTo(parsedAmount))) {
          if (akkaRouterTrade?.args?.amountIn && akkaRouterTrade?.args?.amountOutMin && akkaRouterTrade?.args?.data) {
            if (chainId === ChainId.CORE) {
              akkaCoreContract.estimateGas[methodName](
                akkaRouterTrade?.args?.amountIn,
                akkaRouterTrade?.args?.amountOutMin,
                akkaRouterTrade?.args?.data,
                account,
                akkaRouterTrade?.args?.akkaFee?.fee,
                akkaRouterTrade?.args?.akkaFee?.v,
                akkaRouterTrade?.args?.akkaFee?.r,
                akkaRouterTrade?.args?.akkaFee?.s,
                {
                  value: inputCurrencyId === NATIVE[chainId].symbol ? akkaRouterTrade?.args?.amountIn : '0',
                },
              )
                .then((data) => {
                  if (data.gt('21000')) {
                    toggleSetAkkaContractModeToTrue()
                  } else {
                    toggleSetAkkaContractModeToFalse()
                    captureMessage(`AKKA: EstimateGas is lower than 21000`, {
                      tags: {
                        chain_id: chainId,
                        amount: parsedAmount?.multiply(10 ** inputCurrency?.decimals)?.toExact(),
                        fromToken: inputCurrencyId === NATIVE[chainId]?.symbol ? NATIVE_TOKEN_ADDRESS : inputCurrency?.wrapped?.address,
                        toToken: outputCurrencyId === NATIVE[chainId]?.symbol ? NATIVE_TOKEN_ADDRESS : outputCurrency?.wrapped?.address,
                      },
                    })
                  }
                })
                .catch((error) => {
                  toggleSetAkkaContractModeToFalse()
                  captureMessage(`AKKA: EstimateGas Error -> ${error}`, {
                    tags: {
                      chain_id: chainId,
                      amount: parsedAmount?.multiply(10 ** inputCurrency?.decimals)?.toExact(),
                      fromToken: inputCurrencyId === NATIVE[chainId]?.symbol ? NATIVE_TOKEN_ADDRESS : inputCurrency?.wrapped?.address,
                      toToken: outputCurrencyId === NATIVE[chainId]?.symbol ? NATIVE_TOKEN_ADDRESS : outputCurrency?.wrapped?.address,
                    },
                  })
                })
            }
            else {
              akkaContract.estimateGas[methodName](
                akkaRouterTrade?.args?.amountIn,
                akkaRouterTrade?.args?.amountOutMin,
                akkaRouterTrade?.args?.data,
                [],
                [],
                account,
                {
                  value: inputCurrencyId === NATIVE[chainId].symbol ? akkaRouterTrade?.args?.amountIn : '0',
                },
              )
                .then((data) => {
                  if (data.gt('21000')) {
                    toggleSetAkkaContractModeToTrue()
                  } else {
                    toggleSetAkkaContractModeToFalse()
                    captureMessage(`AKKA: EstimateGas is lower than 21000`, {
                      tags: {
                        chain_id: chainId,
                        amount: parsedAmount?.multiply(10 ** inputCurrency?.decimals)?.toExact(),
                        fromToken: inputCurrencyId === NATIVE[chainId]?.symbol ? NATIVE_TOKEN_ADDRESS : inputCurrency?.wrapped?.address,
                        toToken: outputCurrencyId === NATIVE[chainId]?.symbol ? NATIVE_TOKEN_ADDRESS : outputCurrency?.wrapped?.address,
                      },
                    })
                  }
                })
                .catch((error) => {
                  toggleSetAkkaContractModeToFalse()
                  captureMessage(`AKKA: EstimateGas Error -> ${error}`, {
                    tags: {
                      chain_id: chainId,
                      amount: parsedAmount?.multiply(10 ** inputCurrency?.decimals)?.toExact(),
                      fromToken: inputCurrencyId === NATIVE[chainId]?.symbol ? NATIVE_TOKEN_ADDRESS : inputCurrency?.wrapped?.address,
                      toToken: outputCurrencyId === NATIVE[chainId]?.symbol ? NATIVE_TOKEN_ADDRESS : outputCurrency?.wrapped?.address,
                    },
                  })
                })
            }
          }
        } else {
          toggleSetAkkaContractModeToTrue()
        }
      } else {
        toggleSetAkkaContractModeToTrue()
      }
    } else {
      toggleSetAkkaContractModeToTrue()
    }
  }, [akkaApproval, isConnected, parsedAmounts, parsedAmount, akkaRouterTrade])

  const singleTokenPrice = useSingleTokenSwapInfo(inputCurrencyId, inputCurrency, outputCurrencyId, outputCurrency)
  const supportedChains = useSupportedChains()
  const supportedChainNames = useSupportedChainList()
  const balance = useBalance({ addressOrName: account })
  const isChainSupported = walletChainId ? supportedChains.includes(walletChainId) : true
  const isConnectedAndHasNoBalance = isConnected && balance.data?.value?.isZero()

  return (
    <Page removePadding={isChartExpanded} hideFooterOnDesktop={isChartExpanded}>
      {isConnectedAndHasNoBalance && (
        <Message variant="info" mb="16px">
          <span>
            It looks like you don&apos;t have any {chainName[walletChainId]} tokens. Simply{'  '}
            <Link href="/bridge" display="inline-flex">
              bridge
            </Link>{' '}
            any token to {chainName[walletChainId]} and recieve a free gasdrop.
          </span>
        </Message>
      )}
      <Flex marginBottom="4em" width={['328px', , '100%']} height="100%" justifyContent="center" position="relative">
        {!isMobile && isChartSupported && (
          <PriceChartContainer
            inputCurrencyId={inputCurrencyId}
            inputCurrency={currencies[Field.INPUT]}
            outputCurrencyId={outputCurrencyId}
            outputCurrency={currencies[Field.OUTPUT]}
            isChartExpanded={isChartExpanded}
            setIsChartExpanded={setIsChartExpanded}
            isChartDisplayed={isChartDisplayed}
            currentSwapPrice={singleTokenPrice}
          />
        )}
        {isChartSupported && (
          <BottomDrawer
            content={
              <PriceChartContainer
                inputCurrencyId={inputCurrencyId}
                inputCurrency={currencies[Field.INPUT]}
                outputCurrencyId={outputCurrencyId}
                outputCurrency={currencies[Field.OUTPUT]}
                isChartExpanded={isChartExpanded}
                setIsChartExpanded={setIsChartExpanded}
                isChartDisplayed={isChartDisplayed}
                currentSwapPrice={singleTokenPrice}
                isMobile
              />
            }
            isOpen={isChartDisplayed}
            setIsOpen={setIsChartDisplayed}
          />
        )}
        {isChainSupported && (
          <Flex flexDirection="column">
            <StyledSwapContainer $isChartExpanded={isChartExpanded}>
              <StyledInputCurrencyWrapper mt={isChartExpanded ? '24px' : '0'}>
                <AppBody>
                  <SwapTab>
                    {(swapTypeState) =>
                      swapTypeState === SwapType.STABLE_SWAP ? <StableSwapFormContainer /> : <SwapForm />
                    }
                  </SwapTab>
                </AppBody>
              </StyledInputCurrencyWrapper>
            </StyledSwapContainer>
            {isChartExpanded && (
              <Box display={['none', null, null, 'block']} width="100%" height="100%">
                <SwapUI.Footer variant="side" helpUrl={EXCHANGE_DOCS_URLS} />
              </Box>
            )}
            {/* <Text marginTop="36px" maxWidth="560px" lineHeight="125%" padding="24px"> */}
            {/*   <Heading marginBottom="16px">About our Swap</Heading> */}
            {/*   Our swap is the <i>number one</i> DEX that supports{' '} */}
            {/*   <Link href="/core" display="inline-flex"> */}
            {/*     CoreDao */}
            {/*   </Link> */}
            {/*   . The swap is highly secured by running on audited smart contracts based on UniSwap V2. You are able to */}
            {/*   trade your tokens with the best price and the lowest slippage. We are able to provide low price slippage */}
            {/*   even with high token amounts transferred. This is possible due to our integration of the{' '} */}
            {/*   <Link href="https://akka.finance" external display="inline-flex" target="_blank"> */}
            {/*     Akka Router */}
            {/*   </Link> */}
            {/*   . Our DEX is supporting a wide range of Chains counting {supportedChains.length} chains. Which are{' '} */}
            {/*   {supportedChainNames}. If you want to learn more about our swap, please visit our{' '} */}
            {/*   <Link href="https://wiki.icecreamswap.com/dex/swap" display="inline-flex" external target="_blank"> */}
            {/*     Wiki */}
            {/*   </Link> */}
            {/*   . */}
            {/* </Text> */}
          </Flex>
        )}
      </Flex>
    </Page>
  )
}
