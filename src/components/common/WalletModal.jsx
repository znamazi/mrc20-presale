import React from 'react'
import { Flex } from 'rebass'
import { useWeb3React } from '@web3-react/core'
import { Image, Selector } from './FormControlls'
import Modal from './Modal'
import { ConnectorByName } from '../../utils/connectors'
import { Item } from '../home/Network'

const WalletModal = (props) => {
  const { open, hide } = props

  const web3React = useWeb3React()
  const { activate } = web3React
  return (
    <Modal open={open} hide={hide} title="Connect Wallet">
      {Object.keys(ConnectorByName).map((name) => {
        return (
          <Item
            key={name}
            onClick={() => {
              activate(ConnectorByName[name])
              hide()
            }}
            margin="0 0 10px"
          >
            <Flex
              padding="0 20px"
              justifyContent="space-between"
              width="100%"
              alignItems="center"
              color={"#D3DBE3"}
            >
              {name}
              <Image
                width="24px"
                height="24px"
                paddingRight="0"
                src={`/media/common/${name}.svg`}
              />
            </Flex>
          </Item>
        )
      })}
    </Modal>
  )
}

export default WalletModal
