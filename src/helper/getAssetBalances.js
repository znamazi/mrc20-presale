import { ERC20_ABI } from '../constants/ABI'
import multicall from './multicall'
import { getBalanceNumber } from '../helper/formatBalance'
import { networks } from '../constants/settings'

const getAssetBalances = async (account) => {
  for (let index = 0; index < networks.length; index++) {
    const chain = networks[index]
    const calls = chain.tokens
      .filter((item) => item.address && item.address != '0x')
      .map((token) => {
        return {
          address: token.address,
          name: 'balanceOf',
          params: [account]
        }
      })
    const result = await multicall(chain.web3, ERC20_ABI, calls, chain.id)
    if (result && result.length > 0) {
      for (let i = 0; i < result.length; i++) {
        const balance = result[i]
        const address = calls[i].address
        let token = chain.tokens.find((token) => token.address === address)
        token.balance = getBalanceNumber(balance, token.decimals)
      }
    }
    const ethBalance = await chain.web3.eth.getBalance(account)
    let token = chain.tokens.find((token) => token.address === '0x')
    token.balance = getBalanceNumber(ethBalance, token.decimals)
  }
  return networks
}

export default getAssetBalances
