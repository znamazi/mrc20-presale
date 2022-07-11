import React, { useState } from 'react'
import { Flex } from 'rebass'
import ActionButton from '../actionButton/ActionButton'
import Claim from '../claim/Claim'
import { Container, Wrapper } from '../container/Container'
import { Type } from '../text/Text'
import Transaction from '../transaction/Transaction'
import MuonNetwork from '../common/MuonNetwork'
import { useTx } from '../../state/transactions/hooks'
import Swap from '../Swap'
import { SoldOut } from '../Swap/swap.style'
import useLeftTokens from '../../hook/useLeftTokens'
import { useMuonLock } from '../../hook/useMuonLock'
import { useAppState, useError, useUpdateLock, useUpdateUserNotExist } from '../../state/application/hooks'
import UserNotExistComponent from './UserNotExist'
import useAllowance from '../../hook/useAllowance'
import { useSetFetch, useSwap } from '../../state/swap/hooks'
import { ERC20_ABI } from '../../constants/ABI'
import { MRC20Presale } from '../../constants/contracts'
import { useWeb3React } from '@web3-react/core'
import { TransactionStatus, TransactionType } from '../../constants/transactionStatus'
import useApprove from '../../hook/useApprove'
import useDeposit from '../../hook/useDeposit'
import useClaimable from '../../hook/useClaimable'
import { ActionBtnType, ErrorType, LockType } from '../../constants/constants'
import useClaimTime from '../../hook/useClaimTime'

const MRC20PresaleComponent = () => {
  useMuonLock()
  const claim = useClaimable()
  const claimTime = useClaimTime()

  const tx = useTx()
  const swap = useSwap()
  const { account, chainId } = useWeb3React()
  const { setErrorInfo, removeErrorInfo } = useError()
  const [loading, setLoading] = useState(false)
  const allowance = useAllowance(
    swap.chain?.id,
    swap.token?.address,
    MRC20Presale[swap.chain?.id],
    ERC20_ABI,
    swap.fetch
  )
  const leftTokens = useLeftTokens()
  const { lock, publicTime, userNotExist, error, errorType, lockType } = useAppState()
  const updateUserNotExist = useUpdateUserNotExist()
  const updateLock = useUpdateLock()
  const updateFetchData = useSetFetch()
  const setApprove = useApprove()
  const deposit = useDeposit()
  let showLock =
    lock && Date.now() < publicTime ? (
      <UserNotExistComponent
        open={userNotExist}
        lock={lock}
        hide={() => {
          updateUserNotExist(!userNotExist)
        }}
        setLock={() => updateLock({ lock: 0 })}
      />
    ) : (
      ''
    )

  const handleApprove = () => {
    try {
      if (!account || allowance !== '0') return
      if (!chainId) return
      if (swap.chain.id !== chainId) return
      if (tx.type === TransactionType.APPROVE && tx.status === TransactionStatus.PENDING) return
      let info = {
        type: TransactionType.APPROVE,
        chainId: swap.chain?.id,
        fromChain: swap.chain?.symbol,
        tokenSymbol: swap.token?.symbol,
      }

      setApprove(info, swap.token.address, MRC20Presale[swap.chain?.id], ERC20_ABI).then(() =>
        updateFetchData(ActionBtnType.APPROVE)
      )
    } catch (error) {
      console.log('error happend in approve', error)
    }
  }

  const handleDeposit = () => {
    //show modal if user don't have any allocation
    if (lock && lockType === LockType.Allocation) {
      updateUserNotExist(true)
      return
    }
    if (lock) return

    try {
      removeErrorInfo()
      if (!account) return
      if (!chainId) return
      if (tx.type === TransactionType.DEPOSIT && tx.status === TransactionStatus.PENDING) return
      if (swap.chain.id !== chainId) return
      if (
        parseFloat(swap.amountFrom) <= 0 ||
        swap.amountFrom === '0' ||
        swap.amountFrom === '' ||
        parseFloat(swap.amountFrom) > parseFloat(swap.token.balance)
      ) {
        setErrorInfo({ message: 'Wrong Amount', type: ErrorType.AMOUNT_INPUT, error: true })

        return
      }
      if (error && errorType) {
        return
      }
      setLoading(true)
      deposit()
        .then(() => {
          updateFetchData(Date.now())
          setLoading(false)
        })
        .catch(() => {
          updateFetchData(Date.now())
          setLoading(false)
        })
    } catch (error) {
      console.log('error happend in deposit', error)
    }
  }
  return (
    <>
      {leftTokens < 10 && (
        <SoldOut>
          <Type.XXXL color="#5551FF" fontSize="100px" fontWeight="bold" fontSizeXS="65px">
            SOLD OUT!
          </Type.XXXL>
        </SoldOut>
      )}
      <Container>
        <Wrapper maxWidth="300px" width="100%"></Wrapper>
        <Wrapper maxWidth="470px" width="100%">
          <Swap leftTokens={leftTokens} />
          <ActionButton
            leftTokens={leftTokens}
            allowance={allowance}
            handleApprove={handleApprove}
            handleDeposit={handleDeposit}
            loading={loading}
          />

          <Flex justifyContent="center" margin="50px 0 20px">
            <Type.SM color="#313144" fontSize="10px" padding="10px">
              Powered by
            </Type.SM>
            <MuonNetwork logo="muonNetworkBlack" />
          </Flex>
        </Wrapper>
        <Wrapper maxWidth="300px" width="100%">
          {tx.status && <Transaction />}
          {claim > 0 && claimTime && <Claim amountClaim={claim} claimTime={claimTime} />}
        </Wrapper>
      </Container>
      {showLock}
    </>
  )
}

export default MRC20PresaleComponent
