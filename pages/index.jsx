import React from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'

import { useWeb3React } from '@web3-react/core'

import { Container, Wrapper } from '../src/components/home'
import WalletModal from '../src/components/common/WalletModal'
import { title } from '../src/constants/settings'
import { useMuonState } from '../src/context'

const CustomTransaction = dynamic(() =>
  import('../src/components/common/CustomTransaction')
)
const Swap = dynamic(() => import('../src/components/home/Swap'))

const Home = () => {
  const { account, chainId } = useWeb3React()
  const { state, dispatch } = useMuonState()

  const [open, setOpen] = React.useState(false)

  const updateSelectedChain = (value) => {
    dispatch({
      type: 'UPDATE_SELECTED_CHAIN',
      payload: value
    })
  }

  return (
    <>
      <Head>
        <title>{`${title} Presale`}</title>
      </Head>

      <Container>
        <Wrapper maxWidth="340px" width="100%"></Wrapper>

        <Wrapper maxWidth="600px" width="100%">
          <Swap updateSelectedChain={updateSelectedChain} />
        </Wrapper>
        <Wrapper maxWidth="340px" width="100%">
          <CustomTransaction />
        </Wrapper>
      </Container>

      <WalletModal
        open={open}
        hide={() => {
          setOpen(!open)
        }}
      />
    </>
  )
}

export default Home
