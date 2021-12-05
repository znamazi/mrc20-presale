import React from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'

import { useWeb3React } from '@web3-react/core'

import { Container, Wrapper } from '../src/components/home'
import WalletModal from '../src/components/common/WalletModal'
import { title } from '../src/constants/settings'
import { useMuonState } from '../src/context'
import { NameChainMap } from '../src/constants/chainsMap'
import getAssetBalances from '../src/helper/getAssetBalances'
import { getContract } from '../src/helper/contractHelpers'
import { BLOOD_ABI } from '../src/constants/ABI'
import useWeb3 from '../src/helper/useWeb3'
import { getBalanceNumber } from '../src/helper/formatBalance'
import { getTokenBalance } from '../src/helper/getTokenBalance'

const CustomTransaction = dynamic(() =>
  import('../src/components/common/CustomTransaction')
)
const Swap = dynamic(() => import('../src/components/home/Swap'))

const Home = () => {
  const { account, chainId } = useWeb3React()
  const { state, dispatch } = useMuonState()
  const web3 = useWeb3()

  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const fetchBalances = async () => {
      if (account) {
        let result = await getAssetBalances(account)
        const mainTokenBalance = await getTokenBalance(
          BLOOD_ABI,
          state.mainToken.address,
          state.mainToken.decimals,
          account,
          web3
        )

        dispatch({
          type: 'UPDATE_INFO',
          payload: { result, mainTokenBalance }
        })
      }
    }
    fetchBalances()
  }, [account])

  React.useEffect(() => {
    if (account) {
      dispatch({
        type: 'UPDATE_NETWORK_INFO',
        payload: {
          account,
          chainId,
          network: NameChainMap[chainId]
        }
      })
    }
  }, [chainId, account])

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
