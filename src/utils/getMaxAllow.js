export const getMaxAllow = (token, amount, allocation, holderPublicTime) => {
  let currentTime = Date.now()
  let max
  if (currentTime < holderPublicTime) {
    const amountUsd = token.price * parseFloat(amount)
    max =
      amountUsd > parseFloat(allocation)
        ? (parseFloat(allocation) / token.price).toFixed(3)
        : amount
  } else {
    max = amount
  }

  return max
}
