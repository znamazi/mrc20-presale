import { ChainMap } from './chainsMap'
import { MAIN_TOKEN_ADDRESS, USDC_ADDRESS } from './tokens'

export const title = 'Muon MRC20 '

export const IDO_PARTICIPANT_TOKENS = 3000000

// Launch price of 0.1 USD

export const LAUNCH_PRICE = 0.1

export const validChains = {
  local: [ChainMap.RINKEBY, ChainMap.BSC_TESTNET, ChainMap.MATIC_TESTNET],
  dev: [ChainMap.RINKEBY, ChainMap.BSC_TESTNET, ChainMap.MATIC_TESTNET],
  production: [ChainMap.ETH, ChainMap.BSC, ChainMap.MATIC],
}

export const tokens = [
  {
    logo: '/media/tokens/ert.svg',
    symbol: 'ERT_d6',
    address: '0xfBB0Aa52B82dD2173D8ce97065b2f421216A312A',
    decimals: 6,
    chainId: 4,
  },
  {
    logo: '/media/tokens/eth.svg',
    symbol: 'ETH',
    address: MAIN_TOKEN_ADDRESS,
    decimals: 18,
    chainId: 4,
  },
  // {
  //   logo: '/media/tokens/bnb.svg',
  //   symbol: 'BNB',
  //   address: MAIN_TOKEN_ADDRESS,
  //   decimals: 18,
  //   chainId: 97,
  // },
  {
    logo: '/media/tokens/ert.svg',
    symbol: 'ERT_d6',
    address: '0xfBB0Aa52B82dD2173D8ce97065b2f421216A312A',
    decimals: 6,
    chainId: 97,
  },
  {
    logo: '/media/tokens/ert.svg',
    symbol: 'ERT',
    address: '0x701048911b1f1121E33834d3633227A954978d53',
    decimals: 18,
    chainId: 80001,
  },
]

// TODO: set the address mainnet
export const tokensPrice = {
  BUSD: {
    decimals: 18,
    address: USDC_ADDRESS[ChainMap.BSC_TESTNET],
    price: 1,
  },
  USDC: {
    decimals: 6,
    address: USDC_ADDRESS[ChainMap.RINKEBY],
    price: 1,
  },
  USD: {
    decimals: 6,
    address: USDC_ADDRESS[ChainMap.MATIC],
    price: 1,
  },

  ert_d6: {
    decimals: 6,
    address: '0xfBB0Aa52B82dD2173D8ce97065b2f421216A312A',
    price: 1,
  },
  ert: {
    decimals: 18,
    address: '0x701048911b1f1121E33834d3633227A954978d53',
    price: 1,
  },
  eth: {
    decimals: 18,
    address: MAIN_TOKEN_ADDRESS,
    price: 1000,
  },
}
export const presaleToken = {
  name: 'Blood Token',
  symbol: 'BT',
  decimals: 18,
  price: LAUNCH_PRICE,
  address: '0xdc047b66e6CE32dcA3924d19cDC234777875F2Ea',
  logo: '/media/tokens/default.svg',
}
