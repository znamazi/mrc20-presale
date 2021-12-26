import React, { useEffect, useState } from 'react'

import { useWeb3React } from '@web3-react/core'
import Muon from 'muon'

export const useMuonLock = (fetch) => {
  const { account } = useWeb3React()
  const [lock, setLock] = useState(0)
  const muon = new Muon(process.env.NEXT_PUBLIC_MUON_NODE_GATEWAY)

  useEffect(() => {
    const checkLock = async () => {
      const muonResponse = await muon
        .app('fear_presale')
        .method('checkLock', {
          forAddress: account
        })
        .call()
      if (muonResponse.lock) {
        setLock(muonResponse.expireAt)
      }
    }
    if (account) checkLock()
  }, [account, fetch])
  return lock
}
