import { Interface } from '@ethersproject/abi'
import { MAIN_TOKEN_ADDRESS } from '../constants/tokens'
import { getMultiCallContract } from './contractHelpers'

const multicall = async (web3, abi, calls, chainId) => {
  try {
    const multi = getMultiCallContract(web3, chainId)

    const itf = new Interface(abi)
    const calldata = calls.map((call) => [
      call.address.toLowerCase(),
      itf.encodeFunctionData(call.name, call.params)
    ])
    const { returnData } = await multi.methods.aggregate(calldata).call()
    const res = returnData
      .filter((item) => item !== MAIN_TOKEN_ADDRESS)
      .map((call, i) => itf.decodeFunctionResult(calls[i].name, call))
    return res
  } catch (error) {
    console.log('Error happened in Multicall:', error)
  }
}

export default multicall
