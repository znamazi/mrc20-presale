import { networks } from '../constants/settings'

export const initState = {
  account: '',
  chainId: '',
  network: 'NaN',
  approve: false,
  actionBtnType: 'select',
  selectedChain: networks[0],
  tokenSearchQuery: '',
  amount: { pay: '', receive: '' },
  transaction: {
    type: '',
    message: '',
    status: '',
    icon: '',
    fromChain: '',
    toChain: ''
  }
}

export const reducer = (state, action) => {
  let newState
  switch (action.type) {
    case 'UPDATE_NETWORK_INFO':
      newState = {
        ...state,
        account: action.payload.account,
        chainId: action.payload.chainId,
        network: action.payload.network
      }
      break
    case 'UPDATE_TOKEN_SEARCH_QUERY':
      newState = {
        ...state,
        tokenSearchQuery: action.payload
      }
      break
    case 'UPDATE_SELECTED_CHAIN':
      newState = { ...state, selectedChain: action.payload }
      break
    default:
      throw new Error(`${action.type} is not defined in this state!`)
      break
  }
  return newState
}
