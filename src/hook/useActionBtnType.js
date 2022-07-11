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

    if (allowance === '0' && swap.chain && swap.token && !lock) action = ActionBtnType.APPROVE
    if (allowance !== '0' && swap.chain && swap.token && swap.amountFrom && swap.amountTo && !lock)
      action = ActionBtnType.DEPOSIT
    setActionBtnType(action)
  }, [swap, allowance, lock, swap.fetch])

  return actionBtnType
}

export default useActionBtnType
