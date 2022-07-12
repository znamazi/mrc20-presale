import { createAction } from '@reduxjs/toolkit'

export const addChain = createAction('ADD_CHAIN')
export const addToken = createAction('ADD_TOKEN')
export const addAmountFrom = createAction('ADD_AMOUNT_FROM')
export const addAmountTo = createAction('ADD_AMOUNT_TO')
export const addAmountType = createAction('ADD_AMOUNT_TYPE')
export const fetchData = createAction('FETCH_DATA')
