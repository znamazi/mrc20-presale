import { useWeb3React } from '@web3-react/core'
import { useState, useEffect } from 'react'
import { MAIN_TOKEN_ADDRESS } from '../constants/tokens'
import { getContract } from '../utils/contractHelpers'
import useWeb3 from './useWeb3'

const useAllowance = (chain, contractAddress, spender, abi, fetch) => {
  const [allowance, setAllowance] = useState('0')
  const { account, chainId } = useWeb3React()
  const web3 = useWeb3()

  useEffect(() => {
    const fetchAllowance = async () => {
      try {
        if (chain !== chainId) return
        let allowance = ''

        if (contractAddress == MAIN_TOKEN_ADDRESS) {
          allowance = true
        } else {
          const contract = getContract(abi, contractAddress, web3)
          allowance = await contract.methods.allowance(account, spender).call()
        }

        setAllowance(allowance)
      } catch (error) {
        console.log('error happend in fetch Allowance', error)
      }
    }
    if (contractAddress && spender && chainId && account && web3) fetchAllowance()
  }, [contractAddress, spender, chainId, account, web3, fetch, chain])
  return allowance
}

export default useAllowance
