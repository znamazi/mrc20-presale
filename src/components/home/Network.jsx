import React from 'react'
import styled from 'styled-components'
import { Flex } from 'rebass'
import dynamic from 'next/dynamic'

import { Selector, Image } from '../common/FormControlls'
import { Type } from '../common/Text'
const Modal = dynamic(() => import('../common/Modal'))
// import Modal from '../common/Modal'
import { useMuonState } from '../../context'

const Wrapper = styled.div`
  margin-bottom: ${({ marginBottom }) =>
    marginBottom ? marginBottom : '20px'};
`
const Item = styled.div`
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const ContentItem = styled(Flex)`
  box-sizing: unset !important;
  cursor: pointer;
`

const Arrow = styled.img`
  cursor: pointer;
`

const Network = (props) => {
  const { label, placeholder, type, onChange, marginBottom, border } = props
  const [open, setOpen] = React.useState(false)
  const { state, dispatch } = useMuonState()

  const contentModal = state.data.map((item, index) => (
    <Item key={index}>
      <ContentItem
        alignItems="center"
        onClick={() => {
          onChange(item)
          setOpen(!open)
        }}
      >
        <Image
          src={`/media/chains/${item.symbol.toLowerCase()}.svg`}
          boxSizing="unset"
          alt="chain"
        />
        <Type.LG
          fontFamily="FH Oscar"
          color="#313144"
          cursor="pointer"
          fontSizeXS="16px"
        >
          {item.name}
        </Type.LG>
      </ContentItem>
    </Item>
  ))

  const handleOpenModal = () => {
    setOpen(true)
  }
  return (
    <Wrapper marginBottom={marginBottom}>
      <Type.SM
        fontFamily="FH Oscar"
        color="#313144"
        fontSize="12.5px"
        padding="5px 10px"
      >
        {label}
      </Type.SM>
      <Selector
        padding="0 18px 0 15px"
        onClick={handleOpenModal}
        border={border}
      >
        {state.selectedChain ? (
          <Flex alignItems="center">
            <Image
              src={`/media/chains/${state.selectedChain.symbol.toLowerCase()}.svg`}
              onError={(e) => (e.target.src = '/media/tokens/default.svg')}
              boxSizing="unset"
              alt="chain"
            />
            <Type.LG
              fontFamily="FH Oscar"
              color="#313144"
              cursor="pointer"
              fontSizeXS="16px"
            >
              {state.selectedChain.name}
            </Type.LG>
          </Flex>
        ) : (
          <Type.LG
            fontFamily="FH Oscar"
            color="#919191"
            fontSizeXS="16px"
            fontSizeXXS="14px"
          >
            {placeholder ? placeholder : label}
          </Type.LG>
        )}

        <Arrow
          src="/media/common/arrow-down.svg"
          alt="arrow-down"
          cursor="pointer"
        />
      </Selector>

      <Modal
        open={open}
        hide={() => {
          setOpen(!open)
        }}
        title={label}
        search={type === 'token'}
        placeholderSearch="Search name or paste address"
      >
        {contentModal}
      </Modal>
    </Wrapper>
  )
}

export default Network
