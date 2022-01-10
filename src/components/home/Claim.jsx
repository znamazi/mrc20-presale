import React from 'react'
import { Flex } from 'rebass'
import { presaleToken } from '../../constants/settings'
import { Box } from '../common/Container'
import { Type } from '../common/Text'
import { Button, Image } from '../common/FormControlls'
import CountDown from '../common/CountDown'
import styled from 'styled-components'

const ClaimWrap = styled(Box)`
  margin: auto;
  margin-top: 20px;
  margin-bottom: 10px;
  border-radius: 15px;
  box-shadow: 0px 0px 9px 1px #98b7;
  padding: 15px 15px 5px;
  background: linear-gradient(
    0deg,
    #e7ebf3 0%,
    rgba(231, 235, 243, 0.25) 105.18%
  );
`

const Claim = (props) => {
  const { amountClaim, claimTime, handleClaim } = props
  const [lock, setLock] = React.useState(Date.now() < claimTime)
  return (
    <ClaimWrap>
      <Flex width="100%">
        <Type.SM>Claim Token</Type.SM>
      </Flex>
      <Flex
        width="100%"
        justifyContent="space-between"
        alignItems={'center'}
        mt={'10px'}
      >
        <Flex alignItems="center">
          <Image
            paddingRight="10px"
            src={presaleToken.logo}
            boxSizing="unset"
            alt={presaleToken.symbol}
            width={'22px'}
          />
          <Type.MD
            fontWeight="bold"
            color="#313144"
            fontSize="15px"
            fontFamily="Montserrat-bold"
            ml="5px"
          >
            {presaleToken.symbol}
          </Type.MD>
        </Flex>
        <Type.MD fontWeight="bold">{parseFloat(amountClaim)}</Type.MD>
      </Flex>
      {lock && (
        <Flex
          justifyContent="space-between"
          alignItems="center"
          fontSize={'15px'}
          width={'100%'}
          marginTop="10px"
        >
          <Type.SM>claimable in</Type.SM>
          <CountDown date={claimTime} setLock={() => setLock(false)} />
        </Flex>
      )}
      <Button
        margin="15px 0  10px 0"
        background={lock ? '#9d9d9d' : '#5F5CFE'}
        disabled={lock}
        cursor={lock ? 'default' : 'pointer'}
        onClick={handleClaim}
        height="35px"
      >
        <Type.MD color="#ffffff" fontWeight="bold">
          {' '}
          Claim
        </Type.MD>
      </Button>
    </ClaimWrap>
  )
}

export default Claim
