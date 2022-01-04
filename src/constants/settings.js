export const title = 'BLOOD TOKEN'

// Launch price of 0.1 USD

export const LAUNCH_PRICE = 0.1

export const networks = [
  // {
  //   id: 4,
  //   name: 'Rinkeby',
  //   symbol: 'ETH',
  //   tokens: [
  //     {
  //       logo: '/media/tokens/eth.svg',
  //       symbol: 'ETH',
  //       address: '0x0000000000000000000000000000000000000000',
  //       decimals: 18
  //     },
  //     {
  //       logo: '/media/tokens/ert.svg',
  //       symbol: 'ERT',
  //       address: '0xb9B5FFC3e1404E3Bb7352e656316D6C5ce6940A1',
  //       decimals: 18
  //     },
  //     {
  //       logo: '/media/tokens/usdc.svg',
  //       symbol: 'ERT_d6',
  //       address: '0xfBB0Aa52B82dD2173D8ce97065b2f421216A312A',
  //       decimals: 6
  //     }
  //   ]
  // },
  {
    id: 97,
    name: 'BSC_Test',
    symbol: 'BSC',
    tokens: [
      {
        logo: '/media/tokens/bnb.svg',
        symbol: 'BNB',
        address: '0x0000000000000000000000000000000000000000',
        decimals: 18
      },
      {
        logo: '/media/tokens/usdc.svg',
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
        symbol: 'ERTMumbai',
        address: '0x701048911b1f1121E33834d3633227A954978d53',
        decimals: 18
      }
    ]
  }
]

export const presaleToken = {
  name: 'Blood Token',
  symbol: 'BT',
  decimals: 18,
  price: LAUNCH_PRICE,
  address: '0xdc047b66e6CE32dcA3924d19cDC234777875F2Ea',
  logo: '/media/tokens/default.svg'
}

export const validChains = [97, 80001]
