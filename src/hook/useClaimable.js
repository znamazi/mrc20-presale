import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { useState, useEffect } from 'react'
import { MRC20Presale_ABI } from '../constants/ABI'
import { MRC20Presale } from '../constants/contracts'
import { getBalanceNumber } from '../helper/formatBalance'
import multicall from '../helper/multicall'
import useWeb3 from './useWeb3'

const useClaimable = (fetch) => {
  const { account, chainId } = useWeb3React()
  const [claim, setClaim] = useState(0)
  const web3 = useWeb3()

  useEffect(() => {
    const fetchClaim = async () => {
      const calls = [
        {
          address: MRC20Presale[chainId],
          name: 'tokenBalances',
          params: [account]
        },
        {
          address: MRC20Presale[chainId],
          name: 'tokenClaimed',
          params: [account]
        }
      ]
      const result = await multicall(web3, MRC20Presale_ABI, calls, chainId)
      if (result && result.length > 0) {
        let claim = new BigNumber(result[0]).minus(new BigNumber(result[1]))
        claim = getBalanceNumber(claim, 18)
        setClaim(claim)
      }
    }

    if (account && chainId && web3) fetchClaim()
  }, [account, chainId, web3, fetch])

  return claim
}

export default useClaimable
