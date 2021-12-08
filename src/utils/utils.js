import { MRC20Presale_ABI } from '../constants/ABI'
import { MRC20Presale } from '../constants/contracts'
import { getContract } from '../helper/contractHelpers'

export const formatAddress = (address) => {
  return address
    ? address.substring(0, 6) +
        '...' +
        address.substring(address.length - 4, address.length)
    : 'Connect Wallet'
}

export const fromWei = (n) => {
  return web3.utils.fromWei(n, 'ether')
}

export const getUsedAmount = async (account, chainId, web3) => {
  const contract = getContract(MRC20Presale_ABI, MRC20Presale[chainId], web3)

  const amount = await contract.methods.balances(account).call()

  return fromWei(amount)
}
