import React from 'react'
import { Flex } from 'rebass'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'

import { Type } from '../text/Text'
import Token from './Token'
import { Max, Amount, Input, Wrapper } from './swap.style'

import { LabelStatus } from '../../constants/constants'
import { useAppState, useError, useUpdateAllocation, useUpdateUserNotExist } from '../../state/application/hooks'
import { ErrorType } from '../../constants/constants'
import TokensList from './TokensList'
import { useAddAmount, useSwap } from '../../state/swap/hooks'
import { presaleToken, tokensPrice } from '../../constants/settings'
import calculateAmount from '../../utils/calculateAmount'
import { getMaxAllow } from '../../utils/getMaxAllow'
import allocations from '../../constants/allocations.json'
import useUsedAmount from '../../hook/useUsedAmount'

const AmountBox = (props) => {
  let { label, selectedToken, margin, amount, tokens } = props
  const { error, errorType, holderPublicTime, allocation, lock } = useAppState()
  const { updateAmountFrom, updateAmountTo, updateAmountType } = useAddAmount()
  const { setErrorInfo } = useError()
  const { account } = useWeb3React()
  const updateUserNotExist = useUpdateUserNotExist()
  const usedAmount = useUsedAmount()
  const swap = useSwap()
  const updateAllocation = useUpdateAllocation()

  const [maxAllocation, setMaxAllocation] = React.useState()

  // Max allocation
  React.useEffect(() => {
    const fetchMaxAllocation = async () => {
      const userAllocationAmount = allocations[account]
      if (userAllocationAmount) {
        updateUserNotExist(false)
        setMaxAllocation(userAllocationAmount)
      } else {
        updateUserNotExist(true)
        setMaxAllocation(0)
        updateAllocation(0)
      }
    }
    if (account) fetchMaxAllocation()
  }, [account])

  // Set allocation
  React.useEffect(() => {
    try {
      if (maxAllocation && usedAmount) {
        updateAllocation(new BigNumber(maxAllocation).minus(usedAmount).toFixed(3))
      }
    } catch (error) {
      console.log('Error happened in set allocation')
    }
  }, [usedAmount, maxAllocation])

  // handle Amount
  React.useEffect(() => {
    if (tokensPrice && swap.amountFrom > 0) {
      const value = swap.amountType === LabelStatus.FROM ? swap.amountFrom : swap.amountTo
      handleAmount(value, swap.amountType)
    }
  }, [swap.token, tokensPrice])

  const handleAmount = (value, label) => {
    try {
      if (lock) return
      updateAmountType(label)
      let token = tokensPrice[swap.token.symbol.toLowerCase()]
      let { valueFrom, valueTo } = calculateAmount(token, presaleToken, label, value)
      let max = getMaxAllow(token, valueFrom, allocation, holderPublicTime)
      setErrorInfo({
        error: parseFloat(valueFrom) > parseFloat(max) || parseFloat(valueFrom) > parseFloat(swap.token.balance),
        type: ErrorType.AMOUNT_INPUT,
      })
      updateAmountFrom(valueFrom)
      updateAmountTo(valueTo)
    } catch (error) {
      console.log('Error happend in handle Amount', error)
    }
  }

  const handleMax = (balance) => {
    if (balance) {
      try {
        let token = tokensPrice[swap.token.symbol.toLowerCase()]
        const max = getMaxAllow(token, balance, allocation, holderPublicTime)
        handleAmount(max, LabelStatus.FROM)
      } catch (error) {
        console.log('Error happened in handleMax', error)
      }
    }
  }

  return (
    <Wrapper margin={margin}>
      <Flex width="100%" justifyContent="space-between" alignItems="center">
        <Type.SM color="#313144" padding="5px 10px">
          {label}
        </Type.SM>

        <Flex justifyContent="flex-end" alignItems="center">
          <Type.SM color="#313144" margin="5px 8px">
            Balance:
            {` ${!isNaN(parseFloat(selectedToken.balance)) ? parseFloat(selectedToken.balance).toFixedDown(3) : ''} ${
              selectedToken?.symbol
            }`}
          </Type.SM>
          {label === LabelStatus.FROM && (
            <Max onClick={() => handleMax(selectedToken.balance)} cursor={lock ? 'default' : 'pointer'}>
              <Type.SM color="#FFFFFF" fontSize="10px" cursor={lock ? 'default' : 'pointer'}>
                Max
              </Type.SM>
            </Max>
          )}
        </Flex>
      </Flex>

      <Amount error={error && errorType === ErrorType.AMOUNT_INPUT && label === LabelStatus.FROM}>
        <Input
          value={amount}
          placeholder="Enter Amount"
          min={`0`}
          onChange={(e) => handleAmount(e.target.value, label)}
          disabled={lock}
        />
        {label === LabelStatus.FROM ? (
          <TokensList selectedToken={selectedToken} tokensList={tokens} />
        ) : (
          <Token logo={selectedToken.logo} name={selectedToken.name} />
        )}
      </Amount>
    </Wrapper>
  )
}

export default AmountBox
