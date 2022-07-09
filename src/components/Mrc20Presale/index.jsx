import React from 'react'
import { Flex } from 'rebass'
import ActionButton from '../actionButton/ActionButton'
// import Claim from '../claim/Claim'
import { Container, Wrapper } from '../container/Container'
import { Type } from '../text/Text'
import Transaction from '../transaction/Transaction'
import MuonNetwork from '../common/MuonNetwork'
import { useTx } from '../../state/transactions/hooks'
import Swap from '../Swap'

const MRC20Presale = () => {
  const tx = useTx()

  return (
    <Container>
      <Wrapper maxWidth="300px" width="100%"></Wrapper>
      <Wrapper maxWidth="470px" width="100%">
        <Swap />
        <ActionButton />

        <Flex justifyContent="center" margin="50px 0 20px">
          <Type.SM color="#313144" fontSize="10px" padding="10px">
            Powered by
          </Type.SM>
          <MuonNetwork logo="muonNetworkBlack" />
        </Flex>
      </Wrapper>
      <Wrapper maxWidth="300px" width="100%">
        {tx.status && <Transaction />}
        {/* {claims.length > 0 && <Claim claims={claims} fetchData={(txId) => updatePendingTx(txId)} />} */}
      </Wrapper>
    </Container>
  )
}

export default MRC20Presale
