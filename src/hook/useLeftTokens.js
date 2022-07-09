import { useState, useEffect } from 'react'
import { MRC20Presale } from '../constants/contracts'
import { IDO_PARTICIPANT_TOKENS } from '../constants/settings'
import { getWeb3NoAccount } from '../utils/web3'
import { useSwap } from '../state/swap/hooks'
import { fromWei, getTotalTokenBalance } from '../utils/utils'
import { useUpdateLock } from '../state/application/hooks'
import { LockType } from '../constants/constants'

const useLeftTokens = () => {
  const [leftTokens, setLeftTokens] = useState()
  const { fetch } = useSwap()
  const updateLock = useUpdateLock()

  useEffect(() => {
    // TODO await outside of for
    const fetchTotalTokenBalance = async () => {
      let totalTokenBalance = {}
      try {
        for (let index = 0; index < Object.keys(MRC20Presale).length; index++) {
          const chainId = Object.keys(MRC20Presale)[index]
          const web3 = getWeb3NoAccount(chainId)
          let purchase = await getTotalTokenBalance(chainId, web3)
          console.log({ purchase })
          totalTokenBalance = {
            ...totalTokenBalance,
            [chainId]: parseFloat(fromWei(purchase)),
          }
        }
        let sum = Object.keys(totalTokenBalance).reduce((sum, chain) => sum + totalTokenBalance[chain], 0)
        let leftTokens = IDO_PARTICIPANT_TOKENS - sum
        console.log('leftTokens', leftTokens)
        setLeftTokens(leftTokens)
      } catch (error) {
        console.log('Error happend in leftTokens', error)
      }
    }
    fetchTotalTokenBalance()
  }, [fetch])
  if (leftTokens < 10) {
    updateLock({ lock: true, lockType: LockType.SOLD_OUT })
  }
  return leftTokens
}

export default useLeftTokens
