import React from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import Muon from 'muon'
import { useWeb3React } from '@web3-react/core'

import { Container, Wrapper } from '../src/components/home'
import WalletModal from '../src/components/common/WalletModal'
import { presaleToken, title, validChains } from '../src/constants/settings'
import { useMuonState } from '../src/context'
import { NameChainMap } from '../src/constants/chainsMap'
import getAssetBalances from '../src/helper/getAssetBalances'
import { ERC20_ABI, MRC20Presale_ABI } from '../src/constants/ABI'
import useWeb3, { useCrossWeb3 } from '../src/hook/useWeb3'
import { getTokenBalance } from '../src/helper/getTokenBalance'
import { fetchApi } from '../src/helper/fetchApi'
import { getContract } from '../src/helper/contractHelpers'
import { MRC20Presale } from '../src/constants/contracts'
import {
  TransactionStatus,
  TransactionType
} from '../src/constants/transactionStatus'
import { useUsedAmount } from '../src/hook/useUsedAmount'
import { getMaxAllow } from '../src/utils/getMaxAllow'
import { BN, fromWei, toBN, toWei } from '../src/utils/utils'
import { signMsg } from '../src/utils/signMsg'
import allocations from '../src/constants/allocations.json'
import BigNumber from 'bignumber.js'
import calculateAmount from '../src/utils/calculateAmount'

const CustomTransaction = dynamic(() =>
  import('../src/components/common/CustomTransaction')
)
const Swap = dynamic(() => import('../src/components/home/Swap'))

const Home = () => {
  const { account, chainId } = useWeb3React()
  const { state, dispatch } = useMuonState()
  const web3 = useWeb3()
  const muon = new Muon(process.env.NEXT_PUBLIC_MUON_NODE_GATEWAY)

  const [open, setOpen] = React.useState(false)
  const [wrongNetwork, setWrongNetwork] = React.useState(false)
  const [prices, setPrices] = React.useState()
  const [maxAllocation, setMaxAllocation] = React.useState()
  const [allocation, setAllocation] = React.useState(0)
  const [error, setError] = React.useState('')
  const [lock, setLock] = React.useState(0)
  const [loading, setLoading] = React.useState(false)
  const [fetch, setFetch] = React.useState()
  let usedAmount = useUsedAmount(fetch)

  // check Network
  React.useEffect(() => {
    if (!validChains.includes(chainId)) {
      setWrongNetwork(true)
    }
    return () => {
      setWrongNetwork(false)
    }
  }, [chainId, state.bridge, account])

  //  set ChainId and account
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

  // Fetch Price
  React.useEffect(() => {
    const fetchPrice = async () => {
      // let tokens = await fetchApi('https://app.deus.finance/prices.json', {
      //   cache: 'no-cache'
      // })
      let tokens = {
        eth: {
          decimals: 18,
          address: '0x0000000000000000000000000000000000000000',
          price: 4010.92
        },
        bnb: {
          decimals: 18,
          address: '0x0000000000000000000000000000000000000000',
          price: 554.7
        },
        ert: {
          decimals: 18,
          address: '0xb9B5FFC3e1404E3Bb7352e656316D6C5ce6940A1',
          price: 10
        },
        ert_d6: {
          decimals: 6,
          address: '0xfBB0Aa52B82dD2173D8ce97065b2f421216A312A',
          price: 1
        },
        ertmumbai: {
          decimals: 18,
          address: '0x701048911b1f1121E33834d3633227A954978d53',
          price: 1
        }
      }
      setPrices(tokens)
    }
    fetchPrice()
  }, [])

  // Max allocation
  React.useEffect(() => {
    const fetchMaxAllocation = async () => {
      const userAllocationAmount = allocations[account]
      if (userAllocationAmount) {
        setMaxAllocation(userAllocationAmount)
      } else {
        setMaxAllocation(0)
      }
    }
    if (account) fetchMaxAllocation()
  }, [account])

  // Set allocation
  React.useEffect(() => {
    try {
      if (maxAllocation && usedAmount)
        setAllocation(new BigNumber(maxAllocation).minus(usedAmount).toFixed(3))
    } catch (error) {
      console.log('Error happend in set allocation')
    }
  }, [usedAmount, maxAllocation])

  // Fetch balances
  React.useEffect(() => {
    const fetchBalances = async () => {
      try {
        const presaleTokenBalance = await getTokenBalance(
          ERC20_ABI,
          state.presaleToken.address,
          state.presaleToken.decimals,
          account,
          web3
        )
        let result = await getAssetBalances(account, web3, chainId)

        dispatch({
          type: 'UPDATE_INFO',
          payload: {
            result,
            presaleTokenBalance
          }
        })
      } catch (error) {}
    }
    if (account && validChains.includes(chainId) && web3) {
      fetchBalances()

      let subscription = web3.eth.subscribe(
        'newBlockHeaders',
        (error, result) => {
          if (!error) {
            fetchBalances()

            return
          }

          console.error(error)
        }
      )
      return () => {
        // unsubscribes the subscription
        subscription.unsubscribe(function (error, success) {
          if (success) {
            console.log('Successfully unsubscribed!')
          }
        })
      }
    }
  }, [account, chainId, web3, state.selectedChain, fetch])

  // update Select token
  React.useEffect(() => {
    let chain = state.data.find((item) => item.id === state.selectedChain.id)
    let selectedToken = chain.tokens.find(
      (token) => token.address === state.selectedToken.address
    )
    dispatch({
      type: 'UPDATE_SELECTED_Token',
      payload: selectedToken
    })
  }, [state.data, state.selectedToken])

  // handle Amount
  React.useEffect(() => {
    if (prices && state.amount.from > 0)
      handleAmount(state.amount[state.amount.type], state.amount.type)
  }, [state.selectedToken, prices])

  // check Approve
  React.useEffect(() => {
    let approve
    const checkApprove = async () => {
      if (
        state.selectedToken.address ==
        '0x0000000000000000000000000000000000000000'
      ) {
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
    if (account && web3 && state.selectedChain.id === chainId) checkApprove()
  }, [account, state.selectedToken, web3, chainId, state.selectedChain])

  const changeChain = (chain) => {
    let selectedToken = chain.tokens.find(
      (token) => token.address === state.selectedToken.address
    )
    dispatch({
      type: 'UPDATE_SELECTED_CHAIN',
      payload: {
        chain,
        selectedToken: selectedToken ? selectedToken : { ...chain.tokens[0] }
      }
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
    try {
      let token = prices[state.selectedToken.symbol.toLowerCase()]

      let { valueFrom, valueTo } = calculateAmount(
        token,
        presaleToken,
        label,
        value
      )
      let max = getMaxAllow(token, valueFrom, allocation)

      let amount = {
        from: valueFrom,
        to: valueTo,
        type: label
      }
      setError({
        type:
          parseFloat(valueFrom) > parseFloat(max) ||
          parseFloat(valueFrom) > state.selectedToken.balance,
        label
      })
      dispatch({
        type: 'UPDATE_AMOUNT',
        payload: { amount, btnType: state.approve ? 'swap' : 'approve' }
      })
    } catch (error) {
      console.log('Error happend in HandleAmount', error)
    }
  }

  const handleMax = (balance) => {
    if (balance) {
      try {
        let token = prices[state.selectedToken.symbol.toLowerCase()]

        const max = getMaxAllow(token, balance, allocation)
        console.log({ max })
        handleAmount(max, 'from')
      } catch (error) {
        console.log('Error happend in handleMax', error)
      }
    }
  }

  const handleApprove = async () => {
    try {
      if (!account || state.approve) return

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
            payload: 'swap'
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

  const handleSwap = async () => {
    if (!state.amount.from || state.amount.from === '0') {
      setError({
        type: true,
        label: 'from'
      })
      return
    }
    if (error && error.type) {
      return
    }
    const sign = await signMsg(account, web3)
    if (!sign) {
      dispatch({
        type: 'UPDATE_TRANSACTION',
        payload: {
          type: TransactionType.SWAP,
          message: 'Failed to sign',
          status: TransactionStatus.FAILED,
          chainId: state.selectedChain.id,
          tokenSymbol: state.selectedToken.symbol,
          decimals: state.selectedToken.decimals
        }
      })
      return
    }
    setLoading(true)
    try {
      console.log({ amount: state.amount.from, type: typeof state.amount.from })
      let fixedValue = Number(state.amount.from).toFixed(
        state.selectedToken.decimals
      )
      const muonResponse = await muon
        .app('fear_presale')
        .method('deposit', {
          hashTimestamp: true,
          forAddress: account,
          token: state.selectedToken.symbol,
          chainId: state.selectedChain.id,
          sign,
          amount: toWei(fixedValue, state.selectedToken.decimals),
          presaleToken: {
            decimals: presaleToken.decimals,
            price: presaleToken.price
          }
        })
        .call()
      if (!muonResponse.confirmed) {
        const errorMessage = muonResponse.error?.message
          ? muonResponse.error.message
          : muonResponse.error
          ? muonResponse.error
          : 'Muon response failed'
        dispatch({
          type: 'UPDATE_TRANSACTION',
          payload: {
            type: TransactionType.SWAP,
            message: errorMessage,
            status: TransactionStatus.FAILED,
            chainId: state.selectedChain.id,
            tokenSymbol: state.selectedToken.symbol,
            decimals: state.selectedToken.decimals
          }
        })
        if (muonResponse.error.lockTime) {
          setLock(muonResponse.error.expireAt)
        }
        setLoading(false)

        return
      }
      let {
        sigs,
        reqId,
        data: {
          result: { extraParameters, token, presaleTokenPrice, forAddress }
        }
      } = muonResponse
      setLoading(false)
      let hash = ''
      let Contract = getContract(
        MRC20Presale_ABI,
        MRC20Presale[state.selectedChain.id],
        web3
      )
      let sendArguments = { from: state.account }
      if (
        state.selectedToken.address ===
        '0x0000000000000000000000000000000000000000'
      ) {
        sendArguments['value'] = extraParameters[3]
      }
      Contract.methods
        .deposit(
          token,
          presaleTokenPrice,
          forAddress,
          extraParameters,
          reqId,
          sigs
        )
        .send(sendArguments)
        .once('transactionHash', (tx) => {
          hash = tx
          dispatch({
            type: 'UPDATE_TRANSACTION',
            payload: {
              type: TransactionType.SWAP,
              hash,
              message: 'Swap transaction is pending',
              amount: state.amount.from,
              status: TransactionStatus.PENDING,
              chainId: state.selectedChain.id,
              tokenSymbol: state.selectedToken.symbol,
              decimals: state.selectedToken.decimals
            }
          })
        })
        .once('receipt', ({ transactionHash }) => {
          dispatch({
            type: 'UPDATE_TRANSACTION',
            payload: {
              type: TransactionType.SWAP,
              hash: transactionHash,
              message: 'Transaction successfull',
              amount: state.amount.from,
              status: TransactionStatus.SUCCESS,
              chainId: state.selectedChain.id,
              tokenSymbol: state.selectedToken.symbol,
              decimals: state.selectedToken.decimals
            }
          })
          setFetch(transactionHash)
          dispatch({
            type: 'UPDATE_AMOUNT',
            payload: {
              amount: { from: '', to: '' },
              btnType: 'swap'
            }
          })
        })
        .once('error', (error) => {
          if (!hash) {
            dispatch({
              type: 'UPDATE_TRANSACTION',
              payload: {
                type: TransactionType.SWAP,
                message: 'Transaction rejected',
                amount: state.amount.from,
                status: TransactionStatus.FAILED,
                chainId: state.selectedChain.id,
                tokenSymbol: state.selectedToken.symbol,
                decimals: state.selectedToken.decimals
              }
            })
            return
          }

          dispatch({
            type: 'UPDATE_TRANSACTION',
            payload: {
              type: TransactionType.SWAP,
              hash,
              message: 'Transaction failed',
              amount: state.amount.from,
              status: TransactionStatus.FAILED,
              chainId: state.selectedChain.id,
              tokenSymbol: state.selectedToken.symbol,
              decimals: state.selectedToken.decimals
            }
          })
        })
    } catch (error) {
      setLoading(false)

      dispatch({
        type: 'UPDATE_TRANSACTION',
        payload: {
          type: TransactionType.SWAP,
          message: error.message,
          status: TransactionStatus.FAILED,
          chainId: state.selectedChain.id,
          tokenSymbol: state.selectedToken.symbol,
          decimals: state.selectedToken.decimals
        }
      })
      console.log('error happend in Swap', error)
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
            changeChain={changeChain}
            handleConnectWallet={handleConnectWallet}
            wrongNetwork={wrongNetwork}
            changeToken={changeToken}
            handleAmount={handleAmount}
            handleApprove={handleApprove}
            handleMax={handleMax}
            handleSwap={handleSwap}
            error={error}
            lock={lock}
            setLock={() => setLock(0)}
            loading={loading}
          />
        </Wrapper>
        <Wrapper maxWidth="340px" width="100%">
          {state.transaction.status && <CustomTransaction />}
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
