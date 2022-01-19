import React from 'react'
import { Flex, Image } from 'rebass'
import { title } from '../../constants/settings'

import { Title, GradientTitle, TriangleDown, BoxPresaleToken } from '.'
import { Box, Container } from '../common/Container'
import { Type } from '../common/Text'
import Network from './Network'
import SelectBox from './SelectBox'
import { useMuonState } from '../../context'
import ActionButton from './ActionButton'
import MuonNetwork from '../common/MuonNetwork'
import NetworkHint from '../common/NetworkHint'
import { LabelStatus } from '../../constants/constants'
import RemainedAllocation from './RemainedAllocation'
import { LockType } from '../../constants/transactionStatus'
import InfoLeft from './InfoLeft'

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
    remainedAllocation,
    publicTime,
    holderPublicTime,
    lockType,
    totalTokenLeft,
    showTimeLeft,
    setShowTimeLeft
  } = props

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="100%"
    >
      <GradientTitle>{title} </GradientTitle>
      <Title>Presale</Title>
      <Flex
        flexDirection="column"
        opacity={
          totalTokenLeft && totalTokenLeft.toFixedDown(3) === 0 ? '0.3' : '1'
        }
        width="100%"
      >
        {lock && lockType === LockType.Allocation ? (
          <InfoLeft
            showTimeLeft={publicTime}
            setShowTimeLeft={() => setShowTimeLeft(publicTime)}
            totalTokenLeft={totalTokenLeft}
            publicTime={publicTime}
          />
        ) : Date.now() < holderPublicTime ? (
          <InfoLeft
            showTimeLeft={showTimeLeft}
            setShowTimeLeft={() => setShowTimeLeft(publicTime)}
            totalTokenLeft={totalTokenLeft}
            publicTime={publicTime}
          />
        ) : (
          <>
            {console.log('************************')}
            <InfoLeft
              showTimeLeft={publicTime}
              setShowTimeLeft={() => setShowTimeLeft(publicTime)}
              totalTokenLeft={totalTokenLeft}
              publicTime={publicTime}
            />
          </>
        )}
        <Container>
          <Box background="linear-gradient(0deg, #D3DBE3 0%, rgba(231, 235, 243, 0) 100%)">
            <Flex width="100%" flexDirection="column">
              <Network
                label="Select Chain"
                onChange={(data) => changeChain(data)}
                lock={lock}
              />
              <NetworkHint error={wrongNetwork} />
              <SelectBox
                label={LabelStatus.FROM}
                amount={state.amount?.from}
                selectedToken={state.selectedToken}
                changeToken={changeToken}
                handleAmount={handleAmount}
                handleMax={handleMax}
                error={error}
                lock={lock}
              />
            </Flex>
          </Box>
          <TriangleDown />
          <BoxPresaleToken>
            <Flex flexDirection={`column`}>
              <SelectBox
                label={LabelStatus.TO}
                amount={state.amount?.to}
                selectedToken={state.presaleToken}
                handleAmount={handleAmount}
                lock={lock}
              />
            </Flex>
          </BoxPresaleToken>
        </Container>

        {lock && lockType === LockType.Allocation
          ? remainedAllocation !== undefined &&
            Date.now() < publicTime && (
              <RemainedAllocation remainedAllocation="Not eligible" />
            )
          : remainedAllocation !== undefined &&
            Date.now() < holderPublicTime && (
              <RemainedAllocation
                remainedAllocation={`$${remainedAllocation}`}
              />
            )}
      </Flex>
      <ActionButton
        wrongNetwork={wrongNetwork}
        handleConnectWallet={handleConnectWallet}
        handleSwap={handleSwap}
        handleApprove={handleApprove}
        disable={lock}
        setLock={setLock}
        loading={loading}
        lockType={lockType}
      />
      <Flex justifyContent="center" margin="50px 0 20px">
        <Type.SM color="#313144" fontSize="10px" padding="10px">
          Powered by
        </Type.SM>
        <MuonNetwork logo="muonNetworkBlack" />
      </Flex>
    </Flex>
  )
}

export default Swap
