export const getMaxAllow = (token, amount, allocation) => {
  const amountUsd = token.price * parseFloat(amount)
  let max =
    amountUsd > parseFloat(allocation)
      ? (parseFloat(allocation) / token.price).toFixed(3)
      : amount

  return max
}
