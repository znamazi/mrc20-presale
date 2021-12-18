import React from 'react'
import { Flex } from 'rebass'
import dynamic from 'next/dynamic'

import styled from 'styled-components'
import { Type } from '../common/Text'
import { formatAddress } from '../../utils/utils'
import { useWeb3React } from '@web3-react/core'
import { NameChainMap } from '../../constants/chainsMap'
import { Image } from '../common/FormControlls'
// import WalletModal from '../common/WalletModal'
const WalletModal = dynamic(() => import('../common/WalletModal'))

const AppInfo = styled(Flex)`
  & > * {
    margin-right: 10px;
  }
`

const Button = styled.button`
  padding: ${({ padding }) => (padding ? padding : '0 15px')};
  height: 35px;
  background: rgba(255, 255, 255, 0.5);
  border: 0.5px solid #d2d2d2;
  box-sizing: border-box;
  border-radius: 10px;
  font-family: 'FH Oscar';
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #919191;
  @media (max-width: 380px) {
    font-size: 13px !important;
    padding: 0 3px;
  }
  @media (max-width: 767px) {
    display: ${({ hide }) => (hide ? 'none' : 'flex')};
  }
`
const Status = styled.div`
  background-color: ${({ active }) => (active ? '#00e376' : '#FFA451')};
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 5px;
`
const Media = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 767px) {
    display: none;
  }
`
const Label = styled.span`
  @media (max-width: 767px) {
    display: none;
  }
`

const Menu = () => {
  const { account, chainId } = useWeb3React()

  const [open, setOpen] = React.useState(false)

  const handleConnect = async () => {
    setOpen(true)
  }

  return (
    <>
      <AppInfo>
        <Image src="/media/common/logo.svg" alt="logo" />
        <Media>
          <Image src="/media/common/muon.svg" alt="Muon Network" />
        </Media>
        <Media>
          <Type.LG color="#5F5CFE">Tools</Type.LG>
        </Media>
      </AppInfo>
      <AppInfo>
        <Button padding="0 17px !important">
          <Status active={account} />
          {account ? (
            <Type.SM fontSize="15px" fontFamily="FH Oscar" color="#313144">
              {formatAddress(account)}
            </Type.SM>
          ) : (
            <Type.SM
              fontSize="15px"
              fontFamily="FH Oscar"
              color="#313144"
              cursor="pointer"
              onClick={handleConnect}
            >
              Connect Wallet
            </Type.SM>
          )}
        </Button>

        <Button hide={!NameChainMap[chainId]}>
          <Label>Network:</Label>
          <Type.SM
            fontSize="15px"
            fontFamily="FH Oscar"
            color="#313144"
            padding="0 0 0 3px"
          >
            {NameChainMap[chainId] || 'NaN'}
          </Type.SM>
        </Button>
      </AppInfo>
      <WalletModal open={open} hide={() => setOpen(!open)} />
    </>
  )
}

export default Menu
