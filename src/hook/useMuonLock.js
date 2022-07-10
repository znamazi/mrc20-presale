import { useEffect } from 'react'

import { useWeb3React } from '@web3-react/core'
import Muon from 'muon'
import { useUpdateMuonLock } from '../state/application/hooks'
import { useSwap } from '../state/swap/hooks'

export const useMuonLock = () => {
  const { account } = useWeb3React()
  const { fetch } = useSwap()
  const muon = new Muon(process.env.NEXT_PUBLIC_MUON_NODE_GATEWAY)
  const updateMuonLock = useUpdateMuonLock()

  useEffect(() => {
    const checkLock = async () => {
      const muonResponse = await muon
        .app('fear_presale')
        .method('checkLock', {
          forAddress: account,
        })
        .call()
      console.log(muonResponse)
      if (muonResponse.lock) {
        updateMuonLock({
          lock: muonResponse.expireAt,
          lockType: muonResponse.lockType,
          publicTime: muonResponse.PUBLIC_TIME,
          holderPublicTime: muonResponse.HOLDER_PUBLIC_TIME,
          showTimeLeft: muonResponse.HOLDER_PUBLIC_TIME,
        })
      } else {
        updateMuonLock({
          lock: 0,
          lockType: 0,
          publicTime: muonResponse.PUBLIC_TIME,
          holderPublicTime: muonResponse.HOLDER_PUBLIC_TIME,
          showTimeLeft: muonResponse.HOLDER_PUBLIC_TIME,
        })
      }
    }
    if (account) checkLock()
  }, [account, fetch])
}
