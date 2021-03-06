import { ArrowDownIcon } from '@heroicons/react/outline'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { ChainId, Currency, CurrencyAmount, JSBI, Token, Trade as V2Trade, TradeType } from '@radioshackswap/sdk'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import ReactGA from 'react-ga'
import { Activity } from 'react-feather'
import AddToMetaMask from 'src/components/AddToMetaMask'
import RadioButtonGrouping from 'src/components/RadioButtonGrouping'
import AddressInputPanel from '../../../components/AddressInputPanel'
import Alert from '../../../components/Alert'
import Button, { ButtonConfirmed, ButtonError } from '../../../components/Button'
import Column, { AutoColumn } from '../../../components/Column'
import Container from '../../../components/Container'
import CurrencyInputPanel from '../../../components/CurrencyInputPanel'
import Loader from '../../../components/Loader'
import ProgressSteps from '../../../components/ProgressSteps'
import QuestionHelper from '../../../components/QuestionHelper'
import RadioWithShadow from '../../../components/RadioWithShadow'
import Web3Connect from '../../../components/Web3Connect'
import confirmPriceImpactWithoutFee from '../../../features/legacy/swap/confirmPriceImpactWithoutFee'
import ConfirmSwapModal from '../../../features/legacy/swap/ConfirmSwapModal'
import { SwapCallbackError } from '../../../features/legacy/swap/styleds'
import TradePrice from '../../../features/legacy/swap/TradePrice'
import UnsupportedCurrencyFooter from '../../../features/legacy/swap/UnsupportedCurrencyFooter'
import SwapHeader from '../../../features/trade/Header'
import { classNames, formatNumber } from '../../../functions'
import { maxAmountSpend } from '../../../functions/currency'
import { warningSeverity } from '../../../functions/prices'
import { computeFiatValuePriceImpact } from '../../../functions/trade'
import { useAllTokens, useCurrency } from '../../../hooks/Tokens'
import { ApprovalState, useApproveCallbackFromTrade } from '../../../hooks/useApproveCallback'
import { useTokenContract } from '../../../hooks/useContract'
import useENSAddress from '../../../hooks/useENSAddress'
import useIsArgentWallet from '../../../hooks/useIsArgentWallet'
import { useIsSwapUnsupported } from '../../../hooks/useIsSwapUnsupported'
import { useSwapCallback } from '../../../hooks/useSwapCallback'
import { useUSDCValue } from '../../../hooks/useUSDCPrice'
import useWrapCallback, { WrapType } from '../../../hooks/useWrapCallback'
import TokenWarningModal from '../../../modals/TokenWarningModal'
import { useActiveWeb3React } from '../../../services/web3'
import { useNetworkModalToggle, useToggleSettingsMenu, useWalletModalToggle } from '../../../state/application/hooks'
import { Field } from '../../../state/swap/actions'
import {
  useDefaultsFromURLSearch,
  useDerivedSwapInfo,
  useSwapActionHandlers,
  useSwapState,
} from '../../../state/swap/hooks'
import { useExpertModeManager, useUserSingleHopOnly, useUserTransactionTTL } from '../../../state/user/hooks'
import { ENABLED_NETWORKS } from '../../../config/networks'

export default function Swap() {
  const { i18n } = useLingui()

  const loadedUrlParams = useDefaultsFromURLSearch()

  // token warning stuff
  const [loadedInputCurrency, loadedOutputCurrency] = [
    useCurrency(loadedUrlParams?.inputCurrencyId),
    useCurrency(loadedUrlParams?.outputCurrencyId),
  ]

  const [dismissTokenWarning, setDismissTokenWarning] = useState<boolean>(false)
  const urlLoadedTokens: Token[] = useMemo(
    () => [loadedInputCurrency, loadedOutputCurrency]?.filter((c): c is Token => c?.isToken ?? false) ?? [],
    [loadedInputCurrency, loadedOutputCurrency]
  )
  const handleConfirmTokenWarning = useCallback(() => {
    setDismissTokenWarning(true)
  }, [])

  // dismiss warning if all imported tokens are in active lists
  const defaultTokens = useAllTokens()
  const importTokensNotInDefault =
    urlLoadedTokens &&
    urlLoadedTokens.filter((token: Token) => {
      return !Boolean(token.address in defaultTokens)
    })

  const { account, chainId, library } = useActiveWeb3React()

  const toggleNetworkModal = useNetworkModalToggle()

  const router = useRouter()

  // toggle wallet when disconnected
  const toggleWalletModal = useWalletModalToggle()

  // for expert mode
  const [isExpertMode] = useExpertModeManager()
  const toggleSettings = useToggleSettingsMenu()

  // get custom setting values for user
  const [ttl] = useUserTransactionTTL()

  // swap state
  const { independentField, typedValue, recipient } = useSwapState()
  const {
    v2Trade,
    currencyBalances,
    parsedAmount,
    currencies,
    inputError: swapInputError,
    allowedSlippage,
  } = useDerivedSwapInfo()

  const {
    wrapType,
    execute: onWrap,
    inputError: wrapInputError,
  } = useWrapCallback(currencies[Field.INPUT], currencies[Field.OUTPUT], typedValue)
  const showWrap: boolean = wrapType !== WrapType.NOT_APPLICABLE
  const { address: recipientAddress } = useENSAddress(recipient)

  const trade = showWrap ? undefined : v2Trade

  const parsedAmounts = useMemo(
    () =>
      showWrap
        ? {
            [Field.INPUT]: parsedAmount,
            [Field.OUTPUT]: parsedAmount,
          }
        : {
            [Field.INPUT]: independentField === Field.INPUT ? parsedAmount : trade?.inputAmount,
            [Field.OUTPUT]: independentField === Field.OUTPUT ? parsedAmount : trade?.outputAmount,
          },
    [independentField, parsedAmount, showWrap, trade]
  )

  const fiatValueInput = useUSDCValue(parsedAmounts[Field.INPUT])
  const fiatValueOutput = useUSDCValue(parsedAmounts[Field.OUTPUT])
  const priceImpact = computeFiatValuePriceImpact(fiatValueInput, fiatValueOutput)

  const { onSwitchTokens, onCurrencySelection, onUserInput, onChangeRecipient } = useSwapActionHandlers()

  const isValid = !swapInputError

  const dependentField: Field = independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT

  const handleTypeInput = useCallback(
    (value: string) => {
      onUserInput(Field.INPUT, value)
    },
    [onUserInput]
  )

  const handleTypeOutput = useCallback(
    (value: string) => {
      onUserInput(Field.OUTPUT, value)
    },
    [onUserInput]
  )

  // reset if they close warning without tokens in params
  const handleDismissTokenWarning = useCallback(() => {
    setDismissTokenWarning(true)
    router.push('/swap/')
  }, [router])

  // modal and loading
  const [{ showConfirm, tradeToConfirm, swapErrorMessage, attemptingTxn, txHash }, setSwapState] = useState<{
    showConfirm: boolean
    tradeToConfirm: V2Trade<Currency, Currency, TradeType> | undefined
    attemptingTxn: boolean
    swapErrorMessage: string | undefined
    txHash: string | undefined
  }>({
    showConfirm: false,
    tradeToConfirm: undefined,
    attemptingTxn: false,
    swapErrorMessage: undefined,
    txHash: undefined,
  })

  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: showWrap
      ? parsedAmounts[independentField]?.toExact() ?? ''
      : parsedAmounts[dependentField]?.toSignificant(6) ?? '',
  }

  const userHasSpecifiedInputOutput = Boolean(
    currencies[Field.INPUT] && currencies[Field.OUTPUT] && parsedAmounts[independentField]?.greaterThan(JSBI.BigInt(0))
  )

  const routeNotFound = !trade?.route

  // check whether the user has approved the router on the input token
  const [approvalState, approveCallback] = useApproveCallbackFromTrade(trade, allowedSlippage)

  const signatureData = undefined

  // const {
  //   state: signatureState,
  //   signatureData,
  //   gatherPermitSignature,
  // } = useERC20PermitFromTrade(trade, allowedSlippage)

  const handleApprove = useCallback(async () => {
    await approveCallback()
    // if (signatureState === UseERC20PermitState.NOT_SIGNED && gatherPermitSignature) {
    //   try {
    //     await gatherPermitSignature()
    //   } catch (error) {
    //     // try to approve if gatherPermitSignature failed for any reason other than the user rejecting it
    //     if (error?.code !== 4001) {
    //       await approveCallback()
    //     }
    //   }
    // } else {
    //   await approveCallback()
    // }
  }, [approveCallback])
  // }, [approveCallback, gatherPermitSignature, signatureState])

  // check if user has gone through approval process, used to show two step buttons, reset on token change
  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false)

  // mark when a user has submitted an approval, reset onTokenSelection for input field
  useEffect(() => {
    if (approvalState === ApprovalState.PENDING) {
      setApprovalSubmitted(true)
    }
  }, [approvalState, approvalSubmitted])

  const maxInputAmount: CurrencyAmount<Currency> | undefined = maxAmountSpend(currencyBalances[Field.INPUT])
  const showMaxButton = Boolean(maxInputAmount?.greaterThan(0) && !parsedAmounts[Field.INPUT]?.equalTo(maxInputAmount))

  // the callback to execute the swap
  const { callback: swapCallback, error: swapCallbackError } = useSwapCallback(
    trade,
    allowedSlippage,
    recipient,
    signatureData
  )

  const [singleHopOnly] = useUserSingleHopOnly()

  const handleSwap = useCallback(() => {
    if (!swapCallback) {
      return
    }
    if (priceImpact && !confirmPriceImpactWithoutFee(priceImpact)) {
      return
    }
    setSwapState({
      attemptingTxn: true,
      tradeToConfirm,
      showConfirm,
      swapErrorMessage: undefined,
      txHash: undefined,
    })
    swapCallback()
      .then((hash) => {
        setSwapState({
          attemptingTxn: false,
          tradeToConfirm,
          showConfirm,
          swapErrorMessage: undefined,
          txHash: hash,
        })

        ReactGA.event({
          category: 'Swap',
          action:
            recipient === null
              ? 'Swap w/o Send'
              : (recipientAddress ?? recipient) === account
              ? 'Swap w/o Send + recipient'
              : 'Swap w/ Send',
          label: [
            trade?.inputAmount?.currency?.symbol,
            trade?.outputAmount?.currency?.symbol,
            singleHopOnly ? 'SH' : 'MH',
          ].join('/'),
        })

        ReactGA.event({
          category: 'Routing',
          action: singleHopOnly ? 'Swap with multihop disabled' : 'Swap with multihop enabled',
        })
      })
      .catch((error) => {
        setSwapState({
          attemptingTxn: false,
          tradeToConfirm,
          showConfirm,
          swapErrorMessage: error.message,
          txHash: undefined,
        })
      })
  }, [
    swapCallback,
    priceImpact,
    tradeToConfirm,
    showConfirm,
    recipient,
    recipientAddress,
    account,
    trade?.inputAmount?.currency?.symbol,
    trade?.outputAmount?.currency?.symbol,
    singleHopOnly,
  ])

  // errors
  const [showInverted, setShowInverted] = useState<boolean>(false)

  // warnings on slippage
  // const priceImpactSeverity = warningSeverity(priceImpactWithoutFee);
  const priceImpactSeverity = useMemo(() => {
    const executionPriceImpact = trade?.priceImpact
    return warningSeverity(
      executionPriceImpact && priceImpact
        ? executionPriceImpact.greaterThan(priceImpact)
          ? executionPriceImpact
          : priceImpact
        : executionPriceImpact ?? priceImpact
    )
  }, [priceImpact, trade])

  const isArgentWallet = useIsArgentWallet()

  // show approve flow when: no error on inputs, not approved or pending, or approved in current session
  // never show if price impact is above threshold in non expert mode
  const showApproveFlow =
    !isArgentWallet &&
    !swapInputError &&
    (approvalState === ApprovalState.NOT_APPROVED ||
      approvalState === ApprovalState.PENDING ||
      (approvalSubmitted && approvalState === ApprovalState.APPROVED)) &&
    !(priceImpactSeverity > 3 && !isExpertMode)

  const handleConfirmDismiss = useCallback(() => {
    setSwapState({
      showConfirm: false,
      tradeToConfirm,
      attemptingTxn,
      swapErrorMessage,
      txHash,
    })
    // if there was a tx hash, we want to clear the input
    if (txHash) {
      onUserInput(Field.INPUT, '')
    }
  }, [attemptingTxn, onUserInput, swapErrorMessage, tradeToConfirm, txHash])

  const handleAcceptChanges = useCallback(() => {
    setSwapState({
      tradeToConfirm: trade,
      swapErrorMessage,
      txHash,
      attemptingTxn,
      showConfirm,
    })
  }, [attemptingTxn, showConfirm, swapErrorMessage, trade, txHash])

  const handleInputSelect = useCallback(
    (inputCurrency) => {
      setApprovalSubmitted(false) // reset 2 step UI for approvals
      onCurrencySelection(Field.INPUT, inputCurrency)
    },
    [onCurrencySelection]
  )

  const handleMaxInput = useCallback(() => {
    maxInputAmount && onUserInput(Field.INPUT, maxInputAmount.toExact())
  }, [maxInputAmount, onUserInput])

  const handleOutputSelect = useCallback(
    (outputCurrency) => onCurrencySelection(Field.OUTPUT, outputCurrency),
    [onCurrencySelection]
  )

  const swapIsUnsupported = useIsSwapUnsupported(currencies?.INPUT, currencies?.OUTPUT)

  const priceImpactTooHigh = priceImpactSeverity > 3 && !isExpertMode

  const [animateSwapArrows, setAnimateSwapArrows] = useState<boolean>(false)

  const [totalSupply, setTotalSupply] = useState(0)
  const tokenContract = useTokenContract(currencies?.OUTPUT?.wrapped.address)

  useEffect(() => {
    const fetch = async () => {
      if (tokenContract) {
        const supply = (await tokenContract.totalSupply()) / 10 ** currencies?.OUTPUT?.wrapped.decimals
        setTotalSupply(supply)
      }
    }
    fetch()
  }, [tokenContract, currencies])

  return (
    <Container id="swap-page" maxWidth="4xl" className="py-4 md:py-8 lg:py-12">
      <Head>
        <title>{i18n._(t`Swap`)} | RadioShack</title>
        <meta
          key="description"
          name="description"
          content="RadioShack Swap allows for swapping of ERC20 compatible tokens across multiple networks"
        />
      </Head>
      <TokenWarningModal
        isOpen={importTokensNotInDefault.length > 0 && !dismissTokenWarning}
        tokens={importTokensNotInDefault}
        onConfirm={handleConfirmTokenWarning}
      />
      <RadioWithShadow>
        <div className="relative inline-block p-6 mb-3 bg-[#F7F8FA] rounded-t-[25px] w-auto">
          <div className="flex items-stretch min-w-[752px] justify-center p-4 space-y-4 bg-white rounded-[32px] z-1">
            <div className="border-r min-w-[500px] border-gray-200 flex-2">
              <div className="ml-3 mr-3">
                <SwapHeader
                  input={currencies[Field.INPUT]}
                  output={currencies[Field.OUTPUT]}
                  allowedSlippage={allowedSlippage}
                />
              </div>

              <ConfirmSwapModal
                isOpen={showConfirm}
                trade={trade}
                originalTrade={tradeToConfirm}
                onAcceptChanges={handleAcceptChanges}
                attemptingTxn={attemptingTxn}
                txHash={txHash}
                recipient={recipient}
                allowedSlippage={allowedSlippage}
                onConfirm={handleSwap}
                swapErrorMessage={swapErrorMessage}
                onDismiss={handleConfirmDismiss}
              />
              <div className="px-6">
                <CurrencyInputPanel
                  // priceImpact={priceImpact}
                  label={
                    independentField === Field.OUTPUT && !showWrap
                      ? i18n._(t`Swap From (est.):`)
                      : i18n._(t`Swap From:`)
                  }
                  value={formattedAmounts[Field.INPUT]}
                  showMaxButton={showMaxButton}
                  currency={currencies[Field.INPUT]}
                  onUserInput={handleTypeInput}
                  onMax={handleMaxInput}
                  fiatValue={fiatValueInput ?? undefined}
                  onCurrencySelect={handleInputSelect}
                  otherCurrency={currencies[Field.OUTPUT]}
                  showCommonBases={true}
                  id="swap-currency-input"
                />
                <AutoColumn justify="center" className="py-1">
                  <div className={classNames('justify-center', 'px-4 flex-wrap w-full flex')}>
                    <button
                      className="z-10 -mt-6 -mb-6 rounded-full"
                      onClick={() => {
                        setApprovalSubmitted(false) // reset 2 step UI for approvals
                        onSwitchTokens()
                      }}
                    >
                      <div className="rounded-md border-2 border-white bg-[#F7F8FA] text-gray text-opacity-80 hover:text-opacity-100 md:flex hover:bg-dark-800">
                        <div
                          className="p-1 rounded-full"
                          // onMouseEnter={() => setAnimateSwapArrows(true)}
                          onMouseLeave={() => setAnimateSwapArrows(false)}
                        >
                          <ArrowDownIcon style={{ width: 24, height: 24 }} />
                          {/* <Lottie
                          animationData={swapArrowsAnimationData}
                          autoplay={animateSwapArrows}
                          loop={false}
                          style={{ width: 24, height: 24 }}
                        /> */}
                        </div>
                      </div>
                    </button>
                    {isExpertMode ? (
                      recipient === null && !showWrap ? (
                        <Button
                          variant="link"
                          size="none"
                          id="add-recipient-button"
                          onClick={() => onChangeRecipient('')}
                        >
                          + Add recipient (optional)
                        </Button>
                      ) : (
                        <Button
                          variant="link"
                          size="none"
                          id="remove-recipient-button"
                          onClick={() => onChangeRecipient(null)}
                        >
                          - {i18n._(t`Remove recipient`)}
                        </Button>
                      )
                    ) : null}
                  </div>
                </AutoColumn>

                <div>
                  <CurrencyInputPanel
                    value={formattedAmounts[Field.OUTPUT]}
                    onUserInput={handleTypeOutput}
                    label={
                      independentField === Field.INPUT && !showWrap ? i18n._(t`Swap To (est.):`) : i18n._(t`Swap To:`)
                    }
                    showMaxButton={false}
                    hideBalance={false}
                    fiatValue={fiatValueOutput ?? undefined}
                    priceImpact={priceImpact}
                    currency={currencies[Field.OUTPUT]}
                    onCurrencySelect={handleOutputSelect}
                    otherCurrency={currencies[Field.INPUT]}
                    showCommonBases={true}
                    id="swap-currency-output"
                  />
                  {Boolean(trade) && (
                    <div className="p-1 -mt-2 cursor-pointer rounded-b-md">
                      <TradePrice
                        price={trade?.executionPrice}
                        showInverted={showInverted}
                        setShowInverted={setShowInverted}
                        className=""
                      />
                    </div>
                  )}
                </div>
              </div>

              {recipient !== null && !showWrap && (
                <>
                  <AddressInputPanel id="recipient" value={recipient} onChange={onChangeRecipient} />
                  {recipient !== account && (
                    <Alert
                      type="warning"
                      dismissable={false}
                      showIcon
                      message={i18n._(
                        t`Please note that the recipient address is different from the connected wallet address.`
                      )}
                    />
                  )}
                </>
              )}

              {!swapIsUnsupported ? null : (
                <UnsupportedCurrencyFooter
                  show={swapIsUnsupported}
                  currencies={[currencies.INPUT, currencies.OUTPUT]}
                />
              )}
            </div>
            {currencies.OUTPUT && (
              <div className="flex-1 flex flex-col min-h-[220px] justify-between p-4 h-full min-w-[260px]">
                <div className="text-[#C2C4C8]">
                  Name: <span className="text-black">{currencies.OUTPUT.name}</span>
                </div>
                <div className="text-[#C2C4C8]">
                  Token Symbol: <span className="text-black">{currencies.OUTPUT.symbol}</span>
                </div>

                <div className="text-[#C2C4C8]">
                  Total Supply: <span className="text-black">{formatNumber(totalSupply)}</span>
                </div>

                <div className="text-[#C2C4C8]">
                  Decimals: <span className="text-black">{currencies.OUTPUT.decimals}</span>
                </div>
                {/* <div className="text-[#C2C4C8]">
                Blurb: <span className="text-black">xyz</span>
              </div>
              <div className="text-[#C2C4C8]">
                Website: <span className="text-black">https://atlasusv.com</span>
              </div> */}
                {chainId &&
                ENABLED_NETWORKS.includes(chainId) &&
                  library &&
                  library.provider.isMetaMask && (
                    <QuestionHelper text={i18n._(t`Add ${currencies.OUTPUT.symbol} to your MetaMask wallet`)}>
                      <AddToMetaMask currency={currencies.OUTPUT} />
                    </QuestionHelper>
                  )}
              </div>
            )}
          </div>
        </div>
        {ENABLED_NETWORKS.includes(chainId) ? (
          <RadioButtonGrouping>
            {swapIsUnsupported ? (
              <Button color="red" size="lg" disabled>
                {i18n._(t`Unsupported Asset`)}
              </Button>
            ) : !account ? (
              <Web3Connect size="lg" className="absolute w-1/3 left-[208px] connect-btn"/>
            ) : showWrap ? (
              <Button color="gradient" size="lg" disabled={Boolean(wrapInputError)} onClick={onWrap}>
                {wrapInputError ??
                  (wrapType === WrapType.WRAP
                    ? i18n._(t`Wrap`)
                    : wrapType === WrapType.UNWRAP
                      ? i18n._(t`Unwrap`)
                      : null)}
              </Button>
            ) : routeNotFound && userHasSpecifiedInputOutput ? (
              <div style={{ textAlign: 'center' }}>
                <div className="mb-1">{i18n._(t`Insufficient liquidity for this trade`)}</div>
                {singleHopOnly && <div className="mb-1">{i18n._(t`Try enabling multi-hop trades`)}</div>}
              </div>
            ) : showApproveFlow ? (
              <div>
                {approvalState !== ApprovalState.APPROVED && (
                  <ButtonConfirmed
                    onClick={handleApprove}
                    disabled={approvalState !== ApprovalState.NOT_APPROVED || approvalSubmitted}
                    size="lg"
                  >
                    {approvalState === ApprovalState.PENDING ? (
                      <div className="flex items-center justify-center h-full space-x-2">
                        <div>Approving</div>
                        <Loader stroke="white"/>
                      </div>
                    ) : (
                      i18n._(t`Approve ${currencies[Field.INPUT]?.symbol}`)
                    )}
                  </ButtonConfirmed>
                )}
                {approvalState === ApprovalState.APPROVED && (
                  <ButtonError
                    onClick={() => {
                      if (isExpertMode) {
                        handleSwap()
                      } else {
                        setSwapState({
                          tradeToConfirm: trade,
                          attemptingTxn: false,
                          swapErrorMessage: undefined,
                          showConfirm: true,
                          txHash: undefined,
                        })
                      }
                    }}
                    style={{
                      width: '100%',
                    }}
                    id="swap-button"
                    disabled={
                      !isValid || approvalState !== ApprovalState.APPROVED || (priceImpactSeverity > 3 && !isExpertMode)
                    }
                    error={isValid && priceImpactSeverity > 2}
                  >
                    {priceImpactSeverity > 3 && !isExpertMode
                      ? i18n._(t`Price Impact High`)
                      : priceImpactSeverity > 2
                        ? i18n._(t`Swap Anyway`)
                        : i18n._(t`Swap`)}
                  </ButtonError>
                )}
              </div>
            ) : (
              <ButtonError
                onClick={() => {
                  if (isExpertMode) {
                    handleSwap()
                  } else {
                    setSwapState({
                      tradeToConfirm: trade,
                      attemptingTxn: false,
                      swapErrorMessage: undefined,
                      showConfirm: true,
                      txHash: undefined,
                    })
                  }
                }}
                id="swap-button"
                disabled={!isValid || (priceImpactSeverity > 3 && !isExpertMode) || !!swapCallbackError}
                error={isValid && priceImpactSeverity > 2 && !swapCallbackError}
              >
                {swapInputError
                  ? swapInputError
                  : priceImpactSeverity > 3 && !isExpertMode
                    ? i18n._(t`Price Impact Too High`)
                    : priceImpactSeverity > 2
                      ? i18n._(t`Swap Anyway`)
                      : i18n._(t`Swap`)}
              </ButtonError>
            )}
            {showApproveFlow && (
              <Column style={{ marginTop: '1rem' }}>
                <ProgressSteps steps={[approvalState === ApprovalState.APPROVED]}/>
              </Column>
            )}
            {isExpertMode && swapErrorMessage ? <SwapCallbackError error={swapErrorMessage}/> : null}
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
        )
        }
      </RadioWithShadow>
    </Container>
  )
}
