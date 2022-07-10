import { createAction } from '@reduxjs/toolkit'

export const setError = createAction('SET_ERROR')

export const removeError = createAction('REMOVE_ERROR')

export const updateLock = createAction('UPDATE_LOCK')

export const updateMuonLock = createAction('UPDATE_Muon_LOCK')
export const updateUserNotExist = createAction('UPDATE_USER_NOT_EXIST')

export const updateShowTimeLeft = createAction('UPDATE_SHOW_TIME_LEFT')
export const updateAllocation = createAction('UPDATE_ALLOCATION')
