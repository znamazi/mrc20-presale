import React, { useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { UnsupportedChainIdError } from '@web3-react/core'
import moment from 'moment'
import { Button, ActionButton, ActionText } from '../button/Button'
import { Type } from '../text/Text'
import WalletModal from '../modal/WalletModal'
import { ActionBtnType, LockType } from '../../constants/constants'
import useActionBtnType from '../../hook/useActionBtnType'
import useActionBtnStatus from '../../hook/useActionBtnStatus'
import { validChains } from '../../constants/settings'
import { addRPC } from '../../utils/addRPC'
import { NameChainMap } from '../../constants/chainsMap'
import { useSwap } from '../../state/swap/hooks'
import { useAppState, useUpdateLock } from '../../state/application/hooks'
import CountDown from '../common/CountDown'

const ActionButtonComponent = (props) => {
  const { handleApprove, handleDeposit, allowance, leftTokens } = props
  const [open, setOpen] = useState(false)
  const { account, chainId, error } = useWeb3React()
  const swap = useSwap()
  const { lockType, lock } = useAppState()

  let actionBtn = useActionBtnType(allowance, lock, leftTokens)
  const status = useActionBtnStatus()
  const updateLock = useUpdateLock()
  const wrongNetwork = !validChains[process.env.NEXT_PUBLIC_MODE].includes(chainId)

  let validChainId = null
  if (swap.chain) {
    if (swap.chain.id !== chainId) validChainId = swap.chain.id
  }

  const handleConnectWallet = () => {
    setOpen(true)
  }
  let contentBtn = ''
  if (!account && !(error instanceof UnsupportedChainIdError))
    contentBtn = (
      <Button margin="25px 0 0" background="#5F5CFE" onClick={handleConnectWallet}>
        <Type.LG color="#ffffff" fontSizeXS="16px">
          Connect Wallet
        </Type.LG>
      </Button>
    )
  else if (wrongNetwork || validChainId || error instanceof UnsupportedChainIdError) {
    contentBtn = (
      <Button
        margin="25px 0 0"
        background={'rgba(255, 164, 81, 0.2)'}
        border="1px solid rgba(255, 164, 81, 1)"
        cursor="pointer"
        onClick={() =>
          wrongNetwork
            ? addRPC(swap.chain ? swap.chain.id : validChains[process.env.NEXT_PUBLIC_MODE][0])
            : addRPC(validChainId)
        }
      >
        <Type.MD color={'rgba(49, 49, 68, 1)'} fontWeight="bold">
          {wrongNetwork
            ? ` Switch to ${NameChainMap[swap.chain ? swap.chain.id : validChains[process.env.NEXT_PUBLIC_MODE][0]]}`
            : ` Switch to ${NameChainMap[validChainId]}`}
        </Type.MD>
      </Button>
    )
  } else {
    switch (actionBtn) {
      case ActionBtnType.SELECT:
        contentBtn = (
          <Button margin="25px 0 0" cursor="default" background="rgba(85, 81, 255, 0.15)">
            <Type.LG color="#8888db" fontSizeXS="16px" fontSizeXXS="14px">
              Enter amount
            </Type.LG>
          </Button>
        )
        break
      case ActionBtnType.LOCK:
        contentBtn = (
          <Button
            margin="25px 0 0"
            cursor="default"
            background={lockType === LockType.Cooldown ? '#FFB800' : '#9d9d9d'}
          >
            <Type.MD color="#ffffff" fontWeight="bold">
              {lockType === LockType.Cooldown ? 'Cooldown, next deposit in' : 'Deposit available in'}
            </Type.MD>
            <Type.MD ml="5px" color={'#ffffff'} fontWeight="bold">
              <CountDown date={moment(lock)} setLock={() => updateLock({ lock: 0 })} />
            </Type.MD>
          </Button>
        )
        break
      case ActionBtnType.APPROVE:
        contentBtn = (
          <ActionButton onClick={handleApprove} active={!status.approve}>
            <ActionText active={!status.approve}>{status.approve ? 'Approving ...' : 'Approve'}</ActionText>
          </ActionButton>
        )
        break
      case ActionBtnType.DEPOSIT:
        contentBtn = (
          <ActionButton onClick={handleDeposit} active={!status.deposit}>
            <ActionText active={!status.deposit}>{status.deposit ? 'Depositing ...' : 'Deposit Asset'}</ActionText>
          </ActionButton>
        )
        break

      case ActionBtnType.SOLD_OUT:
        contentBtn = (
          <Button margin="25px 0 0" cursor="default" background="#FFB800">
            <Type.MD color="#313144" fontWeight="bold">
              Sold Out! BloodTokens are gone.
            </Type.MD>
          </Button>
        )
        break

      default:
        break
    }
  }

  return (
    <>
      {contentBtn}
      <WalletModal
        open={open}
        hide={() => {
          setOpen(!open)
        }}
      />
    </>
  )
}

export default ActionButtonComponent
