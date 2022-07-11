import { useState, useEffect } from 'react'
import { TransactionStatus, TransactionType } from '../constants/transactionStatus'
import { useTx } from '../state/transactions/hooks'

const useActionBtnStatus = () => {
  const [actionBtnStatus, setActionBtnStatus] = useState({ approve: false, deposit: false })
  const tx = useTx()

  useEffect(() => {
    let approve = tx.status === TransactionStatus.PENDING && tx.type === TransactionType.APPROVE
    let deposit = tx.status === TransactionStatus.PENDING && tx.type === TransactionType.DEPOSIT
    setActionBtnStatus({ approve, deposit })
  }, [tx])

  return actionBtnStatus
}

export default useActionBtnStatus
