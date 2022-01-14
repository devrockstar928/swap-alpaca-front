import { I18n } from '@lingui/core'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { ChainId, CurrencyAmount, RADIO_ADDRESS, Token } from '@radioshackswap/sdk'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { CRXSUSHI, RADIO, XSHACK } from '../../../config/tokens'
import { tryParseAmount } from '../../../functions'
import { useApproveCallback } from '../../../hooks/useApproveCallback'
import { useInariContract, useZenkoContract } from '../../../hooks/useContract'
import { useActiveWeb3React } from '../../../services/web3'
import { useTokenBalances } from '../../wallet/hooks'
import { useDerivedInariState } from '../hooks'
import { StrategyGeneralInfo, StrategyHook, StrategyTokenDefinitions } from '../types'
import useBaseStrategy from './useBaseStrategy'

export const GENERAL = (i18n: I18n): StrategyGeneralInfo => ({
  name: i18n._(t`RADIO → Cream`),
  steps: [i18n._(t`RADIO`), i18n._(t`xSHACK`), i18n._(t`Cream`)],
  zapMethod: 'stakeSushiToCream',
  unzapMethod: 'unstakeSushiFromCream',
  description: i18n._(
    t`Stake RADIO for xSHACK and deposit into Cream in one click. xSHACK in Cream (crXSUSHI) can be lent or used as collateral for borrowing.`
  ),
  inputSymbol: i18n._(t`RADIO`),
  outputSymbol: i18n._(t`xSHACK in Cream`),
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
    symbol: 'XSHACK',
  },
}

const useStakeSushiToCreamStrategy = (): StrategyHook => {
  const { i18n } = useLingui()
  const { account, chainId } = useActiveWeb3React()
  const { zapIn, inputValue } = useDerivedInariState()
  const zenkoContract = useZenkoContract()
  const inariContract = useInariContract()
  const balances = useTokenBalances(account, [RADIO[chainId], CRXSUSHI])
  const cTokenAmountRef = useRef<CurrencyAmount<Token>>(null)
  const approveAmount = useMemo(() => (zapIn ? inputValue : cTokenAmountRef.current), [inputValue, zapIn])

  // Override approveCallback for this strategy as we need to approve CRXSUSHI on zapOut
  const approveCallback = useApproveCallback(approveAmount, inariContract?.address)
  const general = useMemo(() => GENERAL(i18n), [i18n])
  const { execute, setBalances, ...baseStrategy } = useBaseStrategy({
    id: 'stakeSushiToCreamStrategy',
    general,
    tokenDefinitions,
  })

  const toCTokenAmount = useCallback(
    async (val: CurrencyAmount<Token>) => {
      if (!zenkoContract || !val) return null

      const bal = await zenkoContract.toCtoken(CRXSUSHI.address, val.quotient.toString())
      return CurrencyAmount.fromRawAmount(CRXSUSHI, bal.toString())
    },
    [zenkoContract]
  )

  // Run before executing transaction creation by transforming from xSHACK value to crXSUSHI value
  // As you will be spending crXSUSHI when unzapping from this strategy
  const preExecute = useCallback(
    async (val: CurrencyAmount<Token>) => {
      if (zapIn) return execute(val)
      return execute(await toCTokenAmount(val))
    },
    [execute, toCTokenAmount, zapIn]
  )

  useEffect(() => {
    toCTokenAmount(inputValue).then((val) => (cTokenAmountRef.current = val))
  }, [inputValue, toCTokenAmount])

  useEffect(() => {
    if (!zenkoContract || !balances) return

    const main = async () => {
      if (!balances[CRXSUSHI.address]) return tryParseAmount('0', XSHACK[chainId])
      const bal = await zenkoContract.fromCtoken(
        CRXSUSHI.address,
        balances[CRXSUSHI.address].toFixed().toBigNumber(CRXSUSHI.decimals).toString()
      )
      setBalances({
        inputTokenBalance: balances[RADIO[chainId].address],
        outputTokenBalance: CurrencyAmount.fromRawAmount(XSHACK[chainId], bal.toString()),
      })
    }

    main()
  }, [balances, setBalances, zenkoContract])

  return useMemo(
    () => ({
      ...baseStrategy,
      approveCallback: [...approveCallback, approveAmount],
      setBalances,
      execute: preExecute,
    }),
    [approveAmount, approveCallback, baseStrategy, preExecute, setBalances]
  )
}

export default useStakeSushiToCreamStrategy
