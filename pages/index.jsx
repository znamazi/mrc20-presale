import React from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import Muon from 'muon'
import { useWeb3React } from '@web3-react/core'

import {
  Container,
  Wrapper,
  ClaimWrapper,
  SoldOut
} from '../src/components/home'
import WalletModal from '../src/components/common/WalletModal'
import {
  presaleToken,
  title,
  tokensPrice,
  validChains
} from '../src/constants/settings'
import { useMuonState } from '../src/context'
import { NameChainMap } from '../src/constants/chainsMap'
import getAssetBalances from '../src/helper/getAssetBalances'
import { ERC20_ABI, MRC20Presale_ABI } from '../src/constants/ABI'
import useWeb3 from '../src/hook/useWeb3'
import { getTokenBalance } from '../src/helper/getTokenBalance'
import { getContract } from '../src/helper/contractHelpers'
import { MRC20Presale } from '../src/constants/contracts'
import {
  LockType,
  TransactionStatus,
  TransactionType
} from '../src/constants/transactionStatus'
import { useUsedAmount } from '../src/hook/useUsedAmount'
import { getMaxAllow } from '../src/utils/getMaxAllow'
import { toWei } from '../src/utils/utils'
import { signMsg } from '../src/utils/signMsg'
import allocations from '../src/constants/allocations.json'
import BigNumber from 'bignumber.js'
import calculateAmount from '../src/utils/calculateAmount'
import { useMuonLock } from '../src/hook/useMuonLock'
// import UserNotExist from '../src/components/home/UserNotExist'
import useClaimable from '../src/hook/useClaimable'
import Claim from '../src/components/home/Claim'
import UserNotExist from '../src/components/home/NotExistModal'
import { LabelStatus } from '../src/constants/constants'
import { MAIN_TOKEN_ADDRESS } from '../src/constants/tokens'
import sendTx from '../src/utils/sendTx'
import { Type } from '../src/components/common/Text'
import useTokenLeft from '../src/hook/useTokenLeft'

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
  const [prices, setPrices] = React.useState(tokensPrice)
  const [maxAllocation, setMaxAllocation] = React.useState()
  const [allocation, setAllocation] = React.useState(0)
  const [error, setError] = React.useState('')
  const [lock, setLock] = React.useState(0)
  const [lockType, setLockType] = React.useState()
  const [loading, setLoading] = React.useState(false)
  const [fetch, setFetch] = React.useState()
  const [openUserNotExist, setOpenUserNotExist] = React.useState(false)
  const [holderPublicTime, setHolderPublicTime] = React.useState()
  const [publicTime, setPublicTime] = React.useState()
  const [claimTime, setClaimTime] = React.useState()
  const [totalTokenLeft, setTotalTokenLeft] = React.useState()

  let usedAmount = useUsedAmount(fetch)
  let muonLock = useMuonLock(fetch)
  let claim = useClaimable(fetch)
  let tokenLeft = useTokenLeft(fetch)

  // Get claim Time
  React.useEffect(() => {
    const fetchClaimTime = async () => {
      if (!MRC20Presale[chainId]) {
        console.log(`there isn't presale contract in chainId = ${chainId}`)
        return
      }

      try {
        const contract = getContract(
          MRC20Presale_ABI,
          MRC20Presale[chainId],
          web3
        )
        const claimTime = await contract.methods.claimTime().call()
        setClaimTime(claimTime * 1000)
      } catch (error) {
        console.log('Error happend in fetchClaimTime', error)
      }
    }
    if (web3 && validChains.includes(chainId)) fetchClaimTime()
  }, [chainId, web3])

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

  // check lock
  React.useEffect(() => {
    setLock(muonLock.expire)
    setLockType(muonLock.lockType)
    setPublicTime(muonLock.publicTime)
    setHolderPublicTime(muonLock.holderPublicTime)
  }, [muonLock])

  React.useEffect(() => {
    if (tokenLeft === 0) {
      setLockType(LockType.SOLD_OUT)
      setLock(true)
      dispatch({
        type: 'UPDATE_ACTION_BUTTON_TYPE',
        payload: 'soldOut'
      })
    }
    setTotalTokenLeft(tokenLeft)
  }, [tokenLeft])

  // // set lockType
  // React.useEffect(() => {
  //   if (lock) {
  //     if (Date.now() < publicTime && Number(allocation) <= 0) {
  //       setLockType(LockType.Allocation)
  //     } else {
  //       setLockType(LockType.Cooldown)
  //     }
  //   }
  // }, [lock, allocation, publicTime])

  // Max allocation
  React.useEffect(() => {
    const fetchMaxAllocation = async () => {
      const userAllocationAmount = allocations[account]
      if (userAllocationAmount) {
        setOpenUserNotExist(false)
        setMaxAllocation(userAllocationAmount)
      } else {
        setOpenUserNotExist(true)
        setMaxAllocation(0)
        setAllocation(0)
      }
    }
    if (account) fetchMaxAllocation()
  }, [account])

  // Set allocation
  React.useEffect(() => {
    try {
      if (maxAllocation && usedAmount) {
        setAllocation(new BigNumber(maxAllocation).minus(usedAmount).toFixed(3))
      }
    } catch (error) {
      console.log('Error happened in set allocation')
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
      handleAmount(
        state.amount[state.amount.type.toLowerCase()],
        state.amount.type
      )
  }, [state.selectedToken, prices])

  // check Approve
  React.useEffect(() => {
    let approve
    const checkApprove = async () => {
      if (state.selectedToken.address == MAIN_TOKEN_ADDRESS) {
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
          payload: {
            approve: true,
            btnType: totalTokenLeft === 0 ? 'soldOut' : 'swap'
          }
        })
      } else {
        dispatch({
          type: 'UPDATE_APPROVE',
          payload: {
            approve: false,
            btnType: totalTokenLeft === 0 ? 'soldOut' : 'approve'
          }
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
      let max = getMaxAllow(token, valueFrom, allocation, holderPublicTime)
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
        payload: {
          amount,
          btnType:
            totalTokenLeft === 0
              ? 'soldOut'
              : state.approve
              ? 'swap'
              : 'approve'
        }
      })
    } catch (error) {
      console.log('Error happened in HandleAmount', error)
    }
  }

  const handleMax = (balance) => {
    if (balance) {
      try {
        let token = prices[state.selectedToken.symbol.toLowerCase()]

        const max = getMaxAllow(token, balance, allocation, holderPublicTime)
        handleAmount(max, LabelStatus.FROM)
      } catch (error) {
        console.log('Error happened in handleMax', error)
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
      const sendArguments = { from: state.account }
      const txInfo = {
        chainId: state.selectedChain.id,
        tokenSymbol: state.selectedToken.symbol
      }
      let Contract = getContract(ERC20_ABI, state.selectedToken.address, web3)
      sendTx(
        dispatch,
        Contract,
        'approve',
        [MRC20Presale[state.selectedChain.id], toWei('1000000000000000000')],
        sendArguments,
        txInfo
      ).then(() => {
        dispatch({
          type: 'UPDATE_APPROVE',
          payload: { approve: true }
        })
        dispatch({
          type: 'UPDATE_ACTION_BUTTON_TYPE',
          payload: 'swap'
        })
      })
    } catch (error) {
      console.log('error happened in Approve', error)
    }
  }

  const handleSwap = async () => {
    //show modal if user dont have any allocation
    if (lock && lockType === LockType.Allocation) {
      setOpenUserNotExist(true)
      return
    }
    if (lock) return

    if (
      !state.amount.from ||
      state.amount.from === '0' ||
      parseFloat(state.amount.from) <= 0
    ) {
      setError({
        type: true,
        label: LabelStatus.FROM
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
          type: TransactionType.DEPOSIT,
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
      let fixedValue = Number(state.amount.from)
        .toFixedDown(state.selectedToken.decimals)
        .toString()
      const muonResponse = await muon
        .app('fear_presale')
        .method('deposit', {
          hashTimestamp: true,
          forAddress: account,
          token: state.selectedToken.symbol,
          chainId: state.selectedChain.id,
          sign,
          amount: toWei(fixedValue, state.selectedToken.decimals)
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
            type: TransactionType.DEPOSIT,
            message: errorMessage,
            status: TransactionStatus.FAILED,
            chainId: state.selectedChain.id,
            tokenSymbol: state.selectedToken.symbol,
            decimals: state.selectedToken.decimals
          }
        })
        if (muonResponse.error.lockTime) {
          setLock(muonResponse.error.expireAt)
        } else {
          setFetch(Date.now())
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
      let Contract = getContract(
        MRC20Presale_ABI,
        MRC20Presale[state.selectedChain.id],
        web3
      )
      let sendArguments = { from: state.account }
      if (state.selectedToken.address === MAIN_TOKEN_ADDRESS) {
        sendArguments['value'] = extraParameters[3]
      }
      const txInfo = {
        amount: state.amount.from,
        chainId: state.selectedChain.id,
        tokenSymbol: state.selectedToken.symbol,
        decimals: state.selectedToken.decimals
      }
      sendTx(
        dispatch,
        Contract,
        'deposit',
        [token, presaleTokenPrice, forAddress, extraParameters, reqId, sigs],
        sendArguments,
        txInfo
      )
        .then(() => {
          setFetch(Date.now())
          dispatch({
            type: 'UPDATE_AMOUNT',
            payload: {
              amount: { from: '', to: '' },
              btnType: 'swap'
            }
          })
        })
        .catch(() => {
          setFetch(Date.now())
        })
    } catch (error) {
      setLoading(false)

      dispatch({
        type: 'UPDATE_TRANSACTION',
        payload: {
          type: TransactionType.DEPOSIT,
          message: error.message,
          status: TransactionStatus.FAILED,
          chainId: state.selectedChain.id,
          tokenSymbol: state.selectedToken.symbol,
          decimals: state.selectedToken.decimals
        }
      })
      setFetch(Date.now())

      console.log('error happened in Deposit', error)
    }
  }

  const handleClaim = async () => {
    try {
      const sendArguments = { from: account }
      const txInfo = {
        amount: claim,
        chainId: chainId,
        tokenSymbol: presaleToken.symbol,
        decimals: presaleToken.decimals
      }
      const contract = getContract(
        MRC20Presale_ABI,
        MRC20Presale[chainId],
        web3
      )
      sendTx(dispatch, contract, 'claim', '', sendArguments, txInfo).then(() =>
        setFetch(Date.now())
      )
    } catch (error) {
      console.log('error happend in Claim', error)
    }
  }

  let showLock =
    lock && Date.now() < publicTime ? (
      <UserNotExist
        open={openUserNotExist}
        lock={lock}
        hide={() => {
          setOpenUserNotExist(!openUserNotExist)
        }}
        setLock={() => setLock(0)}
      />
    ) : (
      ''
    )
  return (
    <>
      <Head>
        <title>{`${title} Presale`}</title>
      </Head>
      {totalTokenLeft === 0 && (
        <SoldOut>
          <Type.XXXL
            color="#5551FF"
            fontSize="100px"
            fontWeight="bold"
            fontSizeXS="65px"
          >
            SOLD OUT!
          </Type.XXXL>
        </SoldOut>
      )}
      <Container>
        <Wrapper maxWidth="300px" width="100%"></Wrapper>
        <Wrapper maxWidth="470px" width="100%" margin={'auto'}>
          {totalTokenLeft !== undefined && (
            <Swap
              changeChain={changeChain}
              handleConnectWallet={handleConnectWallet}
              wrongNetwork={wrongNetwork}
              changeToken={changeToken}
              handleAmount={handleAmount}
              handleApprove={handleApprove}
              handleMax={handleMax}
              handleSwap={handleSwap}
              openUserNotExist={openUserNotExist}
              setOpenUserNotExist={setOpenUserNotExist}
              error={error}
              lock={lock}
              setLock={() => setLock(0)}
              loading={loading}
              publicTime={publicTime}
              holderPublicTime={holderPublicTime}
              remainedAllocation={allocation}
              lockType={lockType}
              totalTokenLeft={totalTokenLeft}
            />
          )}
        </Wrapper>
        <ClaimWrapper maxWidth="300px" width="100%">
          {state.transaction.status && <CustomTransaction />}
          {claim > 0 && claimTime && (
            <Claim
              amountClaim={claim}
              claimTime={claimTime}
              handleClaim={handleClaim}
            />
          )}
        </ClaimWrapper>
      </Container>

      {showLock}

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
