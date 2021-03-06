import { I18n } from '@lingui/core'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { ChainId, RADIO_ADDRESS } from '@radioshackswap/sdk'
import { useEffect, useMemo } from 'react'
import { RADIO, sRADIO } from '../../../config/tokens'
import { tryParseAmount } from '../../../functions'
import { useActiveWeb3React } from '../../../services/web3'
import { useBentoBalance } from '../../bentobox/hooks'
import { useTokenBalances } from '../../wallet/hooks'
import useBentoBoxTrait from '../traits/useBentoBoxTrait'
import { StrategyGeneralInfo, StrategyHook, StrategyTokenDefinitions } from '../types'
import useBaseStrategy from './useBaseStrategy'

export const GENERAL = (i18n: I18n): StrategyGeneralInfo => ({
  name: i18n._(t`RADIO → Bento`),
  steps: [i18n._(t`RADIO`), i18n._(t`sRADIO`), i18n._(t`BentoBox`)],
  zapMethod: 'stakeSushiToBento',
  unzapMethod: 'unstakeSushiFromBento',
  description:
    i18n._(t`Stake RADIO for sRADIO and deposit into BentoBox in one click. sRADIO in BentoBox is automatically
                invested into a passive yield strategy, and can be lent or used as collateral for borrowing in Kashi.`),
  inputSymbol: i18n._(t`RADIO`),
  outputSymbol: i18n._(t`sRADIO in BentoBox`),
})

export const tokenDefinitions: StrategyTokenDefinitions = {
  inputToken: {
    chainId: ChainId.MAINNET,
    address: RADIO_ADDRESS[ChainId.MAINNET],
    decimals: 18,
    symbol: 'RADIO',
  },
  outputToken: {
    chainId: ChainId.MAINNET,
    address: '0x8798249c2E607446EfB7Ad49eC89dD1865Ff4272',
    decimals: 18,
    symbol: 'sRADIO',
  },
}

const useStakeSushiToBentoStrategy = (): StrategyHook => {
  const { i18n } = useLingui()
  const { account, chainId } = useActiveWeb3React()
  const balances = useTokenBalances(account, [RADIO[chainId], sRADIO[chainId]])
  const xSushiBentoBalance = useBentoBalance(sRADIO[chainId].address)

  // Strategy ends in BentoBox so use BaseBentoBox strategy
  const general = useMemo(() => GENERAL(i18n), [i18n])
  const baseStrategy = useBaseStrategy({
    id: 'stakeSushiToBentoStrategy',
    general,
    tokenDefinitions,
  })

  // Add in BentoBox trait as output is in BentoBox
  const { setBalances, ...strategy } = useBentoBoxTrait(baseStrategy)

  useEffect(() => {
    if (!balances) return

    setBalances({
      inputTokenBalance: balances[RADIO_ADDRESS[chainId]],
      outputTokenBalance: tryParseAmount(xSushiBentoBalance?.value?.toFixed(18) || '0', sRADIO[chainId]),
    })
  }, [balances, setBalances, xSushiBentoBalance?.value])

  return useMemo(
    () => ({
      setBalances,
      ...strategy,
    }),
    [strategy, setBalances]
  )
}

export default useStakeSushiToBentoStrategy
