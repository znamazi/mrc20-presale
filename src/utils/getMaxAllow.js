export const getMaxAllow = (token, amount, allocation) => {
  const amountUsed = token.price * amount
  const max = amountUsed > allocation ? allocation / token.price : amount
  return max
}
