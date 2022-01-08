import React from 'react'
import { useWeb3React } from '@web3-react/core'
import {
  LockType,
  TransactionStatus,
  TransactionType
} from '../../constants/transactionStatus'
import { useMuonState } from '../../context'
import { Button, ImageSpin } from '../common/FormControlls'
import { Type } from '../common/Text'
import { addRPC } from '../../helper/addRPC'
import { NameChainMap } from '../../constants/chainsMap'
import { Flex } from 'rebass'
import CountDown from '../common/CountDown'
import moment from 'moment'

const ActionButton = (props) => {
  const { state } = useMuonState()
  const {
    wrongNetwork,
    handleConnectWallet,
    handleSwap,
    handleApprove,
    disable,
    loading,
    setLock,
    lockType
  } = props
  let content = ''
  const { chainId, account } = useWeb3React()

  let validChainId = null
  if (state.selectedChain.id !== chainId) validChainId = state.selectedChain.id

  switch (state.actionBtnType) {
    case 'approve':
      let approveStatus =
        state.transaction.status === TransactionStatus.PENDING &&
        state.transaction.type === TransactionType.Approve
      content = (
        <Button
          margin="25px 0 0"
          background="#5F5CFE"
          onClick={handleApprove}
          background={
            disable ? '#9d9d9d' : approveStatus ? '#B4B3FD' : '#5F5CFE'
          }
          border={approveStatus ? '1px solid #5F5CFE' : 'transparent'}
          cursor={approveStatus || disable ? 'default' : 'pointer'}
          disabled={disable}
        >
          <Type.MD
            color={approveStatus ? '#313144' : '#ffffff'}
            fontSizeXS="16px"
            fontWeight="bold"
          >
            {approveStatus ? 'Approving ...' : 'Approve'}
          </Type.MD>
        </Button>
      )
      break
    case 'swap':
      let swapStatus =
        state.transaction.status === TransactionStatus.PENDING &&
        state.transaction.type === TransactionType.SWAP
      content = (
        <Button
          margin="25px 0 0"
          background={
            disable
              ? lockType === LockType.Cooldown
                ? '#FFB800'
                : '#9d9d9d'
              : swapStatus
              ? '#B4B3FD'
              : '#5F5CFE'
          }
          border={swapStatus ? '1px solid #5F5CFE' : 'transparent'}
          onClick={handleSwap}
          cursor={swapStatus || disable ? 'default' : 'pointer'}
          // disabled={disable} //now we show popup
        >
          <Flex justifyContent="center" alignItems="center">
            {disable ? (
              <>
                <Type.MD
                  color={swapStatus ? '#313144' : '#ffffff'}
                  fontSizeXS="16px"
                  fontWeight="bold"
                >
                  {lockType === LockType.Cooldown
                    ? 'Cooldown, next swap in'
                    : 'Swap available in'}
                </Type.MD>
                <Type.MD
                  ml="5px"
                  color={'#ffffff'}
                  fontSizeXS="16px"
                  fontWeight="bold"
                >
                  <CountDown date={moment(disable)} setLock={setLock} />
                </Type.MD>
              </>
            ) : (
              <Type.MD
                color={swapStatus ? '#313144' : '#ffffff'}
                fontSizeXS="16px"
                fontWeight="bold"
              >
                {swapStatus
                  ? 'Swapping ...'
                  : loading
                  ? 'Getting Signatures'
                  : 'Swap'}
              </Type.MD>
            )}
            {loading && (
              <ImageSpin src="/media/common/loading.svg" alt="loading" />
            )}
          </Flex>
        </Button>
      )
      break
    case 'select':
      content = (
        <Button margin="25px 0 0" cursor="default">
          <Type.MD
            color="#909090"
            fontSizeXS="16px"
            fontSizeXXS="14px"
            fontWeight="bold"
          >
            Enter amount
          </Type.MD>
        </Button>
      )
      break

    default:
      break
  }

  return (
    <>
      {account ? (
        wrongNetwork || validChainId ? (
          <Button
            margin="50px 0 0"
            background={'rgba(255, 164, 81, 0.2)'}
            border="1px solid rgba(255, 164, 81, 1)"
            onClick={() => addRPC(validChainId)}
          >
            <Type.MD
              color={'rgba(49, 49, 68, 1)'}
              fontSizeXS="16px"
              fontWeight="bold"
            >
              {` Switch to ${NameChainMap[validChainId]}`}
            </Type.MD>
          </Button>
        ) : (
          content
        )
      ) : (
        <Button
          margin="25px 0 0"
          background="#5F5CFE"
          onClick={handleConnectWallet}
        >
          <Type.MD color="#ffffff" fontSizeXS="16px" fontWeight="bold">
            Connect Wallet
          </Type.MD>
        </Button>
      )}
    </>
  )
}

export default ActionButton
