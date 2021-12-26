import React from 'react'
import { useWeb3React } from '@web3-react/core'
import {
  TransactionStatus,
  TransactionType
} from '../../constants/transactionStatus'
import { useMuonState } from '../../context'
import { Button, ImageSpin } from '../common/FormControlls'
import { Type } from '../common/Text'
import { addRPC } from '../../helper/addRPC'
import { NameChainMap } from '../../constants/chainsMap'
import { Flex } from 'rebass'

const ActionButton = (props) => {
  const { state } = useMuonState()
  const {
    wrongNetwork,
    handleConnectWallet,
    handleSwap,
    handleApprove,
    disable,
    loading
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
          margin="50px 0 0"
          background="#5F5CFE"
          onClick={handleApprove}
          background={approveStatus ? '#B4B3FD' : '#5F5CFE'}
          border={approveStatus ? '1px solid #5F5CFE' : 'transparent'}
          cursor={approveStatus ? 'default' : 'pointer'}
        >
          <Type.LG
            color={approveStatus ? '#313144' : '#ffffff'}
            fontFamily="FH Oscar"
            fontSizeXS="16px"
            cursor={approveStatus ? 'default' : 'pointer'}
          >
            {approveStatus ? 'Approving ...' : 'Approve'}
          </Type.LG>
        </Button>
      )
      break
    case 'swap':
      let swapStatus =
        state.transaction.status === TransactionStatus.PENDING &&
        state.transaction.type === TransactionType.SWAP
      content = (
        <Button
          margin="50px 0 0"
          background={disable ? '#9d9d9d' : swapStatus ? '#B4B3FD' : '#5F5CFE'}
          border={swapStatus ? '1px solid #5F5CFE' : 'transparent'}
          onClick={handleSwap}
          cursor={swapStatus || disable ? 'default' : 'pointer'}
          disabled={disable}
        >
          <Flex justifyContent="center" alignItems="center">
            <Type.LG
              color={swapStatus ? '#313144' : '#ffffff'}
              fontFamily="FH Oscar"
              fontSizeXS="16px"
            >
              {swapStatus ? 'Swaping ...' : 'Swap Asset'}
            </Type.LG>
            {loading && (
              <ImageSpin src="/media/common/loading.svg" alt="loading" />
            )}
          </Flex>
        </Button>
      )
      break
    case 'select':
      content = (
        <Button margin="50px 0 0" cursor="default">
          <Type.LG
            color="#909090"
            fontFamily="FH Oscar"
            fontSizeXS="16px"
            fontSizeXXS="14px"
          >
            Enter amount
          </Type.LG>
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
            background="rgba(255, 164, 81, 0.2)"
            border="1px solid rgba(255, 164, 81, 1)"
            cursor="default"
            onClick={() => (wrongNetwork ? undefined : addRPC(validChainId))}
          >
            <Type.LG
              color="rgba(49, 49, 68, 1)"
              fontFamily="FH Oscar"
              fontSizeXS="16px"
            >
              {wrongNetwork
                ? 'Wrong Network'
                : ` Switch to ${NameChainMap[validChainId]}`}
            </Type.LG>
          </Button>
        ) : (
          content
        )
      ) : (
        <Button
          margin="50px 0 0"
          background="#5F5CFE"
          onClick={handleConnectWallet}
        >
          <Type.LG color="#ffffff" fontFamily="FH Oscar" fontSizeXS="16px">
            Connect Wallet
          </Type.LG>
        </Button>
      )}
    </>
  )
}

export default ActionButton
