import React from 'react'
import styled from 'styled-components'
import { Flex } from 'rebass'
import dynamic from 'next/dynamic'

import { Selector, Arrow, Image, ContentItem } from '../common/FormControlls'
import { Type } from '../common/Text'
const Modal = dynamic(() => import('../common/Modal'))
import { useMuonState } from '../../context'

const Wrapper = styled.div`
  margin: 20px 18px 7px;
`
export const Item = styled.div`
  background: #2B2B3C;
  border: 1px solid rgba(172, 175, 243, 0.29);
  margin:7.5px auto;
  padding:10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor:pointer;
  &:hover{
    background:#42425f;
  }
`
const Network = (props) => {
  const { onChange, label } = props
  const [open, setOpen] = React.useState(false)
  const { state } = useMuonState()

  const contentModal = state.data.map((item, index) => (
    <Item key={index} onClick={() => {
      onChange(item)
      setOpen(!open)
    }}>
      <ContentItem
        alignItems="center"

      >
        <Image
          src={`/media/chains/${item.symbol.toLowerCase()}.svg`}
          alt="chain"
          height={"22px"}
          mr="10px"
        />
        <Type.MD color="#D3DBE3" fontWeight="bold" fontSizeXS="16px">
          {item.name}
        </Type.MD>
      </ContentItem>
    </Item>
  ))

  const handleOpenModal = () => {
    setOpen(true)
  }
  return (
    <Wrapper>
      <Type.SM color="#313144" fontSize="12.5px" padding="5px 10px">
        {label}
      </Type.SM>
      <Selector
        padding="0 18px 0 15px"
        onClick={handleOpenModal}
        cursor="pointer"
      >
        {state.selectedChain ? (
          <Flex alignItems="center">
            <Image
              src={`/media/chains/${state.selectedChain.symbol.toLowerCase()}.svg`}
              onError={(e) => (e.target.src = '/media/tokens/default.svg')}
              alt="chain"
              height={"22px"}
              mr="5px"
            />
            <Type.MD color="#313144" cursor="pointer" fontWeight="bold" fontSizeXS="16px">
              {state.selectedChain.name}
            </Type.MD>
          </Flex>
        ) : (
          <Type.SM color="#919191" fontSizeXS="16px" fontSizeXXS="14px">
            Select a Chain
          </Type.SM>
        )}

        <Arrow
          src="/media/common/arrow-down.svg"
          alt="arrow-down"
          cursor="pointer"
        />
      </Selector>

      <Modal
        open={open}
        hide={() => { setOpen(!open) }}
        title={label}
      >
        {contentModal}
      </Modal>
    </Wrapper>
  )
}

export default Network
