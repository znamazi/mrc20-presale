import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { addAmountFrom, addAmountTo, addChain, addToken, fetchData } from './actions'

export function useSwap() {
  return useAppSelector((state) => state.swap)
}

export function useAddChain() {
  const dispatch = useAppDispatch()
  return useCallback(
    (chain) => {
      dispatch(addChain(chain))
    },
    [dispatch]
  )
}

export function useAddToken() {
  const dispatch = useAppDispatch()
  return useCallback(
    (token) => {
      dispatch(addToken(token))
    },
    [dispatch]
  )
}

export function useAddAmount() {
  const dispatch = useAppDispatch()
  const updateAmountFrom = useCallback(
    (amount) => {
      dispatch(addAmountFrom(amount))
    },
    [dispatch]
  )
  const updateAmountTo = useCallback(
    (amount) => {
      dispatch(addAmountTo(amount))
    },
    [dispatch]
  )

  return { updateAmountFrom, updateAmountTo }
}

export function useSetFetch() {
  const dispatch = useAppDispatch()
  return useCallback(
    (data) => {
      dispatch(fetchData(data))
    },
    [dispatch]
  )
}
