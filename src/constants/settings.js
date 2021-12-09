export const title = 'BLOOD TOKEN'

// Launch price of 0.1 USD

export const LAUNCH_PRICE = 0.1

export const networks = [
  {
    id: 4,
    name: 'Rinkeby',
    symbol: 'ETH',
    tokens: [
      {
        logo: '/media/tokens/eth.svg',
        symbol: 'ETH',
        address: '0x',
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
    id: 80001,
    name: 'Mumbai',
    symbol: 'matic',
    tokens: [
      {
        logo: '/media/tokens/matic.svg',
        symbol: 'MATIC',
        address: '0x',
        decimals: 18
      }
    ]
  }
]

export const mainToken = {
  name: 'Blood',
  symbol: 'BT',
  decimals: 18,
  address: '0xdc047b66e6CE32dcA3924d19cDC234777875F2Ea',
  logo: '/media/tokens/default.svg'
}

export const validChains = [4, 80001]
