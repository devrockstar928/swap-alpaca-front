import { BigNumber } from '@ethersproject/bignumber'
import { TransactionResponse } from '@ethersproject/providers'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { ChainId, Currency, CurrencyAmount, currencyEquals, Percent, WNATIVE } from '@radioshackswap/sdk'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'
import { Activity, Plus } from 'react-feather'
import ReactGA from 'react-ga'
import RadioButtonGrouping from 'src/components/RadioButtonGrouping'
import Button, { ButtonError } from '../../../components/Button'
import { AutoColumn } from '../../../components/Column'
import Container from '../../../components/Container'
import CurrencyInputPanel from '../../../components/CurrencyInputPanel'
import Dots from '../../../components/Dots'
import DoubleCurrencyLogo from '../../../components/DoubleLogo'
import { MinimalPositionCard } from '../../../components/PositionCard'
import RadioWithShadow from '../../../components/RadioWithShadow'
import { AutoRow, RowBetween } from '../../../components/Row'
import Web3Connect from '../../../components/Web3Connect'
import { ZERO_PERCENT } from '../../../constants'
import { ConfirmAddModalBottom } from '../../../features/legacy/liquidity/ConfirmAddModalBottom'
import LiquidityHeader from '../../../features/legacy/liquidity/LiquidityHeader'
import LiquidityPrice from '../../../features/legacy/liquidity/LiquidityPrice'
import UnsupportedCurrencyFooter from '../../../features/legacy/swap/UnsupportedCurrencyFooter'
import ExchangeHeader from '../../../features/trade/Header'
import { classNames } from '../../../functions'
import { currencyId, maxAmountSpend } from '../../../functions/currency'
import { calculateGasMargin, calculateSlippageAmount } from '../../../functions/trade'
import { useCurrency } from '../../../hooks/Tokens'
import { ApprovalState, useApproveCallback } from '../../../hooks/useApproveCallback'
import { useRouterContract } from '../../../hooks/useContract'
import { useIsSwapUnsupported } from '../../../hooks/useIsSwapUnsupported'
import useTransactionDeadline from '../../../hooks/useTransactionDeadline'
import { PairState } from '../../../hooks/useV2Pairs'
import TransactionConfirmationModal, { ConfirmationModalContent } from '../../../modals/TransactionConfirmationModal'
import { useActiveWeb3React } from '../../../services/web3'
import { useWalletModalToggle } from '../../../state/application/hooks'
import { Field } from '../../../state/mint/actions'
import { useDerivedMintInfo, useMintActionHandlers, useMintState } from '../../../state/mint/hooks'
import { useTransactionAdder } from '../../../state/transactions/hooks'
import { useExpertModeManager, useUserSlippageToleranceWithDefault } from '../../../state/user/hooks'

const DEFAULT_ADD_V2_SLIPPAGE_TOLERANCE = new Percent(50, 10_000)

export default function Add() {
  const { i18n } = useLingui()
  const { account, chainId, library } = useActiveWeb3React()
  const router = useRouter()
  const tokens = router.query.tokens
  const [currencyIdA, currencyIdB] = (tokens as string[]) || [undefined, undefined]

  const currencyA = useCurrency(currencyIdA)
  const currencyB = useCurrency(currencyIdB)

  const oneCurrencyIsWETH = Boolean(
    chainId &&
      ((currencyA && currencyEquals(currencyA, WNATIVE[chainId])) ||
        (currencyB && currencyEquals(currencyB, WNATIVE[chainId])))
  )

  const toggleWalletModal = useWalletModalToggle() // toggle wallet when disconnected

  const [isExpertMode] = useExpertModeManager()

  // mint state
  const { independentField, typedValue, otherTypedValue } = useMintState()
  const {
    dependentField,
    currencies,
    pair,
    pairState,
    currencyBalances,
    parsedAmounts,
    price,
    noLiquidity,
    liquidityMinted,
    poolTokenPercentage,
    error,
  } = useDerivedMintInfo(currencyA ?? undefined, currencyB ?? undefined)

  const { onFieldAInput, onFieldBInput } = useMintActionHandlers(noLiquidity)

  const isValid = !error

  // modal and loading
  const [showConfirm, setShowConfirm] = useState<boolean>(false)
  const [attemptingTxn, setAttemptingTxn] = useState<boolean>(false) // clicked confirm

  // txn values
  const deadline = useTransactionDeadline() // custom from users settings

  // const [allowedSlippage] = useUserSlippageTolerance(); // custom from users

  const allowedSlippage = useUserSlippageToleranceWithDefault(DEFAULT_ADD_V2_SLIPPAGE_TOLERANCE) // custom from users

  const [txHash, setTxHash] = useState<string>('')

  // get formatted amounts
  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: noLiquidity ? otherTypedValue : parsedAmounts[dependentField]?.toSignificant(6) ?? '',
  }

  // get the max amounts user can add
  const maxAmounts: { [field in Field]?: CurrencyAmount<Currency> } = [Field.CURRENCY_A, Field.CURRENCY_B].reduce(
    (accumulator, field) => {
      return {
        ...accumulator,
        [field]: maxAmountSpend(currencyBalances[field]),
      }
    },
    {}
  )

  const atMaxAmounts: { [field in Field]?: CurrencyAmount<Currency> } = [Field.CURRENCY_A, Field.CURRENCY_B].reduce(
    (accumulator, field) => {
      return {
        ...accumulator,
        [field]: maxAmounts[field]?.equalTo(parsedAmounts[field] ?? '0'),
      }
    },
    {}
  )

  const routerContract = useRouterContract()

  // check whether the user has approved the router on the tokens
  const [approvalA, approveACallback] = useApproveCallback(parsedAmounts[Field.CURRENCY_A], routerContract?.address)
  const [approvalB, approveBCallback] = useApproveCallback(parsedAmounts[Field.CURRENCY_B], routerContract?.address)

  const addTransaction = useTransactionAdder()

  async function onAdd() {
    if (!chainId || !library || !account || !routerContract) return

    const { [Field.CURRENCY_A]: parsedAmountA, [Field.CURRENCY_B]: parsedAmountB } = parsedAmounts

    console.log({ parsedAmountA, parsedAmountB, currencyA, currencyB, deadline })

    if (!parsedAmountA || !parsedAmountB || !currencyA || !currencyB || !deadline) {
      return
    }

    const amountsMin = {
      [Field.CURRENCY_A]: calculateSlippageAmount(parsedAmountA, noLiquidity ? ZERO_PERCENT : allowedSlippage)[0],
      [Field.CURRENCY_B]: calculateSlippageAmount(parsedAmountB, noLiquidity ? ZERO_PERCENT : allowedSlippage)[0],
    }

    let estimate,
      method: (...args: any) => Promise<TransactionResponse>,
      args: Array<string | string[] | number>,
      value: BigNumber | null
    if (currencyA.isNative || currencyB.isNative) {
      const tokenBIsETH = currencyB.isNative
      estimate = routerContract.estimateGas.addLiquidityETH
      method = routerContract.addLiquidityETH
      args = [
        (tokenBIsETH ? currencyA : currencyB)?.wrapped?.address ?? '', // token
        (tokenBIsETH ? parsedAmountA : parsedAmountB).quotient.toString(), // token desired
        amountsMin[tokenBIsETH ? Field.CURRENCY_A : Field.CURRENCY_B].toString(), // token min
        amountsMin[tokenBIsETH ? Field.CURRENCY_B : Field.CURRENCY_A].toString(), // eth min
        account,
        deadline.toHexString(),
      ]
      value = BigNumber.from((tokenBIsETH ? parsedAmountB : parsedAmountA).quotient.toString())
    } else {
      estimate = routerContract.estimateGas.addLiquidity
      method = routerContract.addLiquidity
      args = [
        currencyA?.wrapped?.address ?? '',
        currencyB?.wrapped?.address ?? '',
        parsedAmountA.quotient.toString(),
        parsedAmountB.quotient.toString(),
        amountsMin[Field.CURRENCY_A].toString(),
        amountsMin[Field.CURRENCY_B].toString(),
        account,
        deadline.toHexString(),
      ]
      value = null
    }

    setAttemptingTxn(true)
    await estimate(...args, value ? { value } : {})
      .then((estimatedGasLimit) =>
        method(...args, {
          ...(value ? { value } : {}),
          gasLimit: calculateGasMargin(estimatedGasLimit),
        }).then((response) => {
          setAttemptingTxn(false)

          addTransaction(response, {
            summary: i18n._(
              t`Add ${parsedAmounts[Field.CURRENCY_A]?.toSignificant(3)} ${
                currencies[Field.CURRENCY_A]?.symbol
              } and ${parsedAmounts[Field.CURRENCY_B]?.toSignificant(3)} ${currencies[Field.CURRENCY_B]?.symbol}`
            ),
          })

          setTxHash(response.hash)

          ReactGA.event({
            category: 'Liquidity',
            action: 'Add',
            label: [currencies[Field.CURRENCY_A]?.symbol, currencies[Field.CURRENCY_B]?.symbol].join('/'),
          })
        })
      )
      .catch((error) => {
        setAttemptingTxn(false)
        // we only care if the error is something _other_ than the user rejected the tx
        if (error?.code !== 4001) {
          console.error(error)
        }
      })
  }

  const modalHeader = () => {
    return noLiquidity ? (
      <div className="pb-4">
        <div className="flex items-center justify-start gap-3">
          <div className="text-2xl font-bold text-high-emphesis">
            {currencies[Field.CURRENCY_A]?.symbol + '/' + currencies[Field.CURRENCY_B]?.symbol}
          </div>
          <DoubleCurrencyLogo currency0={currencyA} currency1={currencyB} size={48} />
        </div>
      </div>
    ) : (
      <div className="pb-4">
        <div className="flex items-center justify-start gap-3">
          <div className="text-xl font-bold md:text-3xl text-high-emphesis">{liquidityMinted?.toSignificant(6)}</div>
          <div className="grid grid-flow-col gap-2">
            <DoubleCurrencyLogo currency0={currencyA} currency1={currencyB} size={48} />
          </div>
        </div>
        <div className="text-lg font-medium md:text-2xl text-high-emphesis">
          {currencies[Field.CURRENCY_A]?.symbol}/{currencies[Field.CURRENCY_B]?.symbol}
          &nbsp;{i18n._(t`Pool Tokens`)}
        </div>
        <div className="pt-3 text-xs italic text-secondary">
          {i18n._(t`Output is estimated. If the price changes by more than ${allowedSlippage.toSignificant(
            4
          )}% your transaction
            will revert.`)}
        </div>
      </div>
    )
  }

  const modalBottom = () => {
    return (
      <ConfirmAddModalBottom
        price={price}
        currencies={currencies}
        parsedAmounts={parsedAmounts}
        noLiquidity={noLiquidity}
        onAdd={onAdd}
        poolTokenPercentage={poolTokenPercentage}
      />
    )
  }

  const pendingText = i18n._(
    t`Supplying ${parsedAmounts[Field.CURRENCY_A]?.toSignificant(6)} ${
      currencies[Field.CURRENCY_A]?.symbol
    } and ${parsedAmounts[Field.CURRENCY_B]?.toSignificant(6)} ${currencies[Field.CURRENCY_B]?.symbol}`
  )

  const handleCurrencyASelect = useCallback(
    (currencyA: Currency) => {
      const newCurrencyIdA = currencyId(currencyA)
      if (newCurrencyIdA === currencyIdB) {
        router.push(`/add/${currencyIdB}/${currencyIdA}`)
      } else {
        router.push(`/add/${newCurrencyIdA}/${currencyIdB}`)
      }
    },
    [currencyIdB, router, currencyIdA]
  )
  const handleCurrencyBSelect = useCallback(
    (currencyB: Currency) => {
      const newCurrencyIdB = currencyId(currencyB)
      if (currencyIdA === newCurrencyIdB) {
        if (currencyIdB) {
          router.push(`/add/${currencyIdB}/${newCurrencyIdB}`)
        } else {
          router.push(`/add/${newCurrencyIdB}`)
        }
      } else {
        router.push(`/add/${currencyIdA ? currencyIdA : 'ETH'}/${newCurrencyIdB}`)
      }
    },
    [currencyIdA, router, currencyIdB]
  )

  const handleDismissConfirmation = useCallback(() => {
    setShowConfirm(false)
    // if there was a tx hash, we want to clear the input
    if (txHash) {
      onFieldAInput('')
    }
    setTxHash('')
  }, [onFieldAInput, txHash])

  const addIsUnsupported = useIsSwapUnsupported(currencies?.CURRENCY_A, currencies?.CURRENCY_B)

  // console.log(
  //   { addIsUnsupported, isValid, approvalA, approvalB },
  //   approvalA === ApprovalState.APPROVED && approvalB === ApprovalState.APPROVED
  // )
  return (
    <Container id="remove-liquidity-page" maxWidth="4xl" className="py-4 md:py-8 lg:py-12">
      <Head>
        <title>Add Liquidity | RadioShack</title>
        <meta
          key="description"
          name="description"
          content="Add liquidity to the RadioShack AMM to enable gas optimised and low slippage trades across countless networks"
        />
      </Head>

      <RadioWithShadow>
        <div className="relative inline-block p-6 mb-3 bg-[#F7F8FA] rounded-t-[25px] w-auto">
          <div className="flex items-stretch min-w-[752px] justify-center p-4 space-y-4 bg-white rounded-[32px] z-1">
            <div className="border-r min-w-[500px] border-gray-200 flex-2">
              <div className="ml-3 mr-3">
                {/* <AddRemoveTabs creating={isCreate} adding={true} defaultSlippage={DEFAULT_ADD_V2_SLIPPAGE_TOLERANCE} /> */}
                <ExchangeHeader
                  input={currencies[Field.CURRENCY_A]}
                  output={currencies[Field.CURRENCY_B]}
                  allowedSlippage={allowedSlippage}
                />
              </div>
              <TransactionConfirmationModal
                isOpen={showConfirm}
                onDismiss={handleDismissConfirmation}
                attemptingTxn={attemptingTxn}
                hash={txHash}
                content={() => (
                  <ConfirmationModalContent
                    title={noLiquidity ? i18n._(t`You are creating a pool`) : i18n._(t`You will receive`)}
                    onDismiss={handleDismissConfirmation}
                    topContent={modalHeader}
                    bottomContent={modalBottom}
                  />
                )}
                pendingText={pendingText}
              />
              <div className="flex flex-col space-y-2">
                {pair && pairState !== PairState.INVALID && (
                  <LiquidityHeader input={currencies[Field.CURRENCY_A]} output={currencies[Field.CURRENCY_B]} />
                )}

                <div className="px-6">
                  <CurrencyInputPanel
                    value={formattedAmounts[Field.CURRENCY_A]}
                    onUserInput={onFieldAInput}
                    onMax={() => {
                      onFieldAInput(maxAmounts[Field.CURRENCY_A]?.toExact() ?? '')
                    }}
                    onCurrencySelect={handleCurrencyASelect}
                    showMaxButton={!atMaxAmounts[Field.CURRENCY_A]}
                    currency={currencies[Field.CURRENCY_A]}
                    id="add-liquidity-input-tokena"
                    showCommonBases
                  />

                  <AutoColumn justify="center" className="py-1">
                    <AutoRow
                      className={classNames('justify-center', 'px-4 flex-wrap w-full flex')}
                      style={{ padding: '0 1rem' }}
                    >
                      <button className="z-10 -mt-6 -mb-6 rounded-full">
                        <div className="rounded-md border-2 border-white bg-[#F7F8FA] text-gray text-opacity-80 hover:text-opacity-100 md:flex hover:bg-dark-800">
                          <div className="p-1 rounded-full">
                            <Plus size="24" />
                          </div>
                        </div>
                      </button>
                    </AutoRow>
                  </AutoColumn>

                  <CurrencyInputPanel
                    value={formattedAmounts[Field.CURRENCY_B]}
                    onUserInput={onFieldBInput}
                    onCurrencySelect={handleCurrencyBSelect}
                    onMax={() => {
                      onFieldBInput(maxAmounts[Field.CURRENCY_B]?.toExact() ?? '')
                    }}
                    showMaxButton={!atMaxAmounts[Field.CURRENCY_B]}
                    currency={currencies[Field.CURRENCY_B]}
                    id="add-liquidity-input-tokenb"
                    showCommonBases
                  />
                </div>
              </div>
            </div>
            {currencies[Field.CURRENCY_A] && currencies[Field.CURRENCY_B] && pairState !== PairState.INVALID && (
              <div className="">
                {(!pair || noLiquidity) && (
                  <LiquidityPrice
                    currencies={currencies}
                    price={price}
                    noLiquidity={noLiquidity}
                    poolTokenPercentage={poolTokenPercentage}
                  />
                )}
                {!addIsUnsupported ? (
                  pair && !noLiquidity ? (
                    <MinimalPositionCard showUnwrapped={oneCurrencyIsWETH} pair={pair} />
                  ) : null
                ) : (
                  <UnsupportedCurrencyFooter
                    show={addIsUnsupported}
                    currencies={[currencies.CURRENCY_A, currencies.CURRENCY_B]}
                  />
                )}
              </div>
            )}
          </div>
        </div>
        {[ChainId.MAINNET, ChainId.MATIC].includes(chainId) ? (
          <RadioButtonGrouping>
            {addIsUnsupported ? (
              <Button color="gradient" size="lg" disabled>
                {i18n._(t`Unsupported Asset`)}
              </Button>
            ) : !account ? (
              <Web3Connect size="lg" className="absolute w-1/3 left-[208px] connect-btn" />
            ) : (
              (approvalA === ApprovalState.NOT_APPROVED ||
                approvalA === ApprovalState.PENDING ||
                approvalB === ApprovalState.NOT_APPROVED ||
                approvalB === ApprovalState.PENDING ||
                isValid) && (
                <AutoColumn gap={'0px'}>
                  {
                    <RowBetween>
                      {approvalA !== ApprovalState.APPROVED && (
                        <Button
                          color="gray"
                          size="lg"
                          variant="filled"
                          onClick={approveACallback}
                          disabled={approvalA === ApprovalState.PENDING}
                          style={{
                            width: approvalB !== ApprovalState.APPROVED ? '48%' : '100%',
                          }}
                        >
                          {approvalA === ApprovalState.PENDING ? (
                            <Dots>{i18n._(t`Approving ${currencies[Field.CURRENCY_A]?.symbol}`)}</Dots>
                          ) : (
                            i18n._(t`Approve ${currencies[Field.CURRENCY_A]?.symbol}`)
                          )}
                        </Button>
                      )}
                      {approvalB !== ApprovalState.APPROVED && (
                        <Button
                          color="gray"
                          size="lg"
                          onClick={approveBCallback}
                          disabled={approvalB === ApprovalState.PENDING}
                          style={{
                            width: approvalA !== ApprovalState.APPROVED ? '48%' : '100%',
                          }}
                        >
                          {approvalB === ApprovalState.PENDING ? (
                            <Dots>{i18n._(t`Approving ${currencies[Field.CURRENCY_B]?.symbol}`)}</Dots>
                          ) : (
                            i18n._(t`Approve ${currencies[Field.CURRENCY_B]?.symbol}`)
                          )}
                        </Button>
                      )}
                    </RowBetween>
                  }

                  {approvalA === ApprovalState.APPROVED && approvalB === ApprovalState.APPROVED && (
                    <ButtonError
                      onClick={() => {
                        isExpertMode ? onAdd() : setShowConfirm(true)
                      }}
                      disabled={
                        !isValid || approvalA !== ApprovalState.APPROVED || approvalB !== ApprovalState.APPROVED
                      }
                      error={!isValid && !!parsedAmounts[Field.CURRENCY_A] && !!parsedAmounts[Field.CURRENCY_B]}
                    >
                      {error ?? i18n._(t`Confirm Adding Liquidity`)}
                    </ButtonError>
                  )}
                </AutoColumn>
              )
            )}
          </RadioButtonGrouping>
        ) : (
          <RadioButtonGrouping>
            <div
              className="flex items-center justify-center px-4 py-2 font-semibold text-white border rounded bg-opacity-80 border-red bg-red hover:bg-opacity-100"
              onClick={toggleWalletModal}
            >
              <div className="mr-1">
                <Activity className="w-4 h-4" />
              </div>
              {i18n._(t`You are on the wrong network`)}
            </div>
          </RadioButtonGrouping>
        )}
      </RadioWithShadow>
    </Container>
  )
}
