import React from 'react'
import { useWeb3React } from '@web3-react/core'

import { ERC20_ABI } from '../constants/ABI'
import multicall from '../utils/multicall'
import { getWeb3NoAccount } from '../utils/web3'
import { fromWei } from '../utils/wei'
import { MAIN_TOKEN_ADDRESS } from '../constants/tokens'

const useBalances = (chains, tokens, presaleToken, fetch, refresh) => {
  console.log({ chains, tokens })
  const { account } = useWeb3React()
  const [balances, setBalances] = React.useState(null)
  React.useEffect(() => {
    const fetchBalances = async () => {
      try {
        let tokenB = []
        // TODO do await out side of for
        for (let index = 0; index < chains.length; index++) {
          const chainId = chains[index]
          tokens = [...tokens, { ...presaleToken, chainId }]

          const web3 = getWeb3NoAccount(chainId)
          // TODO add filter main token address to other projects
          const calls = tokens
            .filter((item) => item.chainId === chainId && item.address && item.address != MAIN_TOKEN_ADDRESS)
            .map((token) => {
              return {
                address: token.address,
                name: 'balanceOf',
                params: [account],
              }
            })

          const result = await multicall(web3, ERC20_ABI, calls, chainId)
          if (result && result.length > 0) {
            for (let i = 0; i < result.length; i++) {
              let token = tokens.find((token) => token.address === calls[i].address && token.chainId === chainId)
              let balance = fromWei(result[i].toString(), token.decimals)
              tokenB.push({ ...token, balance })
            }
          }
          let token = tokens.find((token) => token.address === MAIN_TOKEN_ADDRESS && token.chainId === chainId)

          if (token) {
            const ethBalance = await web3.eth.getBalance(account)
            const balance = fromWei(ethBalance, token.decimals)
            tokenB.push({ ...token, balance })
          }
        }
        setBalances(tokenB)
      } catch (error) {
        console.log('error happend in fetch balances', error)
      }
    }
    if (account) fetchBalances()
  }, [account, fetch, refresh])
  return balances
}

export default useBalances
