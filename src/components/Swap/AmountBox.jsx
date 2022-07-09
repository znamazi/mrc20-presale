import React, { useMemo } from 'react'
import { Flex } from 'rebass'
import dynamic from 'next/dynamic'
import styled from 'styled-components'

import { Selector, Image } from '../common/FormControlls'
import { Type } from '../text/Text'
import Token from './Token'
import { Max, Arrow } from './swap.style'
import { ContentItem, ModalItem } from '../modal/Modal.style'

import { LabelStatus } from '../../constants/constants'
import { tokens } from '../../constants/settings'
import { useSwap } from '../../state/swap/hooks'
import { useAppState } from '../../state/application/hooks'
import { ErrorType } from '../../constants/constants'
// import { ImageWithCursor } from './FormControlls'

const Modal = dynamic(() => import('../modal/Modal'))

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
  let { label, amount, changeToken, handleAmount, handleMax, lock, selectedToken } = props
  console.log({ label, amount, error, changeToken, handleAmount, handleMax, lock })
  const [open, setOpen] = React.useState(false)
  const swap = useSwap()
  const { margin, onChange, value } = props
  const { error, errorType } = useAppState()

  const handleOpenModal = () => {
    setOpen(true)
  }
  const tokensList = useMemo(() => tokens.filter((item) => item.chainId === swap.chain.id), [swap.chain])
  console.log(tokensList)
  let content =
    tokensList.length > 1 ? (
      <Selector
        padding="0 0 0 15px"
        maxWidth="181px"
        background={'transparent'}
        border="none"
        cursor="pointer"
        onClick={handleOpenModal}
      >
        {selectedToken ? (
          <Flex alignItems="center" mr="8px">
            <Image
              src={selectedToken.logo}
              onError={(e) => (e.target.src = '/media/tokens/default.svg')}
              boxSizing="unset"
              paddingRight="5px"
              height={'22px'}
              alt={selectedToken.symbol}
            />
            <Type.MD color="#E6ECF2" fontWeight="bold">
              {selectedToken.symbol}
            </Type.MD>
          </Flex>
        ) : (
          <Type.MD color="#E6ECF2">{'Select a Token'}</Type.MD>
        )}

        <Arrow src="/media/common/arrow-down-white.svg" alt="arrow-down" cursor="pointer" />
      </Selector>
    ) : (
      <Token logo={tokensList[0].logo} name={tokensList[0].symbol} />
    )

  return (
    <Wrapper margin={margin}>
      <Flex width="100%" justifyContent="space-between" alignItems="center">
        <Type.SM color="#313144" padding="5px 10px">
          {label}
        </Type.SM>

        <Flex justifyContent="flex-end" alignItems="center">
          <Type.SM color="#313144" margin="5px 8px">
            Balance:
            {` ${!isNaN(parseFloat(selectedToken.balance)) ? parseFloat(selectedToken.balance) : ''} ${
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
        {label === LabelStatus.FROM ? content : <Token logo={selectedToken.logo} name={selectedToken.name} />}
      </Amount>
      <Modal
        open={open}
        hide={() => {
          setOpen(!open)
        }}
        title="Select Token"
      >
        {tokensList.map((token) => (
          <ModalItem
            key={token.address}
            onClick={() => {
              changeToken(token.address)
              setOpen(!open)
            }}
          >
            <ContentItem alignItems={'center'} justifyContent="space-between" width={'100%'}>
              <Flex alignItems={'center'}>
                <Image src={token.logo} mr="8px" height={'22px'} alt={token.symbol} />
                <Type.MD color="#D3DBE3" fontWeight="bold" fontSizeXS="16px">
                  {token.symbol}
                </Type.MD>
              </Flex>
              <Flex color={'#D3DBE3'}>{token.balance}</Flex>
            </ContentItem>
          </ModalItem>
        ))}
      </Modal>
    </Wrapper>
  )
}

export default AmountBox
