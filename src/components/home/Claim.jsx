import React from 'react'
import { Flex } from 'rebass'
import { presaleToken } from '../../constants/settings'
import { Box } from '../common/Container'
import { Type } from '../common/Text'
import { Button, Image } from '../common/FormControlls'
import CountDown from '../common/CountDown'

const Claim = (props) => {
  const { amountClaim, claimTime, handleClaim } = props
  const [lock, setLock] = React.useState(Date.now() < claimTime)

  return (
    <Box
      padding="15px 15px 5px"
      borderRadius="10px"
      background="linear-gradient(0deg, #E7EBF3 0%, rgba(231, 235, 243, 0.25) 105.18%)"
    >
      <Flex width="100%">
        <Type.SM>Claim Token</Type.SM>
      </Flex>
      <Flex width="100%" justifyContent="space-between">
        <Flex alignItems="center">
          <Image
            src={presaleToken.logo}
            boxSizing="unset"
            alt={presaleToken.symbol}
          />
          <Type.LG color="#313144" fontSize="15px" fontFamily="Montserrat-bold">
            {presaleToken.symbol}
          </Type.LG>
        </Flex>
        <Type.LG>{parseFloat(amountClaim)}</Type.LG>
      </Flex>
      {lock && (
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <CountDown date={claimTime} setLock={() => setLock(false)} />
        </Flex>
      )}
      <Button
        margin="25px 0 "
        background={lock ? '#9d9d9d' : '#5F5CFE'}
        disabled={lock}
        cursor={lock ? 'default' : 'pointer'}
        onClick={handleClaim}
      >
        <Type.LG color="#ffffff"> Claim</Type.LG>
      </Button>
    </Box>
  )
}

export default Claim
