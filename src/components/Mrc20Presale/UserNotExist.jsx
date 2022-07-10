import moment from 'moment'
import React from 'react'

import ReactModal from 'react-modal'
import { Flex } from 'rebass'
import styled from 'styled-components'
import CountDown from '../common/CountDown'
import { Button } from '../button/Button'
import { Type } from '../text/Text'

if (typeof window !== 'undefined') {
  ReactModal.setAppElement('body')
}

const Container = styled(Flex)`
  position: relative;
`

const Wrapper = styled.div`
  padding: 35px 15px 15px;
  overflow-y: auto;
  background: #e7e8ea;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Close = styled.img`
  width: 44.15px;
  height: 44.15px;
  position: absolute;
  top: -22px;
  left: 40%;
  cursor: pointer;
`

const UserNotExistComponent = (props) => {
  const { open, hide, lock, setLock } = props
  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '302px',
      width: '95%',
      background: '#FAFAFF',
      border: '0.5px solid #D2D2D2',
      borderRadius: '5px',
      overFlowY: 'hidden',
      boxSizing: 'border-box',
      padding: '54px 39px 40px',
      boxShadow: `0px 4px 4px rgba(239, 239, 239, 0.25)`,
    },
  }

  return (
    <ReactModal isOpen={open} style={customStyles} onRequestClose={hide} shouldCloseOnOverlayClick={true}>
      <Container flexDirection="column">
        <Close src="/media/common/close.svg" onClick={hide} />

        <Wrapper>
          <Type.SM color="#313144">Sorry! </Type.SM>
          <Type.SM color="#313144">We are sorry but this wallet is not in our allocation list.</Type.SM>
          <Type.SM padding="13px 0">
            <CountDown date={moment(lock)} setLock={() => setLock(0)} />
          </Type.SM>
          <Button background="#FFA451" borderRadius="5px" maxWidth="195px" height="28px" onClick={hide}>
            <Type.SM>OK</Type.SM>
          </Button>
        </Wrapper>
      </Container>
    </ReactModal>
  )
}

export default UserNotExistComponent
