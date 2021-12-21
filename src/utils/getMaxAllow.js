export const getMaxAllow = (token, amount, allocation) => {
  const amountUsed = token.price * parseFloat(amount)
  let max =
    amountUsed > parseFloat(allocation)
      ? (parseFloat(allocation) / token.price).toFixed(3)
      : amount

  return max
}
