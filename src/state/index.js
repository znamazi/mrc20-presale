import { mainToken, networks } from '../constants/settings'

export const initState = {
  account: '',
  chainId: '',
  network: 'NaN',
  approve: false,
  actionBtnType: 'select',
  data: networks,
  mainToken: mainToken,
  selectedChain: networks[0],
  selectedtoken: { ...networks[0].tokens[0], balance: '' },
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

    case 'UPDATE_INFO':
      newState = {
        ...state,
        data: action.payload.result,
        selectedtoken: action.payload.result[0].tokens[0],
        mainToken: {
          ...state.mainToken,
          balance: action.payload.mainTokenBalance
        }
      }
      break

    case 'UPDATE_SELECTED_CHAIN':
      newState = { ...state, selectedChain: action.payload }
      break

    default:
      throw new Error(`${action.type} is not defined in this state!`)
  }
  return newState
}
