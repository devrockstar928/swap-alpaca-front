import { BigNumber } from '@ethersproject/bignumber'
import { useEffect, useState } from 'react'
import { XRADIO } from '../config/tokens'
import { useActiveWeb3React } from '../services/web3'
import { useBentoBoxContract } from './useContract'

export default function useMeowshiPerXSushi() {
  const bentoboxContract = useBentoBoxContract()
  const [state, setState] = useState<[BigNumber, BigNumber]>([BigNumber.from('0'), BigNumber.from('0')])
  const { chainId } = useActiveWeb3React()
  const xSHACK = XRADIO[chainId]

  useEffect(() => {
    if (!bentoboxContract) return
    ;(async () => {
      const toShare = await bentoboxContract.toShare(xSHACK.address, '1'.toBigNumber(xSHACK.decimals), false)
      const toAmount = await bentoboxContract.toAmount(xSHACK.address, '1'.toBigNumber(xSHACK.decimals), false)
      setState([toShare, toAmount])
    })()
  }, [bentoboxContract])

  return state
}
