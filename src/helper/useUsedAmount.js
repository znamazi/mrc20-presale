import React from 'react'
import { BigNumber } from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { validChains } from '../constants/settings'
import { useCrossWeb3 } from './useWeb3'
import { getUsedAmount } from '../utils/utils'

export const useUsedAmount = () => {
  const { account } = useWeb3React()
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
        const amount = await getUsedAmount(account, chainId, crossWeb3[chainId])
        sumUsed = new BigNumber(amount).plus(sumUsed)
      }
      setUsed(sumUsed)
    }
    if (account) get()
  }, [account, validChains])

  return used
}
