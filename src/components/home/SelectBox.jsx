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
const Modal = dynamic(() => import('../common/Modal'))

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
        <Type.LG color="#313144" cursor="pointer" fontSizeXS="16px">
          {token.symbol}
        </Type.LG>
      </Flex>
      <Flex>{token.balance}</Flex>
    </ContentItem>
  ))
  let content =
    state.selectedChain.tokens.length > 1 ? (
      <Selector
        padding="0 18px 0 15px"
        maxWidth="165px"
        height="40px"
        onClick={handleOpenModal}
      >
        {selectedToken ? (
          <Flex alignItems="center">
            <Image
              src={selectedToken.logo}
              onError={(e) => (e.target.src = '/media/tokens/default.svg')}
              boxSizing="unset"
              alt={selectedToken.symbol}
            />
            <Type.LG color="#313144" cursor="pointer" fontSizeXS="16px">
              {selectedToken.symbol}
            </Type.LG>
          </Flex>
        ) : (
          <Type.LG color="#919191" fontSizeXS="16px" fontSizeXXS="14px">
            "Select a Token"
          </Type.LG>
        )}
        <Arrow
          src="/media/common/arrow-down.svg"
          alt="arrow-down"
          cursor="pointer"
        />
      </Selector>
    ) : (
      <Flex alignItems="center" padding="0 10px">
        <Image
          src={state.selectedChain.tokens[0].logo}
          boxSizing="unset"
          alt={state.selectedChain.tokens[0].symbol}
        />
        <Type.LG color="#313144" fontSizeXS="16px">
          {state.selectedChain.tokens[0].symbol}
        </Type.LG>
      </Flex>
    )
  return (
    <Selector
      padding="20px"
      border="0.75px solid transparent"
      flexDirection="column"
      height="100px"
    >
      <Flex width="100%" justifyContent="space-between" alignItems="center">
        <Type.SM color="#313144" fontSize="12.5px" padding="5px 10px">
          {label}
        </Type.SM>
        <Flex justifyContent="flex-end" alignItems="center">
          <Type.SM color="#313144" fontSize="12.5px" padding="5px 10px">
            Balance:
            {` ${
              !isNaN(parseFloat(selectedToken.balance))
                ? parseFloat(selectedToken.balance)
                : ''
            } ${selectedToken?.symbol}`}
          </Type.SM>
          {label === 'from' && (
            <Type.SM
              color="#313144"
              fontSize="12.5px"
              padding="5px 10px"
              cursor="pointer"
              onClick={(e) => handleMax(selectedToken.balance)}
            >
              (Max)
            </Type.SM>
          )}
        </Flex>
      </Flex>
      <Flex width="100%" justifyContent="space-between">
        <Input
          aria-label={`${label}-input`}
          type="number"
          placeholder="Enter Amount"
          min={0}
          onChange={(e) => handleAmount(e.target.value, label)}
          value={amount}
          disabled={lock}
          border={
            (error && error.type && error.label === label) ||
            (lock && '1px solid red')
          }
        />
        {label === 'from' ? (
          content
        ) : (
          <Flex alignItems="center" padding="0 10px">
            <Image
              src={selectedToken.logo}
              boxSizing="unset"
              alt={selectedToken.name}
            />
            <Type.LG color="#313144" fontSizeXS="16px">
              {selectedToken.name}
            </Type.LG>
          </Flex>
        )}
      </Flex>
      <Modal
        open={open}
        hide={() => {
          setOpen(!open)
        }}
        title="Select Token"
      >
        {contentModal}
      </Modal>
    </Selector>
  )
}

export default SelectBox
