import { I18n } from '@lingui/core'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { ChainId, SHACK_ADDRESS } from '@radioshackswap/sdk'
import { useEffect, useMemo } from 'react'
import { SHACK, XSHACK } from '../../../config/tokens'
import { tryParseAmount } from '../../../functions'
import { useActiveWeb3React } from '../../../services/web3'
import { useBentoBalance } from '../../bentobox/hooks'
import { useTokenBalances } from '../../wallet/hooks'
import useBentoBoxTrait from '../traits/useBentoBoxTrait'
import { StrategyGeneralInfo, StrategyHook, StrategyTokenDefinitions } from '../types'
import useBaseStrategy from './useBaseStrategy'

export const GENERAL = (i18n: I18n): StrategyGeneralInfo => ({
  name: i18n._(t`SHACK → Bento`),
  steps: [i18n._(t`SHACK`), i18n._(t`xSHACK`), i18n._(t`BentoBox`)],
  zapMethod: 'stakeSushiToBento',
  unzapMethod: 'unstakeSushiFromBento',
  description:
    i18n._(t`Stake SHACK for xSHACK and deposit into BentoBox in one click. xSHACK in BentoBox is automatically
                invested into a passive yield strategy, and can be lent or used as collateral for borrowing in Kashi.`),
  inputSymbol: i18n._(t`SHACK`),
  outputSymbol: i18n._(t`xSHACK in BentoBox`),
})

export const tokenDefinitions: StrategyTokenDefinitions = {
  inputToken: {
    chainId: ChainId.MAINNET,
    address: SHACK_ADDRESS[ChainId.MAINNET],
    decimals: 18,
    symbol: 'SHACK',
  },
  outputToken: {
    chainId: ChainId.MAINNET,
    address: '0x8798249c2E607446EfB7Ad49eC89dD1865Ff4272',
    decimals: 18,
    symbol: 'XSHACK',
  },
}

const useStakeSushiToBentoStrategy = (): StrategyHook => {
  const { i18n } = useLingui()
  const { account, chainId } = useActiveWeb3React()
  const balances = useTokenBalances(account, [SHACK[chainId], XSHACK[chainId]])
  const xSushiBentoBalance = useBentoBalance(XSHACK[chainId].address)

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
      inputTokenBalance: balances[SHACK_ADDRESS[chainId]],
      outputTokenBalance: tryParseAmount(xSushiBentoBalance?.value?.toFixed(18) || '0', XSHACK[chainId]),
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
