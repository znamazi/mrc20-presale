export const getMaxAllow = (token, amount, allocation, publicTime) => {
  let currentTime = Date.now()
  let max
  if (currentTime < publicTime) {
    const amountUsd = token.price * parseFloat(amount)
    console.log({
      token,
      amount,
      allocation,
      publicTime,
      ta: typeof amountUsd,
      taa: typeof parseFloat(allocation),
      cond: amountUsd > parseFloat(allocation)
    })
    max =
      amountUsd > parseFloat(allocation)
        ? (parseFloat(allocation) / token.price).toFixed(3)
        : amount
  } else {
    max = amount
  }

  return max
}
