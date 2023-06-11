import { Interface, FunctionFragment } from 'ethers/lib/utils'
import { BigNumber, Contract } from 'ethers'
import { useCallback, useEffect, useMemo } from 'react'
import {
  useSWRConfig,
  // eslint-disable-next-line camelcase
  unstable_serialize,
} from 'swr'
import { useActiveChainId } from '../../hooks/useActiveChainId'
import { useAtom } from 'jotai'
import { multicallReducerAtom } from 'state/multicall/reducer'
import {
  addMulticallListeners,
  Call,
  removeMulticallListeners,
  parseCallKey,
  toCallKey,
  ListenerOptions,
  ListenerOptionsWithGas,
} from './actions'

export interface CallStateResult extends ReadonlyArray<any> {
  readonly [key: string]: any
}

export interface Result extends ReadonlyArray<any> {
  readonly [key: string]: any
}

type MethodArg = string | number | BigNumber
type MethodArgs = Array<MethodArg | MethodArg[]>

type OptionalMethodInputs = Array<MethodArg | MethodArg[] | undefined> | undefined

function isMethodArg(x: unknown): x is MethodArg {
  return ['string', 'number'].indexOf(typeof x) !== -1
}

function isValidMethodArgs(x: unknown): x is MethodArgs | undefined {
  return (
    x === undefined ||
    (Array.isArray(x) && x.every((xi) => isMethodArg(xi) || (Array.isArray(xi) && xi.every(isMethodArg))))
  )
}

interface CallResult {
  readonly valid: boolean
  readonly data: string | undefined
  readonly blockNumber: number | undefined
}

const INVALID_RESULT: CallResult = { valid: false, blockNumber: undefined, data: undefined }

// use this options object
export const NEVER_RELOAD: ListenerOptions = {
  blocksPerFetch: Infinity,
}

// the lowest level call for subscribing to contract data
function useCallsData(calls: (Call | undefined)[], options?: ListenerOptions): CallResult[] {
  const { chainId } = useActiveChainId()
  const [{ callResults }, dispatch] = useAtom(multicallReducerAtom)

  const serializedCallKeys: string = useMemo(
    () =>
      JSON.stringify(
        calls
          ?.filter((c): c is Call => Boolean(c))
          ?.map(toCallKey)
          ?.sort() ?? [],
      ),
    [calls],
  )

  // update listeners when there is an actual change that persists for at least 100ms
  useEffect(() => {
    const callKeys: string[] = JSON.parse(serializedCallKeys)
    if (!chainId || callKeys.length === 0) return undefined
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const calls = callKeys.map((key) => parseCallKey(key))
    dispatch(
      addMulticallListeners({
        chainId,
        calls,
        options,
      }),
    )

    return () => {
      dispatch(
        removeMulticallListeners({
          chainId,
          calls,
          options,
        }),
      )
    }
  }, [chainId, dispatch, options, serializedCallKeys])

  return useMemo(
    () =>
      calls.map<CallResult>((call) => {
        if (!chainId || !call) return INVALID_RESULT

        const result = callResults[chainId]?.[toCallKey(call)]
        let data
        if (result?.data && result?.data !== '0x') {
          // eslint-disable-next-line prefer-destructuring
          data = result.data
        }

        return { valid: true, data, blockNumber: result?.blockNumber }
      }),
    [callResults, calls, chainId],
  )
}

export interface CallState {
  readonly valid: boolean
  // the result, or undefined if loading or errored/no data
  readonly result: Result | undefined
  // true if the result has never been fetched
  readonly loading: boolean
  // true if the result is not for the latest block
  readonly syncing: boolean
  // true if the call was made and is synced, but the return data is invalid
  readonly error: boolean
  readonly blockNumber?: number
}

const INVALID_CALL_STATE: CallState = { valid: false, result: undefined, loading: false, syncing: false, error: false }
const LOADING_CALL_STATE: CallState = { valid: true, result: undefined, loading: true, syncing: true, error: false }

// Converts CallResult[] to CallState[], only updating if call states have changed.
// Ensures that CallState results remain referentially stable when unchanged, preventing
// spurious re-renders which would otherwise occur because mapping always creates a new object.
export function useCallStates(
  results: CallResult[],
  contractInterface: Interface | undefined,
  fragment: ((i: number) => FunctionFragment | undefined) | FunctionFragment | undefined,
  latestBlockNumber: number | undefined,
): CallState[] {
  // Avoid refreshing the results with every changing block number (eg latestBlockNumber).
  // Instead, only refresh the results if they need to be synced - if there is a result which is stale, for which blockNumber < latestBlockNumber.
  const syncingBlockNumber = useMemo(() => {
    const lowestBlockNumber = results.reduce<number | undefined>(
      (memo, result) => (result.blockNumber ? Math.min(memo ?? result.blockNumber, result.blockNumber) : memo),
      undefined,
    )
    return Math.max(lowestBlockNumber ?? 0, latestBlockNumber ?? 0)
  }, [results, latestBlockNumber])

  return useMemo(() => {
    return results.map((result, i) => {
      const resultFragment = typeof fragment === 'function' ? fragment(i) : fragment
      return toCallState(result, contractInterface, resultFragment, syncingBlockNumber)
    })
  }, [contractInterface, fragment, results, syncingBlockNumber])
}

function toCallState(
  callResult: CallResult | undefined,
  contractInterface: Interface | undefined,
  fragment: FunctionFragment | undefined,
  latestBlockNumber: number | undefined,
): CallState {
  if (!callResult) return INVALID_CALL_STATE
  const { valid, data, blockNumber } = callResult
  if (!valid) return INVALID_CALL_STATE
  if (valid && !blockNumber) return LOADING_CALL_STATE
  if (!contractInterface || !fragment || !latestBlockNumber) return LOADING_CALL_STATE
  const success = data && data.length > 2
  const syncing = (blockNumber ?? 0) < latestBlockNumber
  let result: Result | undefined
  if (success && data) {
    try {
      result = contractInterface.decodeFunctionResult(fragment, data)
    } catch (error) {
      console.debug('Result data parsing failed', fragment, data)
      return {
        valid: true,
        loading: false,
        error: true,
        syncing,
        result,
        blockNumber,
      }
    }
  }
  return {
    valid: true,
    loading: false,
    syncing,
    result,
    error: !success,
    blockNumber,
  }
}

export interface MultiContractsMultiMethodsCallInput {
  contract: Contract | null | undefined
  methodName: string
  inputs?: OptionalMethodInputs
}

export function useMultiContractsMultiMethods(
  callInputs: MultiContractsMultiMethodsCallInput[],
  options?: ListenerOptions,
) {
  const { chainId } = useActiveChainId()

  const { calls, fragments, contracts } = useMemo(() => {
    if (!callInputs || !callInputs.length) {
      return { calls: [], fragments: [], contracts: [] }
    }
    const validFragments: FunctionFragment[] = []
    const validContracts: Contract[] = []
    const validCalls: Call[] = []
    for (const { methodName, inputs, contract } of callInputs) {
      const fragment = contract?.interface.getFunction(methodName)
      if (!contract || !fragment) {
        // eslint-disable-next-line no-continue
        continue
      }
      validFragments.push(fragment)
      validContracts.push(contract)
      validCalls.push({
        address: contract.address,
        callData: contract.interface.encodeFunctionData(fragment, inputs),
      })
    }
    return { calls: validCalls, fragments: validFragments, contracts: validContracts }
  }, [callInputs])

  const results = useCallsData(calls, options)

  const { cache } = useSWRConfig()

  return useMemo(() => {
    const currentBlockNumber = cache.get(unstable_serialize(['blockNumber', chainId]))?.data
    return results.map((result, i) => toCallState(result, contracts[i]?.interface, fragments[i], currentBlockNumber))
  }, [cache, chainId, results, fragments, contracts])
}

export function useSingleContractMultiMethods(
  contract: Contract | null | undefined,
  callInputs: {
    methodName: string
    inputs?: OptionalMethodInputs
  }[],
  options?: ListenerOptions,
) {
  const multiInputs = useMemo(() => callInputs.map((callInput) => ({ ...callInput, contract })), [callInputs, contract])
  return useMultiContractsMultiMethods(multiInputs, options)
}

export function useSingleContractWithCallData(
  contract: Contract | null | undefined,
  callDatas: string[],
  options?: ListenerOptionsWithGas,
): CallState[] {
  const { chainId } = useActiveChainId()

  const { gasRequired } = options ?? {}

  // Create call objects
  const calls = useMemo(() => {
    if (!contract) return []
    return callDatas.map<Call>((callData) => ({
      address: contract.address,
      callData,
      gasRequired,
    }))
  }, [callDatas, contract, gasRequired])

  const results = useCallsData(calls, options)

  const { cache } = useSWRConfig()

  const fragment = useCallback(
    (i: number) => contract?.interface?.getFunction(callDatas[i].substring(0, 10)),
    [callDatas, contract],
  )

  const currentBlockNumber = cache.get(unstable_serialize(['blockNumber', chainId]))?.data

  return useCallStates(results, contract?.interface, fragment, currentBlockNumber)
}

export function useSingleContractMultipleData(
  contract: Contract | null | undefined,
  methodName: string,
  callInputs: OptionalMethodInputs[],
  options?: ListenerOptions,
): CallState[] {
  const { chainId } = useActiveChainId()
  const fragment = useMemo(() => contract?.interface?.getFunction(methodName), [contract, methodName])

  const calls = useMemo(
    () =>
      contract && fragment && callInputs && callInputs.length > 0
        ? callInputs.map<Call>((inputs) => {
            return {
              address: contract.address,
              callData: contract.interface.encodeFunctionData(fragment, inputs),
            }
          })
        : [],
    [callInputs, contract, fragment],
  )

  const results = useCallsData(calls, options)

  const { cache } = useSWRConfig()

  return useMemo(() => {
    const currentBlockNumber = cache.get(unstable_serialize(['blockNumber', chainId]))?.data
    return results.map((result) => toCallState(result, contract?.interface, fragment, currentBlockNumber))
  }, [cache, chainId, results, contract?.interface, fragment])
}

export function useMultipleContractSingleData(
  addresses: (string | undefined)[],
  contractInterface: Interface,
  methodName: string,
  callInputs?: OptionalMethodInputs,
  options?: ListenerOptions,
): CallState[] {
  const fragment = useMemo(() => contractInterface.getFunction(methodName), [contractInterface, methodName])
  const callData: string | undefined = useMemo(
    () =>
      fragment && isValidMethodArgs(callInputs)
        ? contractInterface.encodeFunctionData(fragment, callInputs)
        : undefined,
    [callInputs, contractInterface, fragment],
  )

  const calls = useMemo(
    () =>
      fragment && addresses && addresses.length > 0 && callData
        ? addresses.map<Call | undefined>((address) => {
            return address && callData
              ? {
                  address,
                  callData,
                }
              : undefined
          })
        : [],
    [addresses, callData, fragment],
  )

  const results = useCallsData(calls, options)
  const { chainId } = useActiveChainId()

  const { cache } = useSWRConfig()

  return useMemo(() => {
    const currentBlockNumber = cache.get(unstable_serialize(['blockNumber', chainId]))?.data
    return results.map((result) => toCallState(result, contractInterface, fragment, currentBlockNumber))
  }, [cache, chainId, results, contractInterface, fragment])
}

export function useSingleCallResult(
  contract: Contract | null | undefined,
  methodName: string,
  inputs?: OptionalMethodInputs,
  options?: ListenerOptionsWithGas,
): CallState {
  const fragment = useMemo(() => contract?.interface?.getFunction(methodName), [contract, methodName])

  const calls = useMemo<Call[]>(() => {
    return contract && fragment && isValidMethodArgs(inputs)
      ? [
          {
            address: contract.address,
            callData: contract.interface.encodeFunctionData(fragment, inputs),
          },
        ]
      : []
  }, [contract, fragment, inputs])

  const result = useCallsData(calls, options)[0]

  const { cache } = useSWRConfig()
  const { chainId } = useActiveChainId()

  return useMemo(() => {
    const currentBlockNumber = cache.get(unstable_serialize(['blockNumber', chainId]))?.data
    return toCallState(result, contract?.interface, fragment, currentBlockNumber)
  }, [cache, chainId, result, contract?.interface, fragment])
}
