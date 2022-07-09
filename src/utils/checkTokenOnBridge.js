import { AddressZero } from '@ethersproject/constants'

import { MRC20Bridge_ABI } from '../constants/ABI'
import { getContract } from './contractHelpers'
import { MRC20Bridge } from '../constants/contracts'
import { getWeb3NoAccount } from './web3'

export const getTokenId = async (chainId, address) => {
  try {
    const web3 = getWeb3NoAccount(chainId)
  const contractBridge = getContract(MRC20Bridge_ABI, MRC20Bridge[chainId], web3)
  const tokenId = await contractBridge.methods.getTokenId(address).call()
  return tokenId
  } catch (error) {
    console.log("error happend in get token Id",error)
  }
}

export const checkTokenOnDestBridge = async (chainId, tokenId) => {
 try {
  if (!tokenId) return AddressZero
  const web3 = getWeb3NoAccount(chainId)
  const contractBridge = getContract(MRC20Bridge_ABI, MRC20Bridge[chainId], web3)
  const address = await contractBridge.methods.tokens(tokenId).call()
  return address
 } catch (error) {
   console.log("error happend in check Token On Dest Bridge",error)
 }
}
