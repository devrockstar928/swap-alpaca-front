import { CurrencyAmount, Token } from '@alpaca-swap/sdk'

type TokenAddress = string

export type TokenBalancesMap = Record<TokenAddress, CurrencyAmount<Token>>
