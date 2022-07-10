import { createReducer } from '@reduxjs/toolkit'
import { addChain, addAmountFrom, addAmountTo, fetchData, addToken } from './actions'
import { validChains, tokens } from '../../constants/settings'
import { NameChainMap, rpcConfig } from '../../constants/chainsMap'

const initialState = {
  chain: {
    id: validChains[process.env.NEXT_PUBLIC_MODE][0],
    name: NameChainMap[validChains[process.env.NEXT_PUBLIC_MODE][0]],
    symbol: rpcConfig[validChains[process.env.NEXT_PUBLIC_MODE][0]].symbol,
  },
  token: tokens.find((item) => item.chainId === validChains[process.env.NEXT_PUBLIC_MODE][0]),
  amountFrom: '',
  amountTo: '',
  fetch: null,
}

export default createReducer(initialState, (builder) => {
  // add  chain
  builder.addCase(addChain, (state, action) => {
    return { ...state, chain: action.payload }
  })

  // add  Token
  builder.addCase(addToken, (state, action) => {
    return { ...state, token: action.payload }
  })
  //   add amount From
  builder.addCase(addAmountFrom, (state, action) => {
    return { ...state, amountFrom: action.payload }
  })

  //   add amount From
  builder.addCase(addAmountTo, (state, action) => {
    return { ...state, amountTo: action.payload }
  })

  // update fetch
  builder.addCase(fetchData, (state, action) => {
    return { ...state, fetch: action.payload }
  })
})
