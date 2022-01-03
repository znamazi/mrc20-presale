import React from 'react'
import ReactModal from 'react-modal'
import { Flex } from 'rebass'
import styled from 'styled-components'
import { Type } from './Text'
import { BorderBottom, ImageWithCursor, Input } from '../common/FormControlls'

if (typeof window !== 'undefined') {
  ReactModal.setAppElement('body')
}

const Wrapper = styled.div`
  padding: ${({ padding }) => (padding ? padding : '30px')};
  overflow-y: auto;
  // height: 50vh;
  /* background-color:#313144; */
`

const Modal = (props) => {
  const {
    open,
    hide,
    title,
    children,
    search,
    placeholderSearch,
    maxWidth,
    backgroundColor,
    border,
    borderRadius,
    padding,
    boxShadowColor
  } = props

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(49, 49, 68, 0.9)'
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      // marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      maxWidth: maxWidth ? maxWidth : '450px',
      width: '95%',
      background: 'transparent',
      border: 0,
      // borderRadius: borderRadius ? borderRadius : '20px',
      overFlowY: 'hidden',
      boxSizing: 'border-box',
      // boxShadow: `0px 4px 4px ${boxShadowColor ? boxShadowColor : 'rgba(239, 239, 239, 0.25)'}`
    }
  }

  const MainWrap = styled.div`
    border-radius:20px;
    background-color:#313144;
  `

  return (
    <ReactModal
      isOpen={open}
      style={customStyles}
      onRequestClose={hide}
      shouldCloseOnOverlayClick={true}
    >
      <Flex
        justifyContent="space-between"
        alignItems="center"
        padding={padding ? padding : '15px 15px 15px'}
      >
        <Type.MD color="#D3DBE3" fontWeight="bold" fontSizeXS="16px">
          {title}
        </Type.MD>
        <ImageWithCursor
          width="12.5px"
          height="12.5px"
          paddingRight="0"
          src="/media/common/x.svg"
          onClick={hide}
        />
      </Flex>
      <MainWrap>
        {/* <BorderBottom /> */}
        <Wrapper>{children}</Wrapper>
      </MainWrap>
    </ReactModal>
  )
}

export default Modal
