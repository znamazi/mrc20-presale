import React from 'react'
import { BigNumber } from 'bignumber.js'
import { validChains } from '../constants/settings'
import { useCrossWeb3 } from './useWeb3'
import { getUsedAmount } from '../utils/utils'
import { useMuonState } from '../context'

export const useUsedAmount = () => {
  const { state } = useMuonState()
  let crossWeb3 = {}
  for (let index = 0; index < validChains.length; index++) {
    const chainId = validChains[index]
    const web3 = useCrossWeb3(chainId)
    crossWeb3 = { ...crossWeb3, [chainId]: web3 }
  }

  const [used, setUsed] = React.useState(null)
  React.useEffect(() => {
    const get = async () => {
      let sumUsed = 0
      for (let index = 0; index < validChains.length; index++) {
        const chainId = validChains[index]
        const amount = await getUsedAmount(
          state.account,
          chainId,
          crossWeb3[chainId]
        )
        sumUsed = new BigNumber(amount).plus(sumUsed)
      }
      setUsed(sumUsed)
    }
    if (state.account && validChains.includes(state.chainId)) get()
  }, [state.account, validChains, state.chainId])

  return used
}
