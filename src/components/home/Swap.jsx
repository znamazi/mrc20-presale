import React from 'react'
import { Flex, Image } from 'rebass'
import { title } from '../../constants/settings'

import { Title, GradientTitle, TriangleDown, BoxPresaleToken } from '.'
import { Box, Container, FlexBetween } from '../common/Container'
import { Type } from '../common/Text'
import Network from './Network'
import SelectBox from './SelectBox'
import { useMuonState } from '../../context'
import ActionButton from './ActionButton'
import MuonNetwork from '../common/MuonNetwork'
import NetworkHint from '../common/NetworkHint'

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
    lockType,
  } = props
  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="100%"
    >
      <GradientTitle >{title} </GradientTitle>
      <Title >
        Presale
      </Title>
      <Container>
        <Box background="linear-gradient(0deg, #D3DBE3 0%, rgba(231, 235, 243, 0) 100%)">
          <Flex width="100%" flexDirection="column">
            <Network
              label="Select Chain"
              onChange={(data) => changeChain(data)}
            />
            <NetworkHint error={wrongNetwork} />
            <SelectBox
              label="From"
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
              label="To"
              amount={state.amount?.to}
              selectedToken={state.presaleToken}
              handleAmount={handleAmount}
              lock={lock}
            />
          </Flex>
        </BoxPresaleToken>
      </Container>

      {remainedAllocation !== undefined && Date.now() < publicTime &&
        <FlexBetween style={{ backgroundColor: "#d8dfe6", padding: "10px 20px", alignItems: "center", width: "100%", borderRadius: "10px", marginTop: "2px" }}>
          <p style={{ fontSize: "10px" }} href='#'>Your Presale Allocation</p>
          <p style={{ fontSize: "13px", fontWeight: "bold" }}>{remainedAllocation === 0 ? "Not eligible" : `$${remainedAllocation}`}</p>
        </FlexBetween>}

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
