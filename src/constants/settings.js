import { ChainMap } from './chainsMap'
import { MAIN_TOKEN_ADDRESS, USDC_ADDRESS } from './tokens'

export const title = 'Blood Token'

export const IDO_PARTICIPANT_TOKENS = 3000000

// Launch price of 0.1 USD

export const LAUNCH_PRICE = 0.1

export const networks = [
  {
    id: 4,
    name: 'Rinkeby',
    symbol: 'ETH',
    tokens: [
      // {
      //   logo: '/media/tokens/eth.svg',
      //   symbol: 'ETH',
      //   address:  MAIN_TOKEN_ADDRESS,
      //   decimals: 18
      // },
      // {
      //   logo: '/media/tokens/ert.svg',
      //   symbol: 'ERT',
      //   address: '0xb9B5FFC3e1404E3Bb7352e656316D6C5ce6940A1',
      //   decimals: 18
      // },
      {
        logo: '/media/tokens/ert.svg',
        symbol: 'ERT_d6',
        address: '0xfBB0Aa52B82dD2173D8ce97065b2f421216A312A',
        decimals: 6
      }
    ]
  },
  {
    id: 97,
    name: 'BSC_Test',
    symbol: 'BSC',
    tokens: [
      // {
      //   logo: '/media/tokens/bnb.svg',
      //   symbol: 'BNB',
      //   address: MAIN_TOKEN_ADDRESS,
      //   decimals: 18
      // },
      {
        logo: '/media/tokens/ert.svg',
        symbol: 'ERT_d6',
        address: '0xfBB0Aa52B82dD2173D8ce97065b2f421216A312A',
        decimals: 6
      }
    ]
  },
  {
    id: 80001,
    name: 'Mumbai',
    symbol: 'matic',
    tokens: [
      {
        logo: '/media/tokens/ert.svg',
        symbol: 'ERT',
        address: '0x701048911b1f1121E33834d3633227A954978d53',
        decimals: 18
      }
    ]
  }
]

// TODO: set the address mainnet
export const tokensPrice = {
  BUSD: {
    decimals: 18,
    address: USDC_ADDRESS[ChainMap.BSC_TESTNET],
    price: 1
  },
  USDC: {
    decimals: 6,
    address: USDC_ADDRESS[ChainMap.RINKEBY],
    price: 1
  },
  USD: {
    decimals: 6,
    address: USDC_ADDRESS[ChainMap.MATIC],
    price: 1
  },

  ert_d6: {
    decimals: 6,
    address: '0xfBB0Aa52B82dD2173D8ce97065b2f421216A312A',
    price: 1
  },
  ert: {
    decimals: 18,
    address: '0x701048911b1f1121E33834d3633227A954978d53',
    price: 1
  }
}

export const presaleToken = {
  name: 'Blood Token',
  symbol: 'BT',
  decimals: 18,
  price: LAUNCH_PRICE,
  address: '0xdc047b66e6CE32dcA3924d19cDC234777875F2Ea',
  logo: '/media/tokens/default.svg'
}

export const validChains = [4, 97, 80001]
