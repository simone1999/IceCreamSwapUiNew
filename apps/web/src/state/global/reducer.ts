/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit'
import { ChainId } from '@pancakeswap/sdk'
import {
  toggleFarmTransactionModal,
  pickFarmTransactionTx,
  akkaSwapStatus,
  akkaSwapActive,
  akkaSwapContractActive,
} from './actions'

export interface GlobalState {
  isAkkaSwap: boolean
  isAkkaSwapActive: boolean
  isAkkaSwapContractActive: boolean
  showFarmTransactionModal: boolean
  pickedFarmTransactionModalTx: {
    tx: string
    chainId: ChainId
  }
}

export const initialState: GlobalState = {
  isAkkaSwap: false,
  isAkkaSwapActive: true,
  isAkkaSwapContractActive: false,
  showFarmTransactionModal: false,
  pickedFarmTransactionModalTx: {
    tx: '',
    chainId: ChainId.CORE,
  },
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(toggleFarmTransactionModal, (state, { payload: { showModal } }) => {
      state.showFarmTransactionModal = showModal
    })
    .addCase(akkaSwapStatus, (state, { payload: { isAkkaSwap } }) => {
      state.isAkkaSwap = isAkkaSwap
    })
    .addCase(akkaSwapActive, (state, { payload: { isAkkaSwapActive } }) => {
      state.isAkkaSwapActive = isAkkaSwapActive
    })
    .addCase(akkaSwapContractActive, (state, { payload: { isAkkaSwapContractActive } }) => {
      state.isAkkaSwapContractActive = isAkkaSwapContractActive
    })
    .addCase(pickFarmTransactionTx, (state, { payload: { tx, chainId } }) => {
      state.pickedFarmTransactionModalTx = { tx, chainId }
      state.showFarmTransactionModal = true
    }),
)
