import React from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'

import { useWeb3React } from '@web3-react/core'

import { Container, Wrapper } from '../src/components/home'
import WalletModal from '../src/components/common/WalletModal'
import { LAUNCH_PRICE, title, validChains } from '../src/constants/settings'
import { useMuonState } from '../src/context'
import { NameChainMap } from '../src/constants/chainsMap'
import getAssetBalances from '../src/helper/getAssetBalances'
import { ERC20_ABI } from '../src/constants/ABI'
import useWeb3, { useCrossWeb3 } from '../src/helper/useWeb3'
import { getTokenBalance } from '../src/helper/getTokenBalance'
import { fetchApi } from '../src/helper/fetchApi'
import { getContract } from '../src/helper/contractHelpers'
import { MRC20Presale } from '../src/constants/contracts'
import {
  TransactionStatus,
  TransactionType
} from '../src/constants/transactionStatus'
import { useUsedAmount } from '../src/helper/useUsedAmount'

const CustomTransaction = dynamic(() =>
  import('../src/components/common/CustomTransaction')
)
const Swap = dynamic(() => import('../src/components/home/Swap'))

const Home = () => {
  const { account, chainId } = useWeb3React()
  const { state, dispatch } = useMuonState()
  const web3 = useWeb3()

  const [open, setOpen] = React.useState(false)
  const [wrongNetwork, setWrongNetwork] = React.useState(false)
  const [prices, setPrices] = React.useState()
  const [maxAllocation, setMaxAllocation] = React.useState()
  const [allocation, setAllocation] = React.useState(0)
  let usedAmount = useUsedAmount()

  React.useEffect(() => {
    if (!validChains.includes(chainId)) {
      setWrongNetwork(true)
    }
    return () => {
      setWrongNetwork(false)
    }
  }, [chainId, state.bridge, account])

  React.useEffect(() => {
    const fetchBalances = async () => {
      const mainTokenBalance = await getTokenBalance(
        ERC20_ABI,
        state.mainToken.address,
        state.mainToken.decimals,
        account,
        web3
      )
      let result = await getAssetBalances(account, web3, chainId)
      let chain = result.find((item) => item.id === state.selectedChain.id)
      let selectedToken = chain.tokens.find(
        (token) => token.address === state.selectedToken.address
      )

      dispatch({
        type: 'UPDATE_INFO',
        payload: {
          result,
          mainTokenBalance,
          selectedToken: selectedToken ? selectedToken : { ...chain.tokens[0] }
        }
      })
    }
    if (account && validChains.includes(chainId) && web3) fetchBalances()
  }, [account, chainId, web3, state.selectedChain])

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

  React.useEffect(() => {
    const fetchPrice = async () => {
      let tokens = await fetchApi('https://app.deus.finance/prices.json', {
        cache: 'no-cache'
      })

      setPrices(tokens)
    }
    fetchPrice()
  }, [])
  React.useEffect(() => {
    const fetchMaxAllocation = async () => {
      // TODO: fetchMaxAllocation api
      let allocations = {
        '0x5629227C1E2542DbC5ACA0cECb7Cd3E02C82AD0a': 10000,
        '0x8b9C5d6c73b4d11a362B62Bd4B4d3E52AF55C630': 500,
        '0xbb49a68c8EA9C2374082B738A7297c28EF3Fda26': 20000,
        '0x3Be0B18d954DF829dE5E7d968002B856bB89f104': 200000
      }
      const userAllocationAmount = allocations[account]
      if (userAllocationAmount) {
        setMaxAllocation(userAllocationAmount)
      } else {
        setMaxAllocation(0)
      }
    }
    if (account) fetchMaxAllocation()
  }, [account])

  React.useEffect(() => {
    dispatch({
      type: 'UPDATE_AMOUNT',
      payload: { amount: { from: '', to: '' }, btnType: 'select' }
    })
  }, [state.selectedToken])

  React.useEffect(() => {
    let approve
    const checkApprove = async () => {
      if (state.selectedToken.address == '0x') {
        approve = true
      } else {
        const Contract = getContract(
          ERC20_ABI,
          state.selectedToken.address,
          web3
        )
        approve = await Contract.methods
          .allowance(account, MRC20Presale[state.selectedChain.id])
          .call()
      }
      console.log({ approve })
      if (approve !== '0') {
        dispatch({
          type: 'UPDATE_APPROVE',
          payload: true
        })
      } else {
        dispatch({
          type: 'UPDATE_APPROVE',
          payload: false
        })
      }
    }
    if (account) checkApprove()
  }, [account, state.selectedToken])

  React.useEffect(() => {
    if (maxAllocation && usedAmount) setAllocation(maxAllocation - usedAmount)
  }, [usedAmount, maxAllocation])

  const updateSelectedChain = (chain) => {
    dispatch({
      type: 'UPDATE_SELECTED_CHAIN',
      payload: chain
    })
  }
  const handleConnectWallet = () => {
    setOpen(true)
  }

  const changeToken = (address) => {
    const token = state.data
      .find((chain) => chain.id === state.selectedChain.id)
      .tokens.find((item) => item.address === address)
    dispatch({
      type: 'UPDATE_SELECTED_Token',
      payload: token
    })
  }
  const handleAmount = (value, label) => {
    let amount
    let token = prices[state.selectedToken.symbol.toLowerCase()]
    if (label === 'from') {
      amount = { from: value, to: token.price / LAUNCH_PRICE }
    } else {
      amount = { from: (value * LAUNCH_PRICE) / token.price, to: value }
    }

    dispatch({
      type: 'UPDATE_AMOUNT',
      payload: { amount, btnType: state.approve ? 'deposit' : 'approve' }
    })
  }
  console.log(state)
  const handleApprove = async () => {
    try {
      if (!state.account || state.approve) return

      if (state.selectedChain.id !== state.chainId) {
        setWrongNetwork(true)
        return
      }
      if (
        state.transaction.type === TransactionType.Approve &&
        state.transaction.status === TransactionStatus.PENDING
      ) {
        return
      }
      let hash = ''
      let Contract = getContract(ERC20_ABI, state.selectedToken.address, web3)

      Contract.methods
        .approve(
          MRC20Presale[state.selectedChain.id],
          toWei('1000000000000000000')
        )
        .send({ from: state.account })
        .once('transactionHash', (tx) => {
          hash = tx
          dispatch({
            type: 'UPDATE_TRANSACTION',
            payload: {
              type: TransactionType.Approve,
              hash,
              message: 'Approving transaction is pending',
              status: TransactionStatus.PENDING,
              chainId: state.selectedChain.id,
              tokenSymbol: state.selectedToken.symbol
            }
          })
        })
        .once('receipt', ({ transactionHash }) => {
          dispatch({
            type: 'UPDATE_TRANSACTION',
            payload: {
              type: TransactionType.Approve,
              hash: transactionHash,
              message: 'Transaction successfull',
              status: TransactionStatus.SUCCESS,
              chainId: state.selectedChain.id,
              tokenSymbol: state.selectedToken.symbol
            }
          })
          dispatch({
            type: 'UPDATE_APPROVE',
            payload: true
          })
          dispatch({
            type: 'UPDATE_ACTION_BUTTON_TYPE',
            payload: 'deposit'
          })
        })
        .once('error', (error) => {
          if (!hash) {
            dispatch({
              type: 'UPDATE_TRANSACTION',
              payload: {
                type: TransactionType.Approve,
                message: 'Transaction rejected',
                status: TransactionStatus.FAILED,
                chainId: state.selectedChain.id,
                tokenSymbol: state.selectedToken.symbol
              }
            })
            return
          }

          dispatch({
            type: 'UPDATE_TRANSACTION',
            payload: {
              type: TransactionType.Approve,
              hash,
              message: 'Transaction failed',
              status: TransactionStatus.FAILED,
              chainId: state.selectedChain.id,
              tokenSymbol: state.selectedToken.symbol
            }
          })
        })
    } catch (error) {
      console.log('error happend in Approve', error)
    }
  }
  return (
    <>
      <Head>
        <title>{`${title} Presale`}</title>
      </Head>

      <Container>
        <Wrapper maxWidth="340px" width="100%"></Wrapper>

        <Wrapper maxWidth="600px" width="100%">
          <Swap
            updateSelectedChain={updateSelectedChain}
            handleConnectWallet={handleConnectWallet}
            wrongNetwork={wrongNetwork}
            changeToken={changeToken}
            handleAmount={handleAmount}
            handleApprove={handleApprove}
          />
        </Wrapper>
        <Wrapper maxWidth="340px" width="100%">
          {state.transaction.status && <CustomTransaction />}
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
