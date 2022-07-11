import { useWeb3React } from '@web3-react/core'
import { useCallback } from 'react'
import { MRC20Presale_ABI } from '../constants/ABI'
import { MRC20Presale } from '../constants/contracts'
import { MAIN_TOKEN_ADDRESS } from '../constants/tokens'
import { TransactionStatus, TransactionType } from '../constants/transactionStatus'
import { useUpdateLock } from '../state/application/hooks'
import { useSetFetch, useSwap } from '../state/swap/hooks'
import { useAddTransaction } from '../state/transactions/hooks'
import { getContract } from '../utils/contractHelpers'
import { sendTransaction } from '../utils/sendTx'
import { signMsg } from '../utils/signMsg'
import { toWei } from '../utils/wei'
import useWeb3 from './useWeb3'
import MuonResponse from '../utils/MuonResponse'

const useDeposit = () => {
  const swap = useSwap()
  const web3 = useWeb3()
  const { account, chainId } = useWeb3React()
  const addTransaction = useAddTransaction()
  const updateLock = useUpdateLock()
  const updateFetchData = useSetFetch()

  try {
    const contract = getContract(MRC20Presale_ABI, MRC20Presale[chainId], web3)
    let info = {
      type: TransactionType.DEPOSIT,
      chainId: swap.chain?.id,
      fromChain: swap.chain?.symbol,
      tokenSymbol: swap.token?.symbol,
      amount: swap.amountFrom,
    }
    const deposit = useCallback(async () => {
      try {
        if (!contract) {
          console.error('contract is null')
          return
        }

        const sign = await signMsg(account, web3)
        if (!sign) {
          addTransaction({
            message: 'Failed to sign',
            status: TransactionStatus.FAILED,
            ...info,
          })
          return
        }

        let fixedValue = Number(swap.amountFrom).toFixedDown(swap.token.decimals).toString()

        const muonResponse = await MuonResponse('fear_presale', 'deposit', {
          hashTimestamp: true,
          forAddress: account,
          token: swap.token.symbol,
          chainId: swap.chain.id,
          sign,
          amount: toWei(fixedValue, swap.token.decimals),
        })
        if (!muonResponse.confirmed) {
          addTransaction({
            message: muonResponse.errorMessage,
            status: TransactionStatus.FAILED,
            ...info,
          })
          if (muonResponse.error.lockTime) {
            updateLock({ lock: muonResponse.error.expireAt })
          } else {
            updateFetchData(Date.now())
          }
          return
        }

        let {
          sigs,
          reqId,
          data: {
            result: { extraParameters, token, presaleTokenPrice, forAddress },
          },
        } = muonResponse
        let payableValue = null
        if (swap.token.address === MAIN_TOKEN_ADDRESS) {
          payableValue = extraParameters[3]
        }
        return sendTransaction(
          contract,
          'deposit',
          [token, presaleTokenPrice, forAddress, extraParameters, reqId, sigs],
          account,
          info,
          addTransaction,
          payableValue
        )
      } catch (error) {
        console.log('Error happend in deposit call back', error)
      }
    }, [contract, account, chainId])
    return deposit
  } catch (error) {
    console.log('error happened in Deposit', error)
  }
}

export default useDeposit
