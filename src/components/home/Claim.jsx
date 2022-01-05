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
      borderRadius="10px"
      padding="14px 20px 19px"
      background="linear-gradient(0deg, #E7EBF3 0%, rgba(231, 235, 243, 0.25) 105.18%)"
      border="1px solid #ffffff"
    >
      <Flex width="100%">
        <Type.SM>Claim Token</Type.SM>
      </Flex>
      <Flex width="100%" justifyContent="space-between" margin="15px 0">
        <Flex alignItems="center">
          <Image
            paddingRight="10px"
            src={presaleToken.logo}
            boxSizing="unset"
            alt={presaleToken.symbol}
          />
          <Type.MD color="#313144" fontWeight="bold">
            {presaleToken.symbol}
          </Type.MD>
        </Flex>
        <Type.MD color="#313144" fontWeight="bold">
          {parseFloat(amountClaim)}
        </Type.MD>
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
        margin="0"
        background={lock ? '#9d9d9d' : '#5F5CFE'}
        disabled={lock}
        cursor={lock ? 'default' : 'pointer'}
        onClick={handleClaim}
      >
        <Type.MD color="#ffffff"> Claim</Type.MD>
      </Button>
    </Box>
  )
}

export default Claim
