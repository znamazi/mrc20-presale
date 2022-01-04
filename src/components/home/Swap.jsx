import React from 'react'
import { Flex } from 'rebass'
import { title } from '../../constants/settings'

import { Title, GradientTitle, TriangleDown, BoxPresaleToken } from '.'
import { Box, Container } from '../common/Container'
import { Type } from '../common/Text'
import Network from './Network'
import SelectBox from './SelectBox'
import { useMuonState } from '../../context'
import { Image } from '../common/FormControlls'
import ActionButton from './ActionButton'
import CountDown from '../common/CountDown'
import MuonNetwork from '../common/MuonNetwork'

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
  console.log({ state })
  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="100%"
    >
      <GradientTitle fontFamily="Montserrat-bold">{title} </GradientTitle>
      <Title margin="0 0 10px" fontFamily="Montserrat-bold">
        Presale
      </Title>
      <Container>
        <Box background="linear-gradient(0deg, #D3DBE3 0%, rgba(231, 235, 243, 0) 100%)">
          <Flex width="100%" flexDirection="column">
            <Network
              label="Select Chain"
              onChange={(data) => changeChain(data)}
            />
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
          <Flex flexDirection={`column`} margin={`75px 0 0`}>
            <SelectBox
              label="To"
              amount={state.amount?.to}
              selectedToken={state.presaleToken}
              handleAmount={handleAmount}
              lock={lock}
            />
            {/* {maxAllocation !== undefined && (
              <Flex justifyContent="flex-end" alignItems="center">
                <Type.SM
                  color="#5E5CFC"
                  padding="0 3px"
                >{`Max. Allocation is ${maxAllocation}`}</Type.SM>
                <Image src="/media/common/info.svg" alt="svg" />
              </Flex>
            )} */}
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
        </BoxPresaleToken>
      </Container>

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
