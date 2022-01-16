import React from 'react'
import { Flex, Image } from 'rebass'
import { InfoBox } from '.'
import { Type } from '../common/Text'
import CountDown from '../common/CountDown'

const InfoLeft = ({
  showTimeLeft,
  setShowLeftTime,
  totalTokenLeft,
  publicTime
}) => {
  return (
    <Flex width="100%" justifyContent="space-between">
      {Date.now() < publicTime && (
        <InfoBox>
          <Flex alignItems="center">
            <Image
              src="/media/common/clock.svg"
              alt="clock"
              paddingRight="7px"
            />
            <Type.SM fontSize="11px" paddingRight="3px">
              Time Left:
            </Type.SM>
            <Type.SM>
              <CountDown
                date={showTimeLeft}
                setLock={() => setShowLeftTime()}
              />
            </Type.SM>
          </Flex>
        </InfoBox>
      )}
      <InfoBox>
        <Flex alignItems="center">
          <Image
            src="/media/common/bloodToken.svg"
            alt="bloodToken"
            paddingRight="7px"
          />
          <Type.SM fontSize="11px">
            {`BloodTokens Left: ${totalTokenLeft.toFixedDown(3)}`}
          </Type.SM>
        </Flex>
      </InfoBox>
    </Flex>
  )
}

export default InfoLeft
