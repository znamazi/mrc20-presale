import React from 'react'
import { Flex } from 'rebass'
import styled from 'styled-components'

import { Type } from '../text/Text'
import Token from './Token'
import { Max } from './swap.style'

import { LabelStatus } from '../../constants/constants'
import { useAppState } from '../../state/application/hooks'
import { ErrorType } from '../../constants/constants'
import TokensList from './TokensList'

const Amount = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #2b2b3c;
  border-radius: 5px;
  padding: 5px 10px;
  height: 45px;
  border: ${({ error }) => (error ? '2px solid #DC5151' : '1px solid #ffffff')};
`

const Wrapper = styled.div`
  width: 100%;
  margin: ${({ margin }) => (margin ? margin : '10px 0')};
`
const Input = styled.input.attrs({
  type: 'number',
  autocomplete: 'off',
  autocorrect: 'off',
  spellcheck: 'false',
})`
  max-width: 450px;
  width: 100%;
  outline-style: none;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  color: #ffffff;
  background: transparent;
  border: transparent;
  &:focus {
    outline: none;
  }
  @media screen and (max-width: 576px) {
    font-size: 16px;
  }
  ::placeholder {
    color: #909090;
    font-size: 12px;
    opacity: 1; /* Firefox */
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #909090;
    font-size: 12px;
  }

  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: #909090;
    font-size: 12px;
  }
`

const AmountBox = (props) => {
  let { label, amount, changeToken, handleAmount, handleMax, lock, selectedToken, margin, onChange, value, tokens } =
    props
  console.log({ label, amount, changeToken, handleAmount, handleMax, lock, selectedToken, margin, onChange, value })
  const { error, errorType } = useAppState()

  return (
    <Wrapper margin={margin}>
      <Flex width="100%" justifyContent="space-between" alignItems="center">
        <Type.SM color="#313144" padding="5px 10px">
          {label}
        </Type.SM>

        <Flex justifyContent="flex-end" alignItems="center">
          <Type.SM color="#313144" margin="5px 8px">
            Balance:
            {` ${!isNaN(parseFloat(selectedToken.balance)) ? parseFloat(selectedToken.balance).toFixedDown(3) : ''} ${
              selectedToken?.symbol
            }`}
          </Type.SM>
          {label === LabelStatus.FROM && (
            <Max onClick={() => onChange(selectedToken.balance)}>
              <Type.SM color="#FFFFFF" fontSize="10px" cursor="pointer">
                Max
              </Type.SM>
            </Max>
          )}
        </Flex>
      </Flex>

      <Amount error={error && errorType === ErrorType.AMOUNT_INPUT}>
        <Input value={value} placeholder="Enter Amount" min={`0`} onChange={(e) => onChange(e.target.value)} />
        {label === LabelStatus.FROM ? (
          <TokensList selectedToken={selectedToken} tokensList={tokens} />
        ) : (
          <Token logo={selectedToken.logo} name={selectedToken.name} />
        )}
      </Amount>
    </Wrapper>
  )
}

export default AmountBox
