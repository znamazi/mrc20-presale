import { ERC20_ABI } from '../constants/ABI'
import multicall from './multicall'
import { getBalanceNumber } from '../helper/formatBalance'
import { networks } from '../constants/settings'

const getAssetBalances = async (account, web3, chainId) => {
  const chain = networks.find((item) => item.id === chainId)
  const calls = chain.tokens
    .filter(
      (item) =>
        item.address &&
        item.address != '0x0000000000000000000000000000000000000000'
    )
    .map((token) => {
      return {
        address: token.address,
        name: 'balanceOf',
        params: [account]
      }
    })

  const result = await multicall(web3, ERC20_ABI, calls, chainId)
  if (result && result.length > 0) {
    for (let i = 0; i < result.length; i++) {
      const balance = result[i]
      const address = calls[i].address
      let token = chain.tokens.find((token) => token.address === address)
      token.balance = getBalanceNumber(balance, token.decimals)
    }
  }
  let token = chain.tokens.find(
    (token) => token.address === '0x0000000000000000000000000000000000000000'
  )
  if (token) {
    const ethBalance = await web3.eth.getBalance(account)
    token.balance = getBalanceNumber(ethBalance, token.decimals)
  }
  const index = networks.findIndex((item) => item.id === chainId)
  networks.splice(index, 1, chain)
  return networks
}

export default getAssetBalances
