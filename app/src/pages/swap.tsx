import { ApprovalState, useApproveCallbackFromTrade } from '../hooks/useApproveCallback'
import { ArrowWrapper, BottomGrouping, SwapCallbackError, Wrapper } from '../components/Swap/styleds'
import { AutoRow, RowBetween } from '../components/Row'
import { ButtonConfirmed, ButtonError, ButtonLight, ButtonPrimary } from '../components/ButtonLegacy'
import Card, { DarkCard, GreyCard } from '../components/CardLegacy'
import { ChainId, CurrencyAmount, JSBI, Token, Trade } from '@sushiswap/sdk'
import Column, { AutoColumn } from '../components/Column'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { computeTradePriceBreakdown, warningSeverity } from '../functions/prices'
import { useAllTokens, useCurrency } from '../hooks/Tokens'
import { useDefaultsFromURLSearch, useDerivedSwapInfo, useSwapActionHandlers, useSwapState } from '../state/swap/hooks'
import { useExpertModeManager, useUserSingleHopOnly, useUserSlippageTolerance } from '../state/user/hooks'
import { useNetworkModalToggle, useToggleSettingsMenu, useWalletModalToggle } from '../state/application/hooks'
import useWrapCallback, { WrapType } from '../hooks/useWrapCallback'

import AddressInputPanel from '../components/AddressInputPanel'
import AdvancedSwapDetailsDropdown from '../components/Swap/AdvancedSwapDetailsDropdown'
import { ArrowDown } from 'react-feather'
import ConfirmSwapModal from '../components/Swap/ConfirmSwapModal'
import CurrencyInputPanel from '../components/CurrencyInputPanel'
import { Field } from '../state/swap/actions'
import Head from 'next/head'
import { INITIAL_ALLOWED_SLIPPAGE } from '../constants'
import Image from 'next/image'
import Layout from '../components/Layout'
import LinkStyledButton from '../components/LinkStyledButton'
import Loader from '../components/Loader'
import Lottie from 'lottie-react'
import ProgressSteps from '../components/ProgressSteps'
import ReactGA from 'react-ga'
import SwapHeader from '../components/ExchangeHeader'
import { Text } from 'rebass'
import { ThemeContext } from 'styled-components'
import TokenWarningModal from '../components/TokenWarningModal'
import TradePrice from '../components/Swap/TradePrice'
import UnsupportedCurrencyFooter from '../components/Swap/UnsupportedCurrencyFooter'
import confirmPriceImpactWithoutFee from '../components/Swap/confirmPriceImpactWithoutFee'
import { maxAmountSpend } from '../functions/currency'
import styles from '../styles/Swap.module.css'
import swapArrowsAnimationData from '../assets/animation/swap-arrows.json'
import { t } from '@lingui/macro'
import { useActiveWeb3React } from '../hooks/useActiveWeb3React'
import useENSAddress from '../hooks/useENSAddress'
import { useIsTransactionUnsupported } from '../hooks/Trades'
import { useLingui } from '@lingui/react'
import { useSwapCallback } from '../hooks/useSwapCallback'

export default function Swap() {
    const { i18n } = useLingui()
    const toggleNetworkModal = useNetworkModalToggle()

    const loadedUrlParams = useDefaultsFromURLSearch()

    // token warning stuff
    const [loadedInputCurrency, loadedOutputCurrency] = [
        useCurrency(loadedUrlParams?.inputCurrencyId),
        useCurrency(loadedUrlParams?.outputCurrencyId)
    ]
    const [dismissTokenWarning, setDismissTokenWarning] = useState<boolean>(false)
    const urlLoadedTokens: Token[] = useMemo(
        () => [loadedInputCurrency, loadedOutputCurrency]?.filter((c): c is Token => c instanceof Token) ?? [],
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

    const { account, chainId } = useActiveWeb3React()
    const theme = useContext(ThemeContext)

    // toggle wallet when disconnected
    const toggleWalletModal = useWalletModalToggle()

    // for expert mode
    const toggleSettings = useToggleSettingsMenu()
    const [isExpertMode] = useExpertModeManager()

    // get custom setting values for user
    const [allowedSlippage] = useUserSlippageTolerance()

    // swap state
    const { independentField, typedValue, recipient } = useSwapState()
    const { v2Trade, currencyBalances, parsedAmount, currencies, inputError: swapInputError } = useDerivedSwapInfo()
    const { wrapType, execute: onWrap, inputError: wrapInputError } = useWrapCallback(
        currencies[Field.INPUT],
        currencies[Field.OUTPUT],
        typedValue
    )
    const showWrap: boolean = wrapType !== WrapType.NOT_APPLICABLE
    const { address: recipientAddress } = useENSAddress(recipient)

    const trade = showWrap ? undefined : v2Trade

    const parsedAmounts = showWrap
        ? {
              [Field.INPUT]: parsedAmount,
              [Field.OUTPUT]: parsedAmount
          }
        : {
              [Field.INPUT]: independentField === Field.INPUT ? parsedAmount : trade?.inputAmount,
              [Field.OUTPUT]: independentField === Field.OUTPUT ? parsedAmount : trade?.outputAmount
          }

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

    // modal and loading
    const [{ showConfirm, tradeToConfirm, swapErrorMessage, attemptingTxn, txHash }, setSwapState] = useState<{
        showConfirm: boolean
        tradeToConfirm: Trade | undefined
        attemptingTxn: boolean
        swapErrorMessage: string | undefined
        txHash: string | undefined
    }>({
        showConfirm: false,
        tradeToConfirm: undefined,
        attemptingTxn: false,
        swapErrorMessage: undefined,
        txHash: undefined
    })

    const formattedAmounts = {
        [independentField]: typedValue,
        [dependentField]: showWrap
            ? parsedAmounts[independentField]?.toExact() ?? ''
            : parsedAmounts[dependentField]?.toSignificant(6) ?? ''
    }

    const route = trade?.route
    const userHasSpecifiedInputOutput = Boolean(
        currencies[Field.INPUT] &&
            currencies[Field.OUTPUT] &&
            parsedAmounts[independentField]?.greaterThan(JSBI.BigInt(0))
    )
    const noRoute = !route

    // check whether the user has approved the router on the input token
    const [approval, approveCallback] = useApproveCallbackFromTrade(trade, allowedSlippage)

    // check if user has gone through approval process, used to show two step buttons, reset on token change
    const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false)

    // mark when a user has submitted an approval, reset onTokenSelection for input field
    useEffect(() => {
        if (approval === ApprovalState.PENDING) {
            setApprovalSubmitted(true)
        }
    }, [approval, approvalSubmitted])

    const maxAmountInput: CurrencyAmount | undefined = maxAmountSpend(currencyBalances[Field.INPUT])
    const atMaxAmountInput = Boolean(maxAmountInput && parsedAmounts[Field.INPUT]?.equalTo(maxAmountInput))

    // the callback to execute the swap
    const { callback: swapCallback, error: swapCallbackError } = useSwapCallback(trade, allowedSlippage, recipient)

    const { priceImpactWithoutFee } = computeTradePriceBreakdown(trade)

    const [singleHopOnly] = useUserSingleHopOnly()

    const handleSwap = useCallback(() => {
        if (priceImpactWithoutFee && !confirmPriceImpactWithoutFee(priceImpactWithoutFee)) {
            return
        }
        if (!swapCallback) {
            return
        }
        setSwapState({
            attemptingTxn: true,
            tradeToConfirm,
            showConfirm,
            swapErrorMessage: undefined,
            txHash: undefined
        })
        swapCallback()
            .then(hash => {
                setSwapState({
                    attemptingTxn: false,
                    tradeToConfirm,
                    showConfirm,
                    swapErrorMessage: undefined,
                    txHash: hash
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
                        trade?.inputAmount?.currency?.getSymbol(chainId),
                        trade?.outputAmount?.currency?.getSymbol(chainId)
                    ].join('/')
                })

                ReactGA.event({
                    category: 'Routing',
                    action: singleHopOnly ? 'Swap with multihop disabled' : 'Swap with multihop enabled'
                })
            })
            .catch(error => {
                setSwapState({
                    attemptingTxn: false,
                    tradeToConfirm,
                    showConfirm,
                    swapErrorMessage: error.message,
                    txHash: undefined
                })
            })
    }, [
        priceImpactWithoutFee,
        swapCallback,
        tradeToConfirm,
        showConfirm,
        recipient,
        recipientAddress,
        account,
        trade,
        chainId,
        singleHopOnly
    ])

    // errors
    const [showInverted, setShowInverted] = useState<boolean>(false)

    // warnings on slippage
    const priceImpactSeverity = warningSeverity(priceImpactWithoutFee)

    // show approve flow when: no error on inputs, not approved or pending, or approved in current session
    // never show if price impact is above threshold in non expert mode
    const showApproveFlow =
        !swapInputError &&
        (approval === ApprovalState.NOT_APPROVED ||
            approval === ApprovalState.PENDING ||
            (approvalSubmitted && approval === ApprovalState.APPROVED)) &&
        !(priceImpactSeverity > 3 && !isExpertMode)

    const handleConfirmDismiss = useCallback(() => {
        setSwapState({ showConfirm: false, tradeToConfirm, attemptingTxn, swapErrorMessage, txHash })
        // if there was a tx hash, we want to clear the input
        if (txHash) {
            onUserInput(Field.INPUT, '')
        }
    }, [attemptingTxn, onUserInput, swapErrorMessage, tradeToConfirm, txHash])

    const handleAcceptChanges = useCallback(() => {
        setSwapState({ tradeToConfirm: trade, swapErrorMessage, txHash, attemptingTxn, showConfirm })
    }, [attemptingTxn, showConfirm, swapErrorMessage, trade, txHash])

    const handleInputSelect = useCallback(
        inputCurrency => {
            setApprovalSubmitted(false) // reset 2 step UI for approvals
            onCurrencySelection(Field.INPUT, inputCurrency)
        },
        [onCurrencySelection]
    )

    const handleMaxInput = useCallback(() => {
        maxAmountInput && onUserInput(Field.INPUT, maxAmountInput.toExact())
    }, [maxAmountInput, onUserInput])

    const handleOutputSelect = useCallback(outputCurrency => onCurrencySelection(Field.OUTPUT, outputCurrency), [
        onCurrencySelection
    ])

    const swapIsUnsupported = useIsTransactionUnsupported(currencies?.INPUT, currencies?.OUTPUT)

    const [animateSwapArrows, setAnimateSwapArrows] = useState<boolean>(false)

    return (
        <Layout>
            <Head>
                <title>{i18n._(t`SushiSwap`)} | Sushi</title>
                <meta
                    name="description"
                    content="SushiSwap allows for swapping of ERC20 compatible tokens across multiple networks"
                />
            </Head>
            <TokenWarningModal
                isOpen={importTokensNotInDefault.length > 0 && !dismissTokenWarning}
                tokens={importTokensNotInDefault}
                onConfirm={handleConfirmTokenWarning}
            />
            <div id="swap-page" className="bg-dark-900 shadow-swap-blue-glow w-full max-w-2xl rounded p-4">
                <SwapHeader input={currencies[Field.INPUT]} output={currencies[Field.OUTPUT]} />
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
                {chainId && chainId === ChainId.MATIC && (
                    <div className="hidden md:block pb-4 space-y-2">
                        <DarkCard>
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="text-white">
                                        {i18n._(t`300M+ TVL on Polygon! Optimized routing enabled`)}
                                    </div>
                                    <div className="text-purple text-sm">
                                        {i18n._(t`Enjoy the lowest slippage on Polygon`)}
                                    </div>
                                </div>
                                <a
                                    href="https://ayokiroll.medium.com/cf7e932f3a8"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    className="inline-flex items-center rounded-sm px-3 py-2 border-2 border-purple text-purple"
                                >
                                    {i18n._(t`Read Tutorial`)}
                                </a>
                            </div>
                        </DarkCard>
                    </div>
                )}
                <AutoColumn gap={'md'}>
                    <CurrencyInputPanel
                        label={
                            independentField === Field.OUTPUT && !showWrap && trade
                                ? i18n._(t`Swap From (est.):`)
                                : i18n._(t`Swap From:`)
                        }
                        value={formattedAmounts[Field.INPUT]}
                        showMaxButton={!atMaxAmountInput}
                        currency={currencies[Field.INPUT]}
                        onUserInput={handleTypeInput}
                        onMax={handleMaxInput}
                        onCurrencySelect={handleInputSelect}
                        otherCurrency={currencies[Field.OUTPUT]}
                        id="swap-currency-input"
                    />
                    <AutoColumn justify="space-between">
                        <AutoRow justify={isExpertMode ? 'space-between' : 'flex-start'} style={{ padding: '0 1rem' }}>
                            <button
                                className="bg-dark-900 rounded-full p-3px -mt-6 -mb-6 z-10"
                                onClick={() => {
                                    setApprovalSubmitted(false) // reset 2 step UI for approvals
                                    onSwitchTokens()
                                }}
                            >
                                <div
                                    className="bg-dark-800 hover:bg-dark-700 rounded-full p-3"
                                    onMouseEnter={() => setAnimateSwapArrows(true)}
                                    onMouseLeave={() => setAnimateSwapArrows(false)}
                                >
                                    <Lottie
                                        animationData={swapArrowsAnimationData}
                                        autoplay={animateSwapArrows}
                                        loop={false}
                                        style={{ width: 32, height: 32 }}

                                        // className="text-secondary fill-current"
                                    />
                                </div>
                            </button>
                            {/* <ArrowWrapper clickable>
                                      <ArrowDown
                                        size="16"
                                        onClick={() => {
                                            setApprovalSubmitted(false) // reset 2 step UI for approvals
                                            onSwitchTokens()
                                        }}
                                        color={
                                            currencies[Field.INPUT] && currencies[Field.OUTPUT]
                                                ? theme.primary1
                                                : theme.text2
                                        }
                                    />
                                </ArrowWrapper> */}
                            {recipient === null && !showWrap && isExpertMode ? (
                                <LinkStyledButton id="add-recipient-button" onClick={() => onChangeRecipient('')}>
                                    + Add a send (optional)
                                </LinkStyledButton>
                            ) : null}
                        </AutoRow>
                    </AutoColumn>

                    <CurrencyInputPanel
                        value={formattedAmounts[Field.OUTPUT]}
                        onUserInput={handleTypeOutput}
                        label={
                            independentField === Field.INPUT && !showWrap && trade
                                ? i18n._(t`Swap To (est.):`)
                                : i18n._(t`Swap To:`)
                        }
                        showMaxButton={false}
                        currency={currencies[Field.OUTPUT]}
                        onCurrencySelect={handleOutputSelect}
                        otherCurrency={currencies[Field.INPUT]}
                        id="swap-currency-output"
                    />

                    {recipient !== null && !showWrap ? (
                        <>
                            <AutoRow justify="space-between" style={{ padding: '0 1rem' }}>
                                <ArrowWrapper clickable={false}>
                                    <ArrowDown size={16} />
                                </ArrowWrapper>
                                <LinkStyledButton id="remove-recipient-button" onClick={() => onChangeRecipient(null)}>
                                    - {i18n._(t`Remove send`)}
                                </LinkStyledButton>
                            </AutoRow>
                            <AddressInputPanel id="recipient" value={recipient} onChange={onChangeRecipient} />
                        </>
                    ) : null}

                    {showWrap ? null : (
                        <Card padding={showWrap ? '.25rem 1rem 0 1rem' : '0px'} borderRadius={'20px'}>
                            <AutoColumn gap="8px" style={{ padding: '0 16px' }}>
                                {Boolean(trade) && (
                                    <RowBetween align="center">
                                        <Text fontWeight={500} fontSize={14} color={theme.text2}>
                                            {i18n._(t`Price`)}
                                        </Text>
                                        <TradePrice
                                            price={trade?.executionPrice}
                                            showInverted={showInverted}
                                            setShowInverted={setShowInverted}
                                        />
                                    </RowBetween>
                                )}
                                {allowedSlippage !== INITIAL_ALLOWED_SLIPPAGE && (
                                    <RowBetween align="center">
                                        <div
                                            className="cursor-pointer font-semibold text-sm text-secondary"
                                            onClick={toggleSettings}
                                        >
                                            {i18n._(t`Slippage Tolerance`)}
                                        </div>
                                        <div
                                            className="cursor-pointer font-semibold text-sm text-secondary"
                                            onClick={toggleSettings}
                                        >
                                            {allowedSlippage / 100}%
                                        </div>
                                    </RowBetween>
                                )}
                            </AutoColumn>
                        </Card>
                    )}
                </AutoColumn>
                <BottomGrouping>
                    {swapIsUnsupported ? (
                        <ButtonPrimary disabled={true}>
                            <div>{i18n._(t`Unsupported Asset`)}</div>
                        </ButtonPrimary>
                    ) : !account ? (
                        <ButtonLight onClick={toggleWalletModal}>{i18n._(t`Connect Wallet`)}</ButtonLight>
                    ) : showWrap ? (
                        <ButtonPrimary disabled={Boolean(wrapInputError)} onClick={onWrap}>
                            {wrapInputError ??
                                (wrapType === WrapType.WRAP
                                    ? i18n._(t`Wrap`)
                                    : wrapType === WrapType.UNWRAP
                                    ? i18n._(t`Unwrap`)
                                    : null)}
                        </ButtonPrimary>
                    ) : noRoute && userHasSpecifiedInputOutput ? (
                        <GreyCard style={{ textAlign: 'center' }}>
                            <div className="mb-1">{i18n._(t`Insufficient liquidity for this trade`)}</div>
                            {singleHopOnly && <div className="mb-1">{i18n._(t`Try enabling multi-hop trades`)}</div>}
                        </GreyCard>
                    ) : showApproveFlow ? (
                        <RowBetween>
                            <ButtonConfirmed
                                onClick={approveCallback}
                                disabled={approval !== ApprovalState.NOT_APPROVED || approvalSubmitted}
                                width="48%"
                                altDisabledStyle={approval === ApprovalState.PENDING} // show solid button while waiting
                                confirmed={approval === ApprovalState.APPROVED}
                            >
                                {approval === ApprovalState.PENDING ? (
                                    <AutoRow gap="6px" justify="center">
                                        Approving <Loader stroke="white" />
                                    </AutoRow>
                                ) : approvalSubmitted && approval === ApprovalState.APPROVED ? (
                                    i18n._(t`Approved`)
                                ) : (
                                    i18n._(t`Approve ${currencies[Field.INPUT]?.getSymbol(chainId)}`)
                                )}
                            </ButtonConfirmed>
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
                                            txHash: undefined
                                        })
                                    }
                                }}
                                width="48%"
                                id="swap-button"
                                disabled={
                                    !isValid ||
                                    approval !== ApprovalState.APPROVED ||
                                    (priceImpactSeverity > 3 && !isExpertMode)
                                }
                                error={isValid && priceImpactSeverity > 2}
                            >
                                <Text fontSize={16} fontWeight={500}>
                                    {priceImpactSeverity > 3 && !isExpertMode
                                        ? i18n._(t`Price Impact High`)
                                        : priceImpactSeverity > 2
                                        ? i18n._(t`Swap Anyway`)
                                        : i18n._(t`Swap`)}
                                </Text>
                            </ButtonError>
                        </RowBetween>
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
                                        txHash: undefined
                                    })
                                }
                            }}
                            id="swap-button"
                            disabled={!isValid || (priceImpactSeverity > 3 && !isExpertMode) || !!swapCallbackError}
                            error={isValid && priceImpactSeverity > 2 && !swapCallbackError}
                        >
                            <Text fontSize={20} fontWeight={500}>
                                {swapInputError
                                    ? swapInputError
                                    : priceImpactSeverity > 3 && !isExpertMode
                                    ? i18n._(t`Price Impact Too High`)
                                    : priceImpactSeverity > 2
                                    ? i18n._(t`Swap Anyway`)
                                    : i18n._(t`Swap`)}
                            </Text>
                        </ButtonError>
                    )}
                    {showApproveFlow && (
                        <Column style={{ marginTop: '1rem' }}>
                            <ProgressSteps steps={[approval === ApprovalState.APPROVED]} />
                        </Column>
                    )}
                    {isExpertMode && swapErrorMessage ? <SwapCallbackError error={swapErrorMessage} /> : null}
                </BottomGrouping>
                {!trade && chainId && chainId === ChainId.MAINNET && (
                    <div className="hidden sm:block w-full cursor-pointer pt-4" onClick={() => toggleNetworkModal()}>
                        <DarkCard>
                            <div className="flex justify-between items-center overflow-hidden">
                                <Image
                                    src="/polygon-logo.png"
                                    width="32px"
                                    height="32px"
                                    className="w-24 h-24 absolute top-2"
                                    alt=""
                                />
                                <div className="pl-32">
                                    <div className="text-high-emphesis">
                                        {i18n._(t`Check out Sushi on Polygon (Matic)`)}
                                    </div>
                                    <div className="text-high-emphesis text-sm">
                                        {i18n._(t`Click here to switch to Polygon using Metamask`)}
                                    </div>
                                </div>
                            </div>
                        </DarkCard>
                    </div>
                )}
            </div>
            {!swapIsUnsupported ? (
                <AdvancedSwapDetailsDropdown trade={trade} />
            ) : (
                <UnsupportedCurrencyFooter
                    show={swapIsUnsupported}
                    currencies={[currencies.INPUT, currencies.OUTPUT]}
                />
            )}
        </Layout>
    )
}
