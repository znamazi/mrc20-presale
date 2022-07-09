import styled from 'styled-components'
import { Type } from '../text/Text'
import { Flex } from 'rebass'
import { useAppState } from '../../state/application/hooks'
import { ErrorType } from '../../constants/constants'
// import { ImageWithCursor } from './FormControlls'

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
const Max = styled.div`
  background-color: #9c9bf3;
  align-items: center;
  border-radius: 5px;
  text-align: center;
  padding: 2px 4px;
  cursor: pointer;
  &:hover {
    background-color: #6f6dc5;
    div {
      color: #fff;
    }
  }
`
const AmountBox = (props) => {
  const { margin, onChange, value, tokenBalance } = props
  const { error, errorType } = useAppState()
  return (
    <Wrapper margin={margin}>
      <Flex width="100%" justifyContent="space-between" alignItems="center">
        <Type.SM color="#313144" fontSize="12.5px" padding="5px 10px">
          Amount
        </Type.SM>

        <Flex justifyContent="flex-end" alignItems="center">
          <Type.SM color="#919191" fontSize="12.5px" padding="5px 10px">
            {tokenBalance}
          </Type.SM>
          <Max onClick={() => onChange(tokenBalance.split(' ')[0])}>
            <Type.SM color="#FFFFFF" fontSize="10px" cursor="pointer">
              Max
            </Type.SM>
          </Max>
        </Flex>
      </Flex>

      <Amount error={error && errorType === ErrorType.AMOUNT_INPUT}>
        <Input value={value} placeholder="Enter Amount" min={`0`} onChange={(e) => onChange(e.target.value)} />
      </Amount>
    </Wrapper>
  )
}

export default AmountBox
