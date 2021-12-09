import { BigNumber } from '@ethersproject/bignumber'
import { useEffect, useState } from 'react'
import { XRADIO } from '../config/tokens'
import { useBentoBoxContract } from './useContract'

export default function useMeowshiPerXSushi() {
  const bentoboxContract = useBentoBoxContract()
  const [state, setState] = useState<[BigNumber, BigNumber]>([BigNumber.from('0'), BigNumber.from('0')])

  useEffect(() => {
    if (!bentoboxContract) return
    ;(async () => {
      const toShare = await bentoboxContract.toShare(XRADIO.address, '1'.toBigNumber(XRADIO.decimals), false)
      const toAmount = await bentoboxContract.toAmount(XRADIO.address, '1'.toBigNumber(XRADIO.decimals), false)
      setState([toShare, toAmount])
    })()
  }, [bentoboxContract])

  return state
}
