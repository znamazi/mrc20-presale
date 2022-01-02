import React from 'react'
import { Flex } from 'rebass'
import dynamic from 'next/dynamic'
import { useMuonState } from '../../context'
import {
  Selector,
  ContentItem,
  Input,
  Image,
  Arrow
} from '../common/FormControlls'
import { Type } from '../common/Text'
import Token from './Token'
import { Max } from '.'
import styled from 'styled-components'
const Modal = dynamic(() => import('../common/Modal'))

const SubTitle = styled(Type.SM)`
   color:#313144 ;
   fontSize:12px ;
   margin:5px 8px;
`

const InputPanelWrap = styled.div`
  display:flex;
  justify-content : space-between;
  align-items:center;
  background: #2B2B3C;
  border: 1px solid #FFFFFF;
  box-sizing: border-box;
  border-radius: 5px;
  padding:5px 10px;
  height:45px;
`

const TokenWrap = styled.div`
  display:flex;
  justify-content:flex-end;
  align-items:center;
  white-space: nowrap;
`

const SelectBox = (props) => {
  const { state } = useMuonState()
  let {
    label,
    amount,
    error,
    selectedToken,
    changeToken,
    handleAmount,
    handleMax,
    lock
  } = props
  const [open, setOpen] = React.useState(false)

  const handleOpenModal = () => {
    setOpen(true)
  }
  let contentModal = state.selectedChain.tokens.map((token) => (
    <ContentItem
      key={token.address}
      justifyContent="space-between"
      paddingBottom="20px"
      onClick={() => {
        changeToken(token.address)
        setOpen(!open)
      }}
    >
      <Flex>
        <Image src={token.logo} boxSizing="unset" alt={token.symbol} />
        <Type.MD color="#313144" cursor="pointer" fontSizeXS="16px">
          {token.symbol}
        </Type.MD>
      </Flex>
      <Flex>{token.balance}</Flex>
    </ContentItem>
  ))
  let content =
    state.selectedChain.tokens.length > 1 ? (
      <Selector
        padding="0 18px 0 15px"
        maxWidth="181px"
        background={"transparent"}
        border="none"
        cursor="pointer"
        onClick={handleOpenModal}
      >
        {selectedToken ? (
          <Flex alignItems="center" mr="8px" >
            <Image
              src={selectedToken.logo}
              onError={(e) => (e.target.src = '/media/tokens/default.svg')}
              boxSizing="unset"
              paddingRight="5px"
              height={"22px"}
              alt={selectedToken.symbol}
            />
            <Type.MD color="#E6ECF2" fontWeight="bold" fontSizeXS="16px">
              {selectedToken.symbol}
            </Type.MD>
          </Flex>
        ) : (
          <Type.LG color="#E6ECF2" fontSizeXS="16px" fontSizeXXS="14px">
            "Select a Token"
          </Type.LG>
        )}
        <Arrow
          src="/media/common/arrow-down-white.svg"
          alt="arrow-down"
          cursor="pointer"
        />
      </Selector>
    ) : (
      <Token
        logo={state.selectedChain.tokens[0].logo}
        name={state.selectedChain.tokens[0].symbol}
      />
    )
  return (
    <Flex flexDirection="column" margin="0 18px 40px">
      <Flex width="100%" justifyContent="space-between" alignItems="center">
        <SubTitle>
          {label}
        </SubTitle>
        <Flex justifyContent="flex-end" alignItems="center">
          <SubTitle>
            Balance:
            {` ${!isNaN(parseFloat(selectedToken.balance))
              ? parseFloat(selectedToken.balance)
              : ''
              } ${selectedToken?.symbol}`}
          </SubTitle>
          {label === 'From' && (
            <Max>
              <Type.SM
                color="#FFFFFF"
                fontSize="10px"
                onClick={(e) => handleMax(selectedToken.balance)}
              >
                Max
              </Type.SM>
            </Max>
          )}
        </Flex>
      </Flex>
      <InputPanelWrap>
        <Input
          aria-label={`${label}-input`}
          type="number"
          placeholder="Enter Amount"
          min={0}
          height={"100%"}
          onChange={(e) => handleAmount(e.target.value, label)}
          value={amount}
          disabled={lock}
          color={"#ffffff"}
          fontSize={"20px"}
          border={
            error && error.type && error.label === label && '1px solid red'
          }
        />

        {label === 'From' ? (
          content
        ) : (<TokenWrap>
          <Image src={selectedToken.logo} boxSizing="unset" height={"22px"} alt={selectedToken.name} paddingRight="5px" />
          <Type.LG color="#ffffff" fontWeight="bold" fontSize="15px" >
            {selectedToken.name}
          </Type.LG>
        </TokenWrap>
        )}
      </InputPanelWrap>
      <Modal
        open={open}
        hide={() => {
          setOpen(!open)
        }}
        title="Select Token"
      >
        {contentModal}
      </Modal>
    </Flex>
  )
}

export default SelectBox
