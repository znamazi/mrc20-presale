import Web3 from 'web3'

export const title = 'BLOOD TOKEN'

// Launch price of 0.1 USD

export const LAUNCH_PRICE = 0.1

const bscTestWeb3 = new Web3(
  new Web3.providers.HttpProvider(
    'https://data-seed-prebsc-1-s1.binance.org:8545/'
  )
)
const rinkebyWeb3 = new Web3(
  new Web3.providers.HttpProvider(
    `https://rinkeby.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`
  )
)

export const networks = [
  {
    id: 4,
    name: 'Rinkeby',
    symbol: 'ETH',
    web3: rinkebyWeb3,
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
    id: 97,
    name: 'BSCTest',
    symbol: 'BSC',
    web3: bscTestWeb3,
    tokens: [
      {
        logo: '/media/tokens/bnb.svg',
        symbol: 'BNB',
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

export const validChains = [4, 97]
