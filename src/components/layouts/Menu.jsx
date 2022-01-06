import React from 'react'
import { Flex } from 'rebass'
import dynamic from 'next/dynamic'

import styled from 'styled-components'
import { Type } from '../common/Text'
import { formatAddress } from '../../utils/utils'
import { useWeb3React } from '@web3-react/core'
import { NameChainMap } from '../../constants/chainsMap'
import MuonNetwork from '../common/MuonNetwork'
import { validChains } from '../../constants/settings'
import { addRPC } from '../../helper/addRPC'
// import WalletModal from '../common/WalletModal'
const WalletModal = dynamic(() => import('../common/WalletModal'))

const AppInfo = styled(Flex)`
  & > * {
    margin-right: 10px;
  }
`

const Button = styled.button`
  padding: ${({ padding }) => (padding ? padding : '0 15px')};
  cursor: ${({ active }) => (active ? 'pointer' : 'default')};
  border: ${({ active, border }) =>
    border ? border : active ? '1px solid #00AA58' : '1px solid #d2d2d2'};
  height: 35px;
  background: #f8faff;
  border-radius: 5px;
  box-sizing: border-box;
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
  &:hover {
    filter: ${({ active }) => (active ? 'brightness(0.9)' : 'brightness(1)')};
  }
`
const Status = styled.div`
  background-color: ${({ active, color }) =>
    color ? color : active ? '#00e376' : '#FFA451'};
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
        <MuonNetwork logo="muonNetwork" />
      </AppInfo>
      <AppInfo>
        {account ? (
          validChains.includes(chainId) ? (
            <Button padding="0 17px !important" active={account}>
              <Status active={account} />
              <Type.SM fontSize="15px" color="#313144">
                {formatAddress(account)}
              </Type.SM>
            </Button>
          ) : (
            <Button
              padding="0 17px !important"
              active={account}
              onClick={() => addRPC(validChains[0])}
            >
              <Type.SM fontSize="15px" color="#313144">
                Change to {NameChainMap[validChains[0]]}
              </Type.SM>
            </Button>
          )
        ) : (
          <Button
            padding="0 17px !important"
            onClick={handleConnect}
            active={account}
          >
            <Status active={account} />
            <Type.SM fontSize="15px" color="#313144" cursor="pointer">
              Connect Wallet
            </Type.SM>
          </Button>
        )}

        {validChains.includes(chainId) ? (
          NameChainMap[chainId] && (
            <Button
              hide={!NameChainMap[chainId]}
              active={validChains.includes(chainId)}
            >
              <Label>Network:</Label>
              <Type.SM fontSize="15px" color="#313144" padding="0 0 0 3px">
                {NameChainMap[chainId] || 'NaN'}
              </Type.SM>
            </Button>
          )
        ) : (
          <Button border="1px solid #DC0000">
            <Status color="#DC0000" />
            <Type.MD color="#313144" padding="0 0 0 3px">
              Wrong Network
            </Type.MD>
          </Button>
        )}
      </AppInfo>
      <WalletModal open={open} hide={() => setOpen(!open)} />
    </>
  )
}

export default Menu
