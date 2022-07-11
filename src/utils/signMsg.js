const doSignTypedData = (dataToSign, account, web3) => {
  return new Promise((resolve) => {
    web3.currentProvider.sendAsync(
      {
        from: account,
        id: Math.floor(Date.now() / 1000),
        jsonrpc: '2.0',
        method: 'eth_signTypedData_v4',
        params: [account, dataToSign]
      },
      (error, result) => {
        if (error) {
          console.error(error)
          resolve(false)
        } else if (result.error) {
          console.error(result.error.message)
          resolve(false)
        } else {
          resolve(result.result)
        }
      }
    )
  })
}

export const signMsg = (account, web3) => {
  let eip712TypedData = {
    types: {
      EIP712Domain: [{ name: 'name', type: 'string' }],
      Message: [{ type: 'address', name: 'forAddress' }]
    },
    domain: { name: 'MRC20 Presale' },
    primaryType: 'Message',
    message: { forAddress: account }
  }
  let dataToSign = JSON.stringify(eip712TypedData)
  return doSignTypedData(dataToSign, account, web3)
}
