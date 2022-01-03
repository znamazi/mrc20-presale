import dynamic from 'next/dynamic'
import React from 'react'
import { Flex } from 'rebass'
import styled from 'styled-components'
const CopyToClipboard = dynamic(() => import('react-copy-to-clipboard'))
// import { CopyToClipboard } from 'react-copy-to-clipboard'
import {
  LinkType,
  TransactionStatus,
  TransactionType
} from '../../constants/transactionStatus'
import { useMuonState } from '../../context'
import { getTransactionLink } from '../../utils/explorers'
import { Box } from './Container'
import { Button, Link, ImageSpin } from './FormControlls'
import { Type } from './Text'

const Close = styled.span`
  fontsize: 12.5px;
  color: #919191;
  cursor: pointer;
`
const Image = styled.img`
  padding: 0 10px;
`

const CustomTransaction = () => {
  const { state, dispatch } = useMuonState()
  const [copy, setCopy] = React.useState(false)
  const chain = state.data.find((item) => item.id === state.transaction.chainId)
  React.useEffect(() => {
    setCopy(false)
    return () => {
      setCopy(false)
    }
  }, [state.transaction])

  const handleClose = () => {
    dispatch({
      type: 'UPDATE_TRANSACTION',
      payload: {
        status: ''
      }
    })
  }
  return (
    <Box padding="15px 15px 5px" borderRadius="10px" background="linear-gradient(0deg, #E7EBF3 0%, rgba(231, 235, 243, 0.25) 105.18%)" >
      <Flex justifyContent="space-between" width="100%" >
        <Type.SM fontSize="12.5px" color="#919191">
          {state.transaction.type.charAt(0).toUpperCase() +
            state.transaction.type.slice(1)}
        </Type.SM>
        <Close onClick={handleClose}>&times;</Close>
      </Flex>
      <Flex
        justifyContent="flex-start"
        width="100%"
        marginTop="15px"
        alignItems="center"
      >
        <Type.SM fontSize="12.5px" color="#313144">
          {chain.name}
        </Type.SM>
      </Flex>
      <Flex justifyContent="flex-start" width="100%" marginTop="3px">
        <Type.LG color="#313144" fontWeight="bold" fontSizeXS="16px">
          {`${state.transaction.amount ? state.transaction.amount : ''} ${state.transaction.tokenSymbol ? state.transaction.tokenSymbol : ''
            }`}
        </Type.LG>
      </Flex>
      <Flex
        justifyContent="center"
        flexDirection="column"
        width="100%"
        margin="30px 0 15px"
      // maxWidth="300px"
      >
        <Button
          // maxWidth="300px"
          height="35px"
          background="rgba(255, 255, 255, 0.5)"
          border={
            state.transaction.status === TransactionStatus.PENDING
              ? '0.5px solid #d2d2d2'
              : state.transaction.status === TransactionStatus.SUCCESS
                ? '0.5px solid rgba(0, 227, 118, 1)'
                : '0.5px solid rgba(255, 164, 81, 1)'
          }
        >
          <Flex
            justifyContent="space-between"
            width="100%"
            padding="0 10px 0 0"
            alignItems="center"
          >
            <Flex maxWidth="300px" width="100%" alignItems="center">
              {state.transaction.status === 'pending' ? (
                <ImageSpin
                  src={`/media/common/${state.transaction.status}.svg`}
                />
              ) : (
                <Image src={`/media/common/${state.transaction.status}.svg`} />
              )}
              <Link
                target="_blink"
                href={getTransactionLink(
                  state.transaction.chainId,
                  state.transaction.hash,
                  LinkType.Transaction
                )}
              >
                <Type.SM fontSize="12.5px" color="#313144" fontSizeXS="10px">
                  {state.transaction.message}
                </Type.SM>
              </Link>
            </Flex>
            <CopyToClipboard
              text={state.transaction.hash}
              onCopy={() => setCopy(true)}
            >
              {copy ? (
                <Type.XS color="#5551ff">copied</Type.XS>
              ) : (
                <img src="/media/common/copy.svg" />
              )}
            </CopyToClipboard>
          </Flex>
        </Button>
      </Flex>
    </Box>
  )
}

export default CustomTransaction
