import { ChevronDownIcon } from '@heroicons/react/outline'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Currency, CurrencyAmount, Pair, Percent, Token } from '@radioshackswap/sdk'
import Lottie from 'lottie-react'
import React, { ReactNode, useCallback, useState } from 'react'
import selectCoinAnimation from '../../animation/select-coin.json'
import { classNames, formatCurrencyAmount } from '../../functions'
import CurrencySearchModal from '../../modals/SearchModal/CurrencySearchModal'
import { useActiveWeb3React } from '../../services/web3'
import { useCurrencyBalance } from '../../state/wallet/hooks'
import Button from '../Button'
import CurrencyLogo from '../CurrencyLogo'
import DoubleCurrencyLogo from '../DoubleLogo'
import Input from '../Input'
import { FiatValue } from './FiatValue'

interface CurrencyInputPanelProps {
  value?: string
  onUserInput?: (value: string) => void
  onMax?: () => void
  showMaxButton: boolean
  label?: string
  onCurrencySelect?: (currency: Currency) => void
  currency?: Currency | null
  disableCurrencySelect?: boolean
  hideBalance?: boolean
  pair?: Pair | null
  hideInput?: boolean
  otherCurrency?: Currency | null
  fiatValue?: CurrencyAmount<Token> | null
  priceImpact?: Percent
  id: string
  showCommonBases?: boolean
  allowManageTokenList?: boolean
  renderBalance?: (amount: CurrencyAmount<Currency>) => ReactNode
  locked?: boolean
  customBalanceText?: string
  showSearch?: boolean
}

export default function CurrencyInputPanel({
  value,
  onUserInput,
  onMax,
  showMaxButton,
  label = 'Input',
  onCurrencySelect,
  currency,
  disableCurrencySelect = false,
  otherCurrency,
  id,
  showCommonBases,
  renderBalance,
  fiatValue,
  priceImpact,
  hideBalance = false,
  pair = null, // used for double token logo
  hideInput = false,
  locked = false,
  customBalanceText,
  allowManageTokenList = true,
  showSearch = false,
}: CurrencyInputPanelProps) {
  const { i18n } = useLingui()
  const [modalOpen, setModalOpen] = useState(false)
  const { account } = useActiveWeb3React()
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)

  const handleDismissSearch = useCallback(() => {
    setModalOpen(false)
  }, [setModalOpen])
  var inputCurrencyWidth = 'sm:w-2/5'
  var inputValueWidth = 'sm:w-3/5'

  if (currency && currency.symbol !== 'UNKNOWN') {
    inputCurrencyWidth = 'sm:w-1/3'
    inputValueWidth = 'sm:w-2/3'
  }
  return (
    <div id={id} className={classNames('p-2', 'rounded bg-[#F7F8FA]')}>
      <div className="flex flex-col items-center justify-between space-y-3 sm:space-y-0 sm:flex-row">
        <div className={classNames('w-full', inputCurrencyWidth)}>
          <button
            type="button"
            className={classNames(
              !!currency ? 'text-black' : 'text-high-emphesis',
              'open-currency-select-button h-[38px] bg-white p-1 outline-none rounded-lg select-none cursor-pointer font-normal border-none text-base items-center'
            )}
            onClick={() => {
              if (onCurrencySelect) {
                setModalOpen(true)
              }
            }}
          >
            <div className="flex items-center">
              {pair ? (
                <DoubleCurrencyLogo currency0={pair.token0} currency1={pair.token1} size={54} margin={true} />
              ) : currency ? (
                <div className="flex items-center">
                  <CurrencyLogo currency={currency} size={'24px'} />
                </div>
              ) : (
                <div className="rounded bg-light-700" style={{ maxWidth: 24, maxHeight: 24 }}>
                  <div style={{ width: 24, height: 24 }}>
                    <Lottie animationData={selectCoinAnimation} autoplay loop />
                  </div>
                </div>
              )}
              {pair ? (
                <span
                  className={classNames(
                    'pair-name-container',
                    Boolean(currency && currency.symbol) ? 'text-base' : 'text-xs'
                  )}
                >
                  {pair?.token0.symbol}:{pair?.token1.symbol}
                </span>
              ) : (
                <div className="flex flex-1 flex-col items-start justify-center mx-3.5">
                  {/* {label && <div className="text-xs font-medium text-secondary whitespace-nowrap">{label}</div>} */}
                  <div className="flex items-center">
                    <div className="text-base font-normal token-symbol-container">
                      {(currency && currency.symbol && currency.symbol.length > 20
                        ? currency.symbol.slice(0, 4) +
                          '...' +
                          currency.symbol.slice(currency.symbol.length - 5, currency.symbol.length)
                        : currency?.symbol) || (
                        <div className="px-2 py-1 mt-1 text-xs font-medium bg-transparent border rounded-full hover:bg-primary border-low-emphesis text-secondary whitespace-nowrap ">
                          {i18n._(t`Select a token`)}
                        </div>
                      )}
                    </div>

                    {!disableCurrencySelect && currency && (
                      <ChevronDownIcon width={16} height={16} className="ml-2 stroke-current" />
                    )}
                  </div>
                </div>
              )}
            </div>
          </button>
        </div>
        {!hideInput && (
          <div
            className={classNames(
              'flex items-center w-full space-x-3 rounded focus:bg-dark-700 p-2',
              inputValueWidth
              // showMaxButton && selectedCurrencyBalance && 'px-3'
            )}
          >
            <>
              <Input.Numeric
                id="token-amount-input"
                value={value}
                onUserInput={(val) => {
                  onUserInput(val)
                }}
              />
              {!hideBalance && currency && selectedCurrencyBalance ? (
                <div className="flex flex-col">
                  <div onClick={onMax} className="text-xs font-medium text-right cursor-pointer text-low-emphesis">
                    {renderBalance ? (
                      renderBalance(selectedCurrencyBalance)
                    ) : (
                      <>
                        {i18n._(t`Balance:`)} {formatCurrencyAmount(selectedCurrencyBalance, 4)} {currency.symbol}
                      </>
                    )}
                  </div>
                  <FiatValue fiatValue={fiatValue} priceImpact={priceImpact} />
                </div>
              ) : null}
              {showMaxButton && selectedCurrencyBalance && (
                <Button
                  onClick={onMax}
                  size="xs"
                  className="text-xs font-medium bg-transparent border rounded-full hover:bg-primary border-[#6EDABC] text-[#6EDABC] whitespace-nowrap"
                >
                  {i18n._(t`Max`)}
                </Button>
              )}
            </>
          </div>
        )}
      </div>
      {!disableCurrencySelect && onCurrencySelect && (
        <CurrencySearchModal
          isOpen={modalOpen}
          onDismiss={handleDismissSearch}
          onCurrencySelect={onCurrencySelect}
          selectedCurrency={currency}
          otherSelectedCurrency={otherCurrency}
          showCommonBases={showCommonBases}
          allowManageTokenList={allowManageTokenList}
          hideBalance={hideBalance}
          showSearch={showSearch}
        />
      )}
    </div>
  )
}
