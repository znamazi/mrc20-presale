import React, { useEffect, useState } from 'react'
import { Flex } from 'rebass'
import ActionButton from '../actionButton/ActionButton'
// import Claim from '../claim/Claim'
import { Container, Wrapper } from '../container/Container'
import { Type } from '../text/Text'
import Transaction from '../transaction/Transaction'
import MuonNetwork from '../common/MuonNetwork'
import { useTx } from '../../state/transactions/hooks'
import Swap from '../Swap'
import { SoldOut } from '../Swap/swap.style'
import { useUpdateLock } from '../../state/application/hooks'
import { LockType } from '../../constants/constants'
import useLeftTokens from '../../hook/useLeftTokens'

const MRC20Presale = () => {
  const tx = useTx()
  const [totalLeftTokens, setLeftTokens] = useState()
  const updateLock = useUpdateLock()
  const leftTokens = useLeftTokens()

  useEffect(() => {
    if (leftTokens < 10) {
      updateLock({ lock: true, lockType: LockType.SOLD_OUT })
    }
    setLeftTokens(leftTokens)
  }, [leftTokens])

  return (
    <>
      {totalLeftTokens < 10 && (
        <SoldOut>
          <Type.XXXL color="#5551FF" fontSize="100px" fontWeight="bold" fontSizeXS="65px">
            SOLD OUT!
          </Type.XXXL>
        </SoldOut>
      )}
      <Container>
        <Wrapper maxWidth="300px" width="100%"></Wrapper>
        <Wrapper maxWidth="470px" width="100%">
          <Swap leftTokens={totalLeftTokens} />
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
          {/* {claims.length > 0 && claimTime && <Claim claims={claims} fetchData={(txId) => updatePendingTx(txId)} />} */}
        </Wrapper>
      </Container>
    </>
  )
}

export default MRC20Presale
