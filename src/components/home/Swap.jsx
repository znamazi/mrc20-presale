import React from 'react'
import { Flex } from 'rebass'
import { title } from '../../constants/settings'

import { Title } from '.'
import { Box } from '../common/Container'
import { Type } from '../common/Text'
import Network from './Network'
import SelectBox from './SelectBox'
import { useMuonState } from '../../context'
import { Image } from '../common/FormControlls'
import ActionButton from './ActionButton'

const Swap = (props) => {
  let { state } = useMuonState()
  const {
    wrongNetwork,
    updateSelectedChain,
    handleConnectWallet,
    changeToken,
    handleAmount,
    handleDeposit,
    handleApprove,
    errorAmount
  } = props
  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="100%"
    >
      <Title>{title}</Title>
      <Title margin="8px 0 33px">Presale</Title>

      <Box>
        <Type.SM
          color="rgba(49, 49, 68, 0.5)"
          fontSize="12.5px"
          padding="10px 0"
          fontFamily="Reckless"
        >
          Powerd by Muon Network
        </Type.SM>
        <Flex width="100%" flexDirection="column">
          <Network
            label="Select Network"
            onChange={(data) => updateSelectedChain(data)}
          />
          <SelectBox
            label="from"
            amount={state.amount?.from}
            selectedToken={state.selectedToken}
            changeToken={changeToken}
            handleAmount={handleAmount}
          />
          <Flex justifyContent="center">
            <Image src="/media/common/ex.svg" alt="exchange" />
          </Flex>
          <SelectBox
            label="to"
            amount={state.amount?.to}
            selectedToken={state.mainToken}
            handleAmount={handleAmount}
          />

          <ActionButton
            wrongNetwork={wrongNetwork}
            handleConnectWallet={handleConnectWallet}
            //   handleDeposit={handleDeposit}
            handleApprove={handleApprove}
          />
          <Flex justifyContent="center" margin="50px 0 20px">
            <Image src="/media/common/logo.svg" alt="Muon Logo" />
          </Flex>
        </Flex>
      </Box>
    </Flex>
  )
}

export default Swap
