import React from 'react'
import { Flex } from 'rebass'
import { token } from '../../constants/settings'
import { useMuonState } from '../../context'
import { Selector, Select, Input, Image } from '../common/FormControlls'
import { Type } from '../common/Text'

const SelectBox = ({ label, amount, error }) => {
  const { state, dispatch } = useMuonState()

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
            Balance: 10
          </Type.SM>
          {label === 'from' && (
            <Type.SM
              fontFamily="FH Oscar"
              color="#313144"
              fontSize="12.5px"
              padding="5px 10px"
              onClick={(e) => handleAmount(defaultWallet.balance, label)}
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
          <Select
            id={label}
            onChange={(e) => changeWallet(e.target.value, label)}
            // value={defaultWallet.name}
          >
            {state.selectedChain.tokens.map((token) => (
              <option key={token.address} value={token}>
                {token.symbol}
              </option>
            ))}
          </Select>
        ) : (
          <Flex alignItems="center" padding="0 10px">
            <Image src={token.logo} boxSizing="unset" />
            <Type.LG fontFamily="FH Oscar" color="#313144" fontSizeXS="16px">
              {token.name}
            </Type.LG>
          </Flex>
        )}
      </Flex>
    </Selector>
  )
}

export default SelectBox
