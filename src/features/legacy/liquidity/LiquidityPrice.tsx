import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Currency, Percent, Price } from '@radioshackswap/sdk'
import React from 'react'
import Typography from '../../../components/Typography'
import { ONE_BIPS } from '../../../constants'
import { classNames } from '../../../functions'
import { Field } from '../../../state/mint/actions'

export default function LiquidityPrice({
  currencies,
  price,
  noLiquidity,
  poolTokenPercentage,
  className,
}: {
  currencies: { [field in Field]?: Currency }
  price?: Price<Currency, Currency>
  noLiquidity?: boolean
  poolTokenPercentage?: Percent
  className?: string
}): JSX.Element {
  const { i18n } = useLingui()
  return (
    <div
      className={classNames('flex-1 flex flex-col min-h-[262px] justify-center p-4 h-full min-w-[260px]', className)}
    >
      <div className="">
        <Typography variant="sm" className="select-none font-semibold text-black text-[14px]">
          {i18n._(
            t`${price?.toSignificant(6) ?? '-'} ${currencies[Field.CURRENCY_B]?.symbol} = 1 ${
              currencies[Field.CURRENCY_A]?.symbol
            }`
          )}
        </Typography>
        <Typography variant="sm" className="select-none font-semibold text-black text-[14px]">
          {i18n._(
            t`${price?.invert()?.toSignificant(6) ?? '-'} ${currencies[Field.CURRENCY_A]?.symbol} = 1 ${
              currencies[Field.CURRENCY_B]?.symbol
            }`
          )}
        </Typography>
      </div>

      <div className="text-[#565A69] pt-4">
        <Typography variant="sm" className="select-none">
          {noLiquidity && price
            ? '100'
            : (poolTokenPercentage?.lessThan(ONE_BIPS) ? '<0.01' : poolTokenPercentage?.toFixed(2)) ?? '0'}
          % {i18n._(t`Share of Pool`)}
        </Typography>
        <Typography variant="sm" className="select-none"></Typography>
      </div>
    </div>
  )
}
