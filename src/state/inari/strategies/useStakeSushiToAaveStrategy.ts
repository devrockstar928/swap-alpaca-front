import { I18n } from '@lingui/core'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { ChainId, SHACK_ADDRESS } from '@radioshackswap/sdk'
import { useEffect, useMemo } from 'react'
import { AXSUSHI, SHACK } from '../../../config/tokens'
import { useActiveWeb3React } from '../../../services/web3'
import { useTokenBalances } from '../../wallet/hooks'
import { StrategyGeneralInfo, StrategyHook, StrategyTokenDefinitions } from '../types'
import useBaseStrategy from './useBaseStrategy'

export const GENERAL = (i18n: I18n): StrategyGeneralInfo => ({
  name: i18n._(t`SHACK → Aave`),
  steps: [i18n._(t`SHACK`), i18n._(t`xSHACK`), i18n._(t`Aave`)],
  zapMethod: 'stakeSushiToAave',
  unzapMethod: 'unstakeSushiFromAave',
  description: i18n._(
    t`Stake SHACK for xSHACK and deposit into Aave in one click. xSHACK in Aave (aXSUSHI) can be lent or used as collateral for borrowing.`
  ),
  inputSymbol: i18n._(t`SHACK`),
  outputSymbol: i18n._(t`xSHACK in Aave`),
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
    address: '0xF256CC7847E919FAc9B808cC216cAc87CCF2f47a',
    decimals: 18,
    symbol: 'aXSUSHI',
  },
}

const useStakeSushiToAaveStrategy = (): StrategyHook => {
  const { i18n } = useLingui()
  const { account } = useActiveWeb3React()
  const balances = useTokenBalances(account, [SHACK[ChainId.MAINNET], AXSUSHI])
  const general = useMemo(() => GENERAL(i18n), [i18n])
  const { setBalances, ...strategy } = useBaseStrategy({
    id: 'stakeSushiToAaveStrategy',
    general,
    tokenDefinitions,
  })

  useEffect(() => {
    if (!balances) return

    setBalances({
      inputTokenBalance: balances[SHACK[ChainId.MAINNET].address],
      outputTokenBalance: balances[AXSUSHI.address],
    })
  }, [balances, setBalances])

  return useMemo(
    () => ({
      ...strategy,
      setBalances,
    }),
    [strategy, setBalances]
  )
}

export default useStakeSushiToAaveStrategy
