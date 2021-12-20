import Web3 from 'web3'
import { MRC20Presale_ABI } from '../constants/ABI'
import { MRC20Presale } from '../constants/contracts'
import { getContract } from '../helper/contractHelpers'
export const BN = Web3.utils.BN
export const toBN = Web3.utils.toBN

export const formatAddress = (address) => {
  return address
    ? address.substring(0, 6) +
        '...' +
        address.substring(address.length - 4, address.length)
    : 'Connect Wallet'
}

export const getUsedAmount = async (account, chainId, web3) => {
  const contract = getContract(MRC20Presale_ABI, MRC20Presale[chainId], web3)

  const amount = await contract.methods.balances(account).call()
  console.log(amount)
  return fromWei(amount)
}

export const fromWei = (n, decimals = 18) => {
  let unitMap = Web3.utils.unitMap
  let unit = Object.keys(unitMap).find(
    (item) => unitMap[item] === new BN(10).pow(new BN(decimals)).toString()
  )
  console.log(unit)
  return Web3.utils.fromWei(n, unit)
}

export const toWei = (n) => {
  return Web3.utils.toWei(n)
}

function isString(s) {
  return typeof s === 'string' || s instanceof String
}

export const toBaseUnit = (value, decimals) => {
  if (!isString(value)) {
    throw new Error('Pass strings to prevent floating point precision issues.')
  }
  const base = new BN(10).pow(new BN(decimals))

  // Is it negative?
  let negative = value.substring(0, 1) === '-'
  if (negative) {
    value = value.substring(1)
  }

  if (value === '.') {
    throw new Error(
      `Invalid value ${value} cannot be converted to` +
        ` base unit with ${decimals} decimals.`
    )
  }

  // Split it into a whole and fractional part
  let comps = value.split('.')
  if (comps.length > 2) {
    throw new Error('Too many decimal points')
  }

  let whole = comps[0],
    fraction = comps[1]

  if (!whole) {
    whole = '0'
  }
  if (!fraction) {
    fraction = '0'
  }
  if (fraction.length > decimals) {
    throw new Error('Too many decimal places')
  }

  while (fraction.length < decimals) {
    fraction += '0'
  }

  whole = new BN(whole)
  fraction = new BN(fraction)
  let wei = whole.mul(base).add(fraction)

  if (negative) {
    wei = wei.neg()
  }

  return new BN(wei.toString(10), 10)
}

export const getTimestamp = () => Math.floor(Date.now() / 1000)
