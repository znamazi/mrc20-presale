import React from 'react'
import { BigNumber } from 'bignumber.js'
import { validChains } from '../constants/settings'
import { getUsedAmount } from '../utils/utils'
import { getWeb3NoAccount } from '../utils/web3'
import { useWeb3React } from '@web3-react/core'
import { useSwap } from '../state/swap/hooks'

const useUsedAmount = () => {
  const { account, chainId } = useWeb3React()
  const { fetch } = useSwap()
  const [used, setUsed] = React.useState(null)

  React.useEffect(() => {
    const get = async () => {
      let sumUsed = 0

      for (let index = 0; index < validChains[process.env.NEXT_PUBLIC_MODE].length; index++) {
        const chainId = validChains[process.env.NEXT_PUBLIC_MODE][index]
        const web3 = getWeb3NoAccount(chainId)

        const amount = await getUsedAmount(account, chainId, web3)
        console.log({ amount })
        sumUsed = new BigNumber(amount).plus(sumUsed)
      }
      setUsed(sumUsed)
    }
    if (account && validChains[process.env.NEXT_PUBLIC_MODE].includes(chainId)) get()
  }, [account, validChains[process.env.NEXT_PUBLIC_MODE], chainId, fetch])

  return used
}

export default useUsedAmount
