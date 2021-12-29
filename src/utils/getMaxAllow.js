export const getMaxAllow = (token, amount, allocation, publicTime) => {
  let currentTime = Date.now()
  let max
  if (currentTime < publicTime) {
    const amountUsd = token.price * parseFloat(amount)
    max =
      amountUsd > parseFloat(allocation)
        ? (parseFloat(allocation) / token.price).toFixed(3)
        : amount
  }
  max = amount
  return max
}
