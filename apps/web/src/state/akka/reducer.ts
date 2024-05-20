import { createReducer } from '@reduxjs/toolkit'
import { atomWithReducer } from 'jotai/utils'
import { setAKKAStatus } from './actions'

export interface SwapState {
  readonly isAKKA: boolean
}

const initialState: SwapState = {
  isAKKA: false,
}

const reducer = createReducer<SwapState>(initialState, (builder) =>
  builder.addCase(setAKKAStatus, (state, { payload: { isAKKA } }) => {
    state.isAKKA = isAKKA
  }),
)

export const akkaReducerAtom = atomWithReducer(initialState, reducer)
