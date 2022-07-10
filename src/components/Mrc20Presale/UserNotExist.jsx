import React from 'react'
import styled from 'styled-components'
import { Type } from '../text/Text'
import CountDown from '../common/CountDown'
import moment from 'moment'
import Modal from '../modal/Modal'

const Icon = styled.img`
  width: 22px;
  height: 22px;
  text-align: center;
  margin: auto;
  margin-bottom: 12px;
`

const Wrapper = styled.div`
  text-align: center;
  color: #d3dbe3;
`
const CounterWrap = styled.div`
  background: #2b2b3c;
  border: 1px solid rgba(172, 175, 243, 0.29);
  box-sizing: border-box;
  border-radius: 5px;
  padding: 8px 8px;
  max-width: 180px;
  margin: auto;
  margin-top: 15px;
  font-size: 30px;
`

const UserNotExist = (props) => {
  const { open, hide, lock, setLock } = props
  return (
    <Modal open={open} hide={hide} title="Ooops!">
      <Wrapper>
        <Icon src="/media/common/warningIcon.svg" />
        <Type.MD color="#D3DBE3" fontWeight="bold" mb="20px">
          We are sorry but this wallet is not in our allocation list.
        </Type.MD>
        <Type.MD color="#D3DBE3">You will be able to swap your tokens soon:</Type.MD>
        <CounterWrap>
          <CountDown date={moment(lock)} setLock={() => setLock(0)} />
        </CounterWrap>
      </Wrapper>
    </Modal>
  )
}

export default UserNotExist
