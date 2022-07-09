import { configureStore } from '@reduxjs/toolkit'

import application from './application/reducer'
import transactions from './transactions/reducer'
import swap from './swap/reducer'

export const store = configureStore({
  reducer: {
    application,
    transactions,
    swap,
  },
})
