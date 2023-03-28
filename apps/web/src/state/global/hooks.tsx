import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { AppState, useAppDispatch } from '../index'
import { akkaSwapActive, akkaSwapContractActive, akkaSwapStatus } from './actions'

// Get Farm Harvest
export function useFarmHarvestTransaction() {
  const state = useSelector<AppState, AppState['global']>((s) => s.global)
  return {
    showModal: state.showFarmTransactionModal,
    pickedTx: state.pickedFarmTransactionModalTx,
  }
}

export function useIsAkkaSwapActive(): boolean {
  return useSelector<AppState, AppState['global']['isAkkaSwapActive']>((state) => state.global.isAkkaSwapActive)
}

export function useIsAkkaSwapModeActive(): [boolean, () => void, () => void, () => void] {
  const dispatch = useAppDispatch()
  const isAkkaSwapActive = useIsAkkaSwapActive()

  const toggleSetAkkaActive = useCallback(() => {
    dispatch(akkaSwapActive({ isAkkaSwapActive: !isAkkaSwapActive }))
  }, [isAkkaSwapActive, dispatch])

  const toggleSetAkkaActiveToFalse = useCallback(() => {
    dispatch(akkaSwapActive({ isAkkaSwapActive: false }))
  }, [isAkkaSwapActive, dispatch])

  const toggleSetAkkaActiveToTrue = useCallback(() => {
    dispatch(akkaSwapActive({ isAkkaSwapActive: true }))
  }, [isAkkaSwapActive, dispatch])

  return [isAkkaSwapActive, toggleSetAkkaActive, toggleSetAkkaActiveToFalse, toggleSetAkkaActiveToTrue]
}

export function useIsAkkaSwap(): boolean {
  return useSelector<AppState, AppState['global']['isAkkaSwap']>((state) => state.global.isAkkaSwap)
}

export function useIsAkkaSwapModeStatus(): [boolean, () => void, () => void, () => void] {
  const dispatch = useAppDispatch()
  const isAkkaSwapMode = useIsAkkaSwap()

  const toggleSetAkkaMode = useCallback(() => {
    dispatch(akkaSwapStatus({ isAkkaSwap: !isAkkaSwapMode }))
  }, [isAkkaSwapMode, dispatch])

  const toggleSetAkkaModeToFalse = useCallback(() => {
    dispatch(akkaSwapStatus({ isAkkaSwap: false }))
  }, [isAkkaSwapMode, dispatch])

  const toggleSetAkkaModeToTrue = useCallback(() => {
    dispatch(akkaSwapStatus({ isAkkaSwap: true }))
  }, [isAkkaSwapMode, dispatch])

  return [isAkkaSwapMode, toggleSetAkkaMode, toggleSetAkkaModeToFalse, toggleSetAkkaModeToTrue]
}

export function useIsAkkaContractSwapActive(): boolean {
  return useSelector<AppState, AppState['global']['isAkkaSwapContractActive']>((state) => state.global.isAkkaSwapContractActive)
}

export function useIsAkkaContractSwapModeActive(): [boolean, () => void, () => void, () => void] {
  const dispatch = useAppDispatch()
  const isAkkaContractSwapMode = useIsAkkaContractSwapActive()

  const toggleSetAkkaContractMode = useCallback(() => {
    dispatch(akkaSwapContractActive({ isAkkaSwapContractActive: !isAkkaContractSwapMode }))
  }, [isAkkaContractSwapMode, dispatch])

  const toggleSetAkkaContractModeToFalse = useCallback(() => {
    dispatch(akkaSwapContractActive({ isAkkaSwapContractActive: false }))
  }, [isAkkaContractSwapMode, dispatch])

  const toggleSetAkkaContractModeToTrue = useCallback(() => {
    dispatch(akkaSwapContractActive({ isAkkaSwapContractActive: true }))
  }, [isAkkaContractSwapMode, dispatch])

  return [isAkkaContractSwapMode, toggleSetAkkaContractMode, toggleSetAkkaContractModeToFalse, toggleSetAkkaContractModeToTrue]
}

