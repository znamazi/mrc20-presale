import { useState, useEffect } from 'react'
import { ActionBtnType } from '../constants/constants'
import { useSwap } from '../state/swap/hooks'

const useActionBtnType = (allowance, lock, leftTokens) => {
  const [actionBtnType, setActionBtnType] = useState(ActionBtnType.SELECT)
  const swap = useSwap()
  useEffect(() => {
    let action = ActionBtnType.SELECT
    if (lock) action = ActionBtnType.LOCK
    if (leftTokens < 10) action = ActionBtnType.SOLD_OUT

    if (allowance === '0' && swap.chain && swap.token) action = ActionBtnType.APPROVE
    if (allowance !== '0' && swap.chain && swap.token && swap.amountFrom && swap.amountTo)
      action = ActionBtnType.DEPOSIT
    setActionBtnType(action)
  }, [swap, allowance])

  return actionBtnType
}

export default useActionBtnType
