import React from 'react'
import dynamic from 'next/dynamic'
import { Flex } from 'rebass'

import { Selector, Image } from '../common/FormControlls'
import { Type } from '../text/Text'
import Token from './Token'
import { Arrow } from './swap.style'
import { ContentItem, ModalItem } from '../modal/Modal.style'

const Modal = dynamic(() => import('../modal/Modal'))

const TokensList = (props) => {
  const { selectedToken, tokensList, changeToken } = props

  const [open, setOpen] = React.useState(false)

  const handleOpenModal = () => {
    setOpen(true)
  }
  return (
    <>
      {tokensList.length > 1 ? (
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
      )}
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
              <Flex color={'#D3DBE3'}>{parseFloat(token.balance).toFixedDown(3)}</Flex>
            </ContentItem>
          </ModalItem>
        ))}
      </Modal>
    </>
  )
}

export default TokensList
