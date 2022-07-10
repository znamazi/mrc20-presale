import { useEffect, useState, useMemo } from 'react'
import { validChains } from '../constants/settings'
import { useAddToken, useSwap } from '../state/swap/hooks'
import { tokens, presaleToken } from '../constants/settings'
import useBalances from './useBalances'

const useTokensList = () => {
  const swap = useSwap()
  const tokensList = useMemo(() => tokens.filter((item) => item.chainId === swap.chain.id), [swap.chain])
  const defaultTokens = useBalances(validChains[process.env.NEXT_PUBLIC_MODE], tokens, presaleToken, swap.fetch)
  const [prepareTokens, setPrepareTokens] = useState({ tokens: tokensList, presaleToken })
  const addToken = useAddToken()

  useEffect(() => {
    const fetch = async () => {
      try {
        //  filter based on chain
        if (swap.chain && defaultTokens) {
          const filter = defaultTokens.filter(
            (item) => swap.chain.id === item.chainId && item.address !== presaleToken.address
          )
          const presale = defaultTokens.find(
            (item) => item.address === presaleToken.address && swap.chain.id === item.chainId
          )
          setPrepareTokens({ tokens: filter, presaleToken: presale })
          addToken(filter[0])
        } else {
          setPrepareTokens({ tokens: tokensList, presaleToken })
        }
      } catch (error) {
        console.log('Error happend in searchToken', error)
      }
    }
    fetch()
  }, [swap.chain, defaultTokens])
  return prepareTokens
}

export default useTokensList
