import { Currency, Percent, Price } from '@radioshackswap/sdk'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
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
    <div className={classNames('flex-1 flex flex-col min-h-[262px] justify-between p-4 h-full min-w-[260px]', className)}>
      <div className="text-[#C2C4C8]">
        <Typography variant="sm" className="select-none text-black">
          {i18n._(
            t`${price?.toSignificant(6) ?? '-'} ${currencies[Field.CURRENCY_B]?.symbol} per ${
              currencies[Field.CURRENCY_A]?.symbol
            }`
          )}
        </Typography>
        <Typography variant="sm" className="select-none text-black">
          {i18n._(
            t`${price?.invert()?.toSignificant(6) ?? '-'} ${currencies[Field.CURRENCY_A]?.symbol} per ${
              currencies[Field.CURRENCY_B]?.symbol
            }`
          )}
        </Typography>
      </div>

      <div className="text-[#C2C4C8]">
        <Typography variant="sm" className="select-none text-black">
          {noLiquidity && price
            ? '100'
            : (poolTokenPercentage?.lessThan(ONE_BIPS) ? '<0.01' : poolTokenPercentage?.toFixed(2)) ?? '0'}
          %
        </Typography>
        <Typography variant="sm" className="select-none text-black">
          {i18n._(t`Share of Pool`)}
        </Typography>
      </div>
    </div>
  )
}
