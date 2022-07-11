import { useState, useEffect } from 'react'
import { MRC20Presale } from '../constants/contracts'
import { getContract } from '../utils/contractHelpers'

import { useSwap } from '../state/swap/hooks'
import { useWeb3React } from '@web3-react/core'
import { MRC20Presale_ABI } from '../constants/ABI'
import useWeb3 from './useWeb3'

const useClaimTime = () => {
  const [claimTime, setClaimTime] = useState()
  const { fetch } = useSwap()
  const { chainId } = useWeb3React()
  const web3 = useWeb3()

  useEffect(() => {
    const fetchClaimTime = async () => {
      if (!MRC20Presale[chainId]) {
        console.log(`there isn't presale contract in chainId = ${chainId}`)
        return
      }

      try {
        const contract = getContract(MRC20Presale_ABI, MRC20Presale[chainId], web3)
        const claimTime = await contract.methods.claimTime().call()
        setClaimTime(claimTime * 1000)
      } catch (error) {
        console.log('Error happend in fetchClaimTime', error)
      }
    }
    fetchClaimTime()
  }, [fetch, chainId])

  return claimTime
}

export default useClaimTime
