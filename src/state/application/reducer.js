import { createReducer } from '@reduxjs/toolkit'
import {
  setError,
  removeError,
  updateLock,
  updateMuonLock,
  updateUserNotExist,
  updateShowTimeLeft,
  updateAllocation,
} from './actions'

const initialState = {
  errorMessage: '',
  error: false,
  errorType: '',
  lock: '',
  lockType: '',
  publicTime: '',
  holderPublicTime: '',
  showTimeLeft: '',
  claimTime: '',
  allocation: 0,
  userNotExist: false,
}

export default createReducer(initialState, (builder) => {
  builder.addCase(setError, (state, action) => {
    return {
      ...state,
      error: action.payload.error,
      errorMessage: action.payload.message,
      errorType: action.payload.type,
    }
  })

  builder.addCase(removeError, (state) => {
    return { ...state, error: false, errorMessage: '', errorType: '' }
  })

  builder.addCase(updateLock, (state, action) => {
    return { ...state, lock: action.payload.lock, lockType: action.payload.lockType }
  })
  builder.addCase(updateMuonLock, (state, action) => {
    return {
      ...state,
      lock: action.payload.lock,
      lockType: action.payload.lockType,
      publicTime: action.payload.publicTime,
      holderPublicTime: action.payload.holderPublicTime,
      showTimeLeft: action.payload.showTimeLeft,
    }
  })

  builder.addCase(updateUserNotExist, (state, action) => {
    return { ...state, userNotExist: action.payload }
  })

  builder.addCase(updateShowTimeLeft, (state, action) => {
    return { ...state, showTimeLeft: action.payload }
  })

  builder.addCase(updateAllocation, (state, action) => {
    return { ...state, allocation: action.payload }
  })
})
