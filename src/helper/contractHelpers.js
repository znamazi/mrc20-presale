import web3NoAccount from './web3'
import { MultiCall_ABI } from '../constants/ABI'
import { MULTICALL_NETWORKS } from '../constants/multicallContracts'
import { ChainMap } from '../constants/chainsMap'

export const getContract = (abi, address, web3) => {
  // const _web3 = web3 ?? web3NoAccount
  return new web3.eth.Contract(abi, address)
}

export const getMultiCallContract = (web3, chainId = ChainMap.ETH) => {
  return getContract(MultiCall_ABI, MULTICALL_NETWORKS[chainId], web3)
}
