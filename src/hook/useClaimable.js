import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { useState, useEffect } from 'react'
import { MRC20Presale_ABI } from '../constants/ABI'
import { MRC20Presale } from '../constants/contracts'
import { validChains } from '../constants/settings'
import multicall from '../utils/multicall'
import { useSwap } from '../state/swap/hooks'
import { fromWei } from '../utils/wei'
import useWeb3 from './useWeb3'

const useClaimable = () => {
  const { account, chainId } = useWeb3React()
  const [claim, setClaim] = useState(0)
  const web3 = useWeb3()
  const { fetch } = useSwap()

  useEffect(() => {
    const fetchClaim = async () => {
      const calls = [
        {
          address: MRC20Presale[chainId],
          name: 'tokenBalances',
          params: [account],
        },
        {
          address: MRC20Presale[chainId],
          name: 'tokenClaimed',
          params: [account],
        },
      ]
      const result = await multicall(web3, MRC20Presale_ABI, calls, chainId)
      if (result && result.length > 0) {
        let claim = new BigNumber(result[0]).minus(new BigNumber(result[1]))
        claim = fromWei(claim.toString(), 18)
        setClaim(claim)
      }
    }

    if (account && validChains[process.env.NEXT_PUBLIC_MODE].includes(chainId) && web3) fetchClaim()
  }, [account, chainId, web3, fetch])

  return claim
}

export default useClaimable
