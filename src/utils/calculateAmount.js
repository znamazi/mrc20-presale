import { LabelStatus } from '../constants/constants'
import { fromWei, toBN, toWei } from './utils'

const calculateAmount = (token, presaleToken, label, value) => {
  let fixedValue = Number(value).toFixed(token.decimals)
  if (!value) {
    return { valueFrom: '', valueTo: '' }
  }
  let valueFrom, valueTo
  let tokenPrice = toBN(toWei(token.price.toString(), 18))
  let presaleTokenPrice = toBN(toWei(presaleToken.price.toString(), 18))

  let baseToken = toBN(10).pow(toBN(token.decimals))
  let basePresale = toBN(10).pow(toBN(presaleToken.decimals))
  if (label === LabelStatus.FROM) {
    let amount = toBN(toWei(fixedValue, token.decimals))

    let usdAmount = amount.mul(tokenPrice).div(baseToken)
    let mintAmount = toBN(usdAmount).mul(basePresale).div(presaleTokenPrice)

    valueFrom = value
    valueTo = fromWei(mintAmount.toString(), presaleToken.decimals)
  } else {
    let amount = toBN(toWei(fixedValue, presaleToken.decimals))
    let usdAmount = amount.mul(presaleTokenPrice).div(basePresale)
    let transforAmount = toBN(usdAmount).mul(baseToken).div(tokenPrice)
    valueFrom = fromWei(transforAmount, token.decimals)
    valueTo = value
  }
  return { valueFrom, valueTo }
}

export default calculateAmount
