import {
  exchange,
  getAlcxPrice,
  getBundle,
  getCvxPrice,
  getLiquidityPositions,
  getMaticPrice,
  getOnePrice,
  getStakePrice,
  getSushiPrice,
  getTokenPrice,
  getTokens,
  getDayData,
} from '../fetchers'
import { getEthPrice, getPairs } from '../fetchers'
import useSWR, { SWRConfiguration } from 'swr'

import { ChainId } from '@sushiswap/sdk'
import { ethPriceQuery } from '../queries'
import { useActiveWeb3React } from '../../../hooks'

export function useExchange(variables = undefined, query = undefined, swrConfig: SWRConfiguration = undefined) {
  const { chainId } = useActiveWeb3React()
  const { data } = useSWR(
    chainId ? [chainId, query, JSON.stringify(variables)] : null,
    () => exchange(chainId, query, variables),
    swrConfig
  )
  return data
}

export function useEthPrice(variables = undefined, swrConfig: SWRConfiguration = undefined) {
  const { chainId } = useActiveWeb3React()
  const { data } = useSWR(
    chainId ? ['ethPrice', JSON.stringify(variables)] : null,
    () => getEthPrice(chainId, variables),
    swrConfig
  )
  return data
}

export function useStakePrice(swrConfig: SWRConfiguration = undefined) {
  const { chainId } = useActiveWeb3React()
  const shouldFetch = chainId && chainId === ChainId.XDAI
  const { data } = useSWR(shouldFetch ? 'stakePrice' : null, () => getStakePrice(), swrConfig)
  return data
}

export function useOnePrice(swrConfig: SWRConfiguration = undefined) {
  const { chainId } = useActiveWeb3React()
  const shouldFetch = chainId && chainId === ChainId.HARMONY
  const { data } = useSWR(shouldFetch ? 'onePrice' : null, () => getOnePrice(), swrConfig)
  return data
}

export function useAlcxPrice(swrConfig: SWRConfiguration = undefined) {
  const { chainId } = useActiveWeb3React()
  const { data } = useSWR(chainId && chainId === ChainId.MAINNET ? 'aclxPrice' : null, () => getAlcxPrice(), swrConfig)
  return data
}

export function useCvxPrice(swrConfig: SWRConfiguration = undefined) {
  const { chainId } = useActiveWeb3React()
  const { data } = useSWR(chainId && chainId === ChainId.MAINNET ? 'cvxPrice' : null, () => getCvxPrice(), swrConfig)
  return data
}

export function useMaticPrice(swrConfig: SWRConfiguration = undefined) {
  const { chainId } = useActiveWeb3React()
  const { data } = useSWR(chainId && chainId === ChainId.MATIC ? 'maticPrice' : null, () => getMaticPrice(), swrConfig)
  return data
}

export function useSushiPrice(swrConfig: SWRConfiguration = undefined) {
  const { data } = useSWR('sushiPrice', () => getSushiPrice(), swrConfig)
  return data
}

export function useBundle(variables = undefined, swrConfig: SWRConfiguration = undefined) {
  const { chainId } = useActiveWeb3React()
  const { data } = useSWR(
    chainId ? [chainId, ethPriceQuery, JSON.stringify(variables)] : null,
    () => getBundle(),
    swrConfig
  )
  return data
}

export function useLiquidityPositions(variables = undefined, swrConfig: SWRConfiguration = undefined) {
  const { chainId } = useActiveWeb3React()
  const shouldFetch = chainId
  const { data } = useSWR(
    shouldFetch ? ['liquidityPositions', chainId, JSON.stringify(variables)] : null,
    (_, chainId) => getLiquidityPositions(chainId, variables),
    swrConfig
  )
  return data
}

export function useSushiPairs(variables = undefined, swrConfig: SWRConfiguration = undefined) {
  const { chainId } = useActiveWeb3React()
  const shouldFetch = chainId
  const { data } = useSWR(
    shouldFetch ? ['sushiPairs', chainId, JSON.stringify(variables)] : null,
    (_, chainId) => getPairs(chainId, variables),
    swrConfig
  )
  return data
}

export function useTokens(variables = undefined, query = undefined, swrConfig: SWRConfiguration = undefined) {
  const { chainId } = useActiveWeb3React()
  const shouldFetch = chainId
  const { data } = useSWR(
    shouldFetch ? ['tokens', chainId, query, JSON.stringify(variables)] : null,
    (_, chainId) => getTokens(chainId, query, variables),
    swrConfig
  )
  return data
}

export function useDayData(variables = undefined, query = undefined, swrConfig: SWRConfiguration = undefined) {
  const { chainId } = useActiveWeb3React()
  const shouldFetch = chainId
  const res = useSWR(
    shouldFetch ? ['dayData', chainId, query, JSON.stringify(variables)] : null,
    (_, chainId) => getDayData(chainId, query, variables),
    swrConfig
  )
  return res
}
