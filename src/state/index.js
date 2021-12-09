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
  selectedToken: { ...networks[0].tokens[0], balance: '' },
  tokenSearchQuery: '',
  amount: { from: '', to: '' },
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
  console.log(action)
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
        selectedToken: action.payload.selectedToken,
        mainToken: {
          ...state.mainToken,
          balance: action.payload.mainTokenBalance
        }
      }
      break

    case 'UPDATE_SELECTED_CHAIN':
      newState = {
        ...state,
        selectedChain: action.payload.chain,
        selectedToken: action.payload.selectedToken
      }
      break

    case 'UPDATE_SELECTED_Token':
      newState = { ...state, selectedToken: action.payload }
      break

    case 'UPDATE_AMOUNT':
      newState = {
        ...state,
        amount: action.payload.amount,
        actionBtnType: action.payload.btnType
      }
      break

    case 'UPDATE_APPROVE':
      newState = {
        ...state,
        approve: action.payload,
        actionBtnType: action.payload ? 'deposit' : 'approve'
      }
      break

    default:
      throw new Error(`${action.type} is not defined in this state!`)
  }
  return newState
}
