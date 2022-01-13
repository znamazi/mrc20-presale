import {
  TransactionStatus,
  TransactionType
} from '../constants/transactionStatus'

export const sendTx = (
  dispatch,
  contract,
  methodName,
  params,
  sendArguments,
  txInfo
) => {
  return new Promise((resolve, reject) => {
    try {
      let hash = null
      contract.methods[methodName](...params)
        .send(sendArguments)
        .once('transactionHash', (tx) => {
          hash = tx
          dispatch({
            type: 'UPDATE_TRANSACTION',
            payload: {
              type: TransactionType[methodName.toUpperCase()],
              hash,
              status: TransactionStatus.PENDING,
              message: ` ${
                TransactionType[methodName.toUpperCase()]
              } transaction is pending`,
              ...txInfo
            }
          })
        })

        .once('receipt', ({ transactionHash }) => {
          dispatch({
            type: 'UPDATE_TRANSACTION',
            payload: {
              type: TransactionType[methodName.toUpperCase()],
              hash: transactionHash,
              status: TransactionStatus.SUCCESS,
              message: 'Transaction successfull',
              ...txInfo
            }
          })
          resolve()
        })
        .once('error', (error) => {
          if (!hash) {
            dispatch({
              type: 'UPDATE_TRANSACTION',
              payload: {
                type: TransactionType[methodName.toUpperCase()],
                status: TransactionStatus.FAILED,
                message: 'Transaction rejected',
                ...txInfo
              }
            })
            return
          }

          dispatch({
            type: 'UPDATE_TRANSACTION',
            payload: {
              type: TransactionType[methodName.toUpperCase()],
              hash,
              status: TransactionStatus.FAILED,
              message: 'Transaction failed',
              ...txInfo
            }
          })
          reject()
        })
    } catch (error) {
      console.log('error happend in send Transaction', error)
    }
  })
}

export default sendTx
