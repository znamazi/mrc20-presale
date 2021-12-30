import React from 'react'
import { Flex } from 'rebass'
import { title } from '../../constants/settings'

import { Title, GradientTitle } from '.'
import { Box } from '../common/Container'
import { Type } from '../common/Text'
import Network from './Network'
import SelectBox from './SelectBox'
import { useMuonState } from '../../context'
import { Image } from '../common/FormControlls'
import ActionButton from './ActionButton'
import CountDown from '../common/CountDown'
import MuonNetwork from '../common/MuonNetwork'
import moment from 'moment'

const Swap = (props) => {
  let { state } = useMuonState()
  const {
    wrongNetwork,
    changeChain,
    handleConnectWallet,
    changeToken,
    handleAmount,
    handleSwap,
    handleApprove,
    handleMax,
    lock,
    setLock,
    loading,
    error,
    maxAllocation
  } = props
  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="100%"
    >
      <GradientTitle>{title} </GradientTitle>
      <Title margin="0 0 10px">Presale</Title>
      <Box minHeight="420px">
        <Flex width="100%" flexDirection="column">
          <Network
            label="Select Chain"
            onChange={(data) => changeChain(data)}
          />
          <SelectBox
            label="from"
            amount={state.amount?.from}
            selectedToken={state.selectedToken}
            changeToken={changeToken}
            handleAmount={handleAmount}
            handleMax={handleMax}
            error={error}
            lock={lock}
          />
          <Flex justifyContent="center">
            <Image src="/media/common/ex.svg" alt="exchange" />
          </Flex>
          <SelectBox
            label="to"
            amount={state.amount?.to}
            selectedToken={state.presaleToken}
            handleAmount={handleAmount}
            lock={lock}
          />
          {maxAllocation !== undefined && (
            <Flex justifyContent="flex-end" alignItems="center">
              <Type.SM
                color="#5E5CFC"
                padding="0 3px"
              >{`Max. Allocation is ${maxAllocation}`}</Type.SM>
              <Image src="/media/common/info.svg" alt="svg" />
            </Flex>
          )}
          {lock !== 0 && (
            <Flex
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              <CountDown date={lock} setLock={() => setLock(0)} />
            </Flex>
          )}
        </Flex>
      </Box>
      <ActionButton
        wrongNetwork={wrongNetwork}
        handleConnectWallet={handleConnectWallet}
        handleSwap={handleSwap}
        handleApprove={handleApprove}
        disable={lock}
        loading={loading}
      />
      <Flex justifyContent="center">
        <Type.SM color="#313144" fontSize="10px" padding="10px">
          Powered by
        </Type.SM>
        <MuonNetwork logo="muonNetworkBlack" />
      </Flex>
    </Flex>
  )
}

export default Swap
