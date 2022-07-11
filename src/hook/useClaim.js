import { useCallback } from 'react'
import useWeb3 from './useWeb3'
import { getContract } from '../utils/contractHelpers'
import { useAddTransaction } from '../state/transactions/hooks'
import { rpcConfig } from '../constants/chainsMap'
import { useWeb3React } from '@web3-react/core'
import { TransactionType } from '../constants/transactionStatus'
import { sendTransaction } from '../utils/sendTx'
import { presaleToken } from '../constants/settings'
import { MRC20Presale_ABI } from '../constants/ABI'
import { MRC20Presale } from '../constants/contracts'

const useClaim = () => {
  const { account, chainId } = useWeb3React()
  const addTransaction = useAddTransaction()
  const web3 = useWeb3()

  const doClaim = useCallback(
    async (claim) => {
      try {
        let info = {
          type: TransactionType.CLAIM,
          chainId,
          fromChain: rpcConfig[chainId].symbol,
          tokenSymbol: presaleToken.symbol,
          decimals: presaleToken.decimals,
          amount: claim,
        }

        const contract = getContract(MRC20Presale_ABI, MRC20Presale[chainId], web3)
        return sendTransaction(contract, 'claim', '', account, info, addTransaction)
      } catch (error) {
        console.log('error happened in useClaim', error)
      }
    },
    [account, addTransaction]
  )
  return doClaim
}

export default useClaim
