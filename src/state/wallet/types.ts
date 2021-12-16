import { CurrencyAmount, Token } from '@radioshackswap/sdk'

type TokenAddress = string

export type TokenBalancesMap = Record<TokenAddress, CurrencyAmount<Token>>
