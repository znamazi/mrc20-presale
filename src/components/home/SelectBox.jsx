import React from 'react'
import { Flex } from 'rebass'
import { useMuonState } from '../../context'
import { Selector, Select, Input, Image } from '../common/FormControlls'
import { Type } from '../common/Text'

const SelectBox = (props) => {
  const { state } = useMuonState()
  let { label, amount, error, selectedToken, changeToken, handleAmount } = props
  console.log('bbbbbbbbbbbbbbbb', parseFloat(selectedToken.balance))

  let content =
    state.selectedChain.tokens.length > 1 ? (
      <Select
        id={label}
        onChange={(e) => changeToken(e.target.value)}
        // value={defaultWallet.name}
      >
        {state.selectedChain.tokens.map((token) => (
          <option key={token.address} value={token.address}>
            {token.symbol}
          </option>
        ))}
      </Select>
    ) : (
      <Flex alignItems="center" padding="0 10px">
        <Image src={state.selectedChain.tokens[0].logo} boxSizing="unset" />
        <Type.LG fontFamily="FH Oscar" color="#313144" fontSizeXS="16px">
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
        <Type.SM
          fontFamily="FH Oscar"
          color="#313144"
          fontSize="12.5px"
          padding="5px 10px"
        >
          {label}
        </Type.SM>
        <Flex justifyContent="flex-end" alignItems="center">
          <Type.SM
            fontFamily="FH Oscar"
            color="#313144"
            fontSize="12.5px"
            padding="5px 10px"
          >
            Balance:
            {` ${
              !isNaN(parseFloat(selectedToken.balance))
                ? parseFloat(selectedToken.balance)
                : ''
            } ${selectedToken?.symbol}`}
          </Type.SM>
          {label === 'from' && (
            <Type.SM
              fontFamily="FH Oscar"
              color="#313144"
              fontSize="12.5px"
              padding="5px 10px"
              onClick={(e) => handleAmount(selectedToken.balance, label)}
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
          onChange={(e) => handleAmount(e.target.value, label)}
          value={amount}
          border={error && error.label === label && '1px solid red'}
        />
        {label === 'from' ? (
          content
        ) : (
          <Flex alignItems="center" padding="0 10px">
            <Image src={selectedToken.logo} boxSizing="unset" />
            <Type.LG fontFamily="FH Oscar" color="#313144" fontSizeXS="16px">
              {selectedToken.name}
            </Type.LG>
          </Flex>
        )}
      </Flex>
    </Selector>
  )
}

export default SelectBox
