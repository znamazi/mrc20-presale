import BigNumber from 'bignumber.js'
import { useState, useEffect } from 'react'
import { MRC20Presale } from '../constants/contracts'
import { IDO_PARTICIPANT_TOKENS } from '../constants/settings'
import { getWeb3NoAccount } from '../helper/web3'
import { fromWei, getTotalTokenBalance } from '../utils/utils'

const useTokenLeft = (fetch) => {
  const [tokenLeft, setTokenLeft] = useState()
  useEffect(() => {
    const fetchTotalTokenBalance = async () => {
      let totalTokenBalance = {}
      try {
        for (let index = 0; index < Object.keys(MRC20Presale).length; index++) {
          const chainId = Object.keys(MRC20Presale)[index]
          const web3 = getWeb3NoAccount(chainId)
          let purchase = await getTotalTokenBalance(chainId, web3)

          totalTokenBalance = {
            ...totalTokenBalance,
            [chainId]: parseFloat(fromWei(purchase))
          }
        }
        let sum = Object.keys(totalTokenBalance).reduce(
          (sum, chain) => sum + totalTokenBalance[chain],
          0
        )
        let tokenLeft = IDO_PARTICIPANT_TOKENS - sum

        setTokenLeft(tokenLeft)
      } catch (error) {
        console.log('Error happend in tokenLeft', error)
      }
    }
    fetchTotalTokenBalance()
  }, [fetch])
  return tokenLeft
}

export default useTokenLeft
