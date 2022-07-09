import React from 'react'
import { Flex, Image } from 'rebass'
import { InfoBox } from './swap.style'
import { Type } from '../text/Text'
import CountDown from '../common/CountDown'

const InfoLeft = (props) => {
  const { showTimeLeft, setShowTimeLeft, leftTokens, publicTime } = props
  return (
    <Flex width="100%" justifyContent="space-between">
      {Date.now() < publicTime && (
        <InfoBox>
          <Flex alignItems="center">
            <Image src="/media/common/clock.svg" alt="clock" paddingRight="7px" />
            <Type.SM fontSize="11px" paddingRight="3px">
              Time Left:
            </Type.SM>
            <Type.SM>
              <CountDown date={showTimeLeft} setLock={() => setShowTimeLeft()} />
            </Type.SM>
          </Flex>
        </InfoBox>
      )}
      <InfoBox>
        <Flex alignItems="center">
          <Image src="/media/common/bloodToken.svg" alt="bloodToken" paddingRight="7px" />
          <Type.SM fontSize="11px">
            {`BloodTokens Left: ${leftTokens !== undefined ? leftTokens.toFixedDown(3) : ''}`}
          </Type.SM>
        </Flex>
      </InfoBox>
    </Flex>
  )
}

export default InfoLeft
