export const getMaxAllow = (token, amount, allocation) => {
  console.log({ token, amount, allocation })
  const amountUsed = token.price * amount
  let max =
    amountUsed > allocation ? (allocation / token.price).toFixed(3) : amount

  return max
}
