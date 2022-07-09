import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { updateSearchQuery, setError, removeError, updateLock } from './actions'

export function useAppState() {
  return useAppSelector((state) => state.application)
}

export function useChangeSearchQuery() {
  const dispatch = useAppDispatch()
  return useCallback(
    (query) => {
      dispatch(updateSearchQuery(query))
    },
    [dispatch]
  )
}
export function useError() {
  const dispatch = useAppDispatch()

  const setErrorInfo = useCallback((data) => {
    dispatch(setError(data))
  })

  const removeErrorInfo = useCallback(() => {
    dispatch(removeError())
  })

  return { setErrorInfo, removeErrorInfo }
}

export function useUpdateLock() {
  const dispatch = useAppDispatch()
  return useCallback(
    (lockInfo) => {
      dispatch(updateLock(lockInfo))
    },
    [dispatch]
  )
}
