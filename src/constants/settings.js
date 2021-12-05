export const title = 'BLOOD TOKEN'

export const networks = [
  {
    id: 4,
    name: 'Rinkeby',
    symbol: 'ETH',
    tokens: [
      {
        logo: '/media/tokens/eth.svg',
        symbol: 'ETH',
        address: '0x5629227c1e2542dbc5aca0cecb7cd3e02c82ad0a',
        decimals: 18
      },
      {
        logo: '/media/tokens/ert.svg',
        symbol: 'ERT',
        address: '0xb9B5FFC3e1404E3Bb7352e656316D6C5ce6940A1',
        decimals: 18
      }
    ]
  },
  {
    id: 97,
    name: 'BSCTest',
    symbol: 'BSC',
    tokens: [
      {
        logo: '/media/tokens/bnb.svg',
        symbol: 'BNB',
        address: '0x5629227c1e2542dbc5aca0cecb7cd3e02c82ad0a',
        decimals: 18
      }
    ]
  }
]

export const token = {
  name: 'Blood',
  address: '0xdc047b66e6CE32dcA3924d19cDC234777875F2Ea',
  logo: '/media/tokens/default.svg'
}
