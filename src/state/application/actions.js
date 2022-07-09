import { createAction } from '@reduxjs/toolkit'

export const updateSearchQuery = createAction('UPDATE_SEARCH_QUERY')

export const setError = createAction('SET_ERROR')

export const removeError = createAction('REMOVE_ERROR')

export const updateLock = createAction('UPDATE_LOCK')

export const updateMuonLock = createAction('UPDATE_Muon_LOCK')
