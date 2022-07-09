import React from 'react'
import { BigNumber } from 'bignumber.js'
import { validChains } from '../constants/settings'
import { getUsedAmount } from '../utils/utils'
import { getWeb3NoAccount } from '../helper/web3'
import { useWeb3React } from '@web3-react/core'

export const useUsedAmount = (fetch) => {
  const { account, chainId } = useWeb3React()
  const [used, setUsed] = React.useState(null)

  React.useEffect(() => {
    const get = async () => {
      let sumUsed = 0

      for (let index = 0; index < validChains.length; index++) {
        const chainId = validChains[index]
        const web3 = getWeb3NoAccount(chainId)

        const amount = await getUsedAmount(account, chainId, web3)
        sumUsed = new BigNumber(amount).plus(sumUsed)
      }
      setUsed(sumUsed)
    }
    if (account && validChains.includes(chainId)) get()
  }, [account, validChains, chainId, fetch])

  return used
}
