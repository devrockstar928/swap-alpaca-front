import { BigNumber } from '@ethersproject/bignumber'
import { useEffect, useState } from 'react'
import { sRADIO } from '../config/tokens'
import { useActiveWeb3React } from '../services/web3'
import { useBentoBoxContract } from './useContract'

export default function useMeowshiPerXSushi() {
  const bentoboxContract = useBentoBoxContract()
  const [state, setState] = useState<[BigNumber, BigNumber]>([BigNumber.from('0'), BigNumber.from('0')])
  const { chainId } = useActiveWeb3React()
  const sRadio = sRADIO[chainId]

  useEffect(() => {
    if (!bentoboxContract) return
    ;(async () => {
      const toShare = await bentoboxContract.toShare(sRadio.address, '1'.toBigNumber(sRadio.decimals), false)
      const toAmount = await bentoboxContract.toAmount(sRadio.address, '1'.toBigNumber(sRadio.decimals), false)
      setState([toShare, toAmount])
    })()
  }, [bentoboxContract])

  return state
}
