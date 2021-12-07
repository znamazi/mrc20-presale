import { getContract } from './contractHelpers'
import { getBalanceNumber } from './formatBalance'
import { isAddress } from '@ethersproject/address'

export const getTokenBalance = async (
  abi,
  address,
  decimals,
  account,
  web3
) => {
  const contract = getContract(abi, address, web3)
  let balance
  if (!isAddress(address)) {
    balance = await web3.eth.getBalance(account)
  } else {
    balance = await contract.methods.balanceOf(account).call()
  }
  balance = getBalanceNumber(balance, decimals)
  return balance
}
