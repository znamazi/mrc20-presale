import { AddressZero } from '@ethersproject/constants'
import multicall from './multicall'
import { isAddress } from './isAddress'
import { ERC20_ABI } from '../constants/ABI'
import { getWeb3NoAccount } from './web3'
import { ERC20_FUN, ERC20_FUN_MAP } from '../constants/constants'
import { fromWei } from './wei'

export const getToken = async (address, chainId, account) => {
  try {
    let token = ''
    const web3 = getWeb3NoAccount(chainId)
    if (!isAddress(address) || address === AddressZero) {
      throw Error(`Invalid 'address' parameter '${address}'.`)
    }
    const calls = Object.keys(ERC20_FUN).map((methodName) => {
      if (ERC20_FUN[methodName] === 'balanceOf')
        return {
          address: address,
          name: ERC20_FUN[methodName],
          params: [account],
        }
      else {
        return {
          address: address,
          name: ERC20_FUN[methodName],
        }
      }
    })
    const result = await multicall(web3, ERC20_ABI, calls, chainId)
    if (result && result.length > 0) {
      token = {
        chainId,
        symbol: result[ERC20_FUN_MAP.symbol][0],
        name: result[ERC20_FUN_MAP.name][0],
        decimals: result[ERC20_FUN_MAP.decimals][0],
        balance: fromWei(result[ERC20_FUN_MAP.balanceOf].toString(), result[ERC20_FUN_MAP.decimals][0].toString()),
        address,
      }
    }
    return token
  } catch (error) {
    console.log('error happend in get token', error)
  }
}
