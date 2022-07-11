import React, { useEffect, useState } from 'react'
import SelectBox from './SelectBox'
import { NameChainMap, rpcConfig } from '../../constants/chainsMap'
import { validChains } from '../../constants/settings'
import { SelectType } from '../../constants/constants'
import Modal from '../modal/Modal'
import { ContentItem, ModalItem } from '../modal/Modal.style'
import { Image } from '../common/FormControlls'
import { Type } from '../text/Text'
import { useAddChain } from '../../state/swap/hooks'

const Chain = (props) => {
  const { value, marginBottom, lock } = props
  const [chains, setChains] = useState([])
  const addChain = useAddChain()
  const [open, setOpen] = useState(false)

  const handleOpenModal = () => {
    if (lock) return
    setOpen(true)
  }
  useEffect(() => {
    fetchChain()
  }, [])

  const fetchChain = () => {
    const chains = validChains[process.env.NEXT_PUBLIC_MODE].map((item) => ({
      id: item,
      name: NameChainMap[item],
      symbol: rpcConfig[item].symbol,
    }))

    setChains(chains)
  }
  const handleChangeChain = (data) => {
    addChain(data)
  }
  return (
    <>
      <SelectBox
        label={`Select Chain`}
        marginBottom={marginBottom ? '35px' : value ? '5px' : '35px'}
        selectedValue={value}
        selectType={SelectType.CHAIN}
        handleOpenModal={handleOpenModal}
      />

      <Modal
        open={open}
        hide={() => {
          setOpen(!open)
        }}
        title="Select a chain"
      >
        {chains.map((item, index) => {
          return (
            <ModalItem
              border="1px solid #454d57"
              key={index}
              onClick={() => {
                handleChangeChain(item)
                setOpen(!open)
              }}
            >
              <ContentItem alignItems="center">
                <Image src={`/media/chains/${item?.symbol.toLowerCase()}.svg`} boxSizing="unset" />
                <Type.MD color="#D3DBE3" fontWeight="bold">
                  {item?.name}
                </Type.MD>
              </ContentItem>
            </ModalItem>
          )
        })}
      </Modal>
    </>
  )
}

export default Chain
