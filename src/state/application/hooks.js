import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { setError, removeError, updateLock, updateMuonLock, updateUserNotExist } from './actions'

export function useAppState() {
  return useAppSelector((state) => state.application)
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

export function useUpdateMuonLock() {
  const dispatch = useAppDispatch()
  return useCallback(
    (lockInfo) => {
      dispatch(updateMuonLock(lockInfo))
    },
    [dispatch]
  )
}

export function useUpdateUserNotExist() {
  const dispatch = useAppDispatch()
  return useCallback(
    (cond) => {
      dispatch(updateUserNotExist(cond))
    },
    [dispatch]
  )
}
