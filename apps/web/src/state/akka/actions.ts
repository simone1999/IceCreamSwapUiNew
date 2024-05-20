import { createAction } from '@reduxjs/toolkit'

export const setAKKAStatus = createAction<{
  isAKKA: boolean
}>('swap/isAKKA')
