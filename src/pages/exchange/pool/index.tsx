import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { CurrencyAmount, NATIVE, Pair } from '@radioshackswap/sdk'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import Alert from '../../../components/Alert'
import Button from '../../../components/Button'
import Container from '../../../components/Container'
import Dots from '../../../components/Dots'
import Empty from '../../../components/Empty'
import FullPositionCard from '../../../components/PositionCard'
import Web3Connect from '../../../components/Web3Connect'
import { MigrationSupported } from '../../../features/migration'
import { classNames, currencyId } from '../../../functions'
import { useV2Pairs } from '../../../hooks/useV2Pairs'
import { useActiveWeb3React } from '../../../services/web3'
import { toV2LiquidityToken, useTrackedTokenPairs } from '../../../state/user/hooks'
import { useETHBalances, useTokenBalancesWithLoadingIndicator } from '../../../state/wallet/hooks'

export default function Pool() {
  const { i18n } = useLingui()
  const router = useRouter()
  const { account, chainId } = useActiveWeb3React()

  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']

  // fetch the user's balances of all tracked V2 LP tokens
  const trackedTokenPairs = useTrackedTokenPairs()
  //console.log('trackedTokenPairs=', trackedTokenPairs.filter(t => (t[0] as any)?.tokenInfo?.symbol == 'RADIO' || (t[1] as any)?.tokenInfo?.symbol == 'RADIO'));
  const tokenPairsWithLiquidityTokens = useMemo(
    () =>
      trackedTokenPairs.map((tokens) => ({
        liquidityToken: toV2LiquidityToken(tokens),
        tokens,
      })),
    [trackedTokenPairs]
  )
  const liquidityTokens = useMemo(
    () => tokenPairsWithLiquidityTokens.map((tpwlt) => tpwlt.liquidityToken),
    [tokenPairsWithLiquidityTokens]
  )
  //console.log('liquidityTokens=', liquidityTokens);
  //console.log('liquidityTokens(0x003e4D8A7cE0ae7C82eF47333826c0c4a555d534)=', liquidityTokens.filter(t => t.address == '0x003e4D8A7cE0ae7C82eF47333826c0c4a555d534'));
  //console.log('liquidityTokens(0xcd578f016888b57f1b1e3f887f392f0159e26747)=', liquidityTokens.filter(t => t.address == '0xcd578f016888b57f1b1e3f887f392f0159e26747'));
  const [v2PairsBalances, fetchingV2PairBalances] = useTokenBalancesWithLoadingIndicator(
    account ?? undefined,
    liquidityTokens
  )

  // fetch the reserves for all V2 pools in which the user has a balance
  const liquidityTokensWithBalances = useMemo(
    () =>
      tokenPairsWithLiquidityTokens.filter(({ liquidityToken }) =>
        v2PairsBalances[liquidityToken.address]?.greaterThan('0')
      ),
    [tokenPairsWithLiquidityTokens, v2PairsBalances]
  )

  const v2Pairs = useV2Pairs(liquidityTokensWithBalances.map(({ tokens }) => tokens))
  const v2IsLoading =
    fetchingV2PairBalances || v2Pairs?.length < liquidityTokensWithBalances.length || v2Pairs?.some((V2Pair) => !V2Pair)

  const allV2PairsWithLiquidity = v2Pairs.map(([, pair]) => pair).filter((v2Pair): v2Pair is Pair => Boolean(v2Pair))

  // TODO: Replicate this!
  // show liquidity even if its deposited in rewards contract
  // const stakingInfo = useStakingInfo()
  // const stakingInfosWithBalance = stakingInfo?.filter((pool) =>
  //   JSBI.greaterThan(pool.stakedAmount.quotient, BIG_INT_ZERO)
  // )
  // const stakingPairs = useV2Pairs(stakingInfosWithBalance?.map((stakingInfo) => stakingInfo.tokens))

  // // remove any pairs that also are included in pairs with stake in mining pool
  // const v2PairsWithoutStakedAmount = allV2PairsWithLiquidity.filter((v2Pair) => {
  //   return (
  //     stakingPairs
  //       ?.map((stakingPair) => stakingPair[1])
  //       .filter((stakingPair) => stakingPair?.liquidityToken.address === v2Pair.liquidityToken.address).length === 0
  //   )
  // })
  const migrationSupported = chainId in MigrationSupported
  return (
    <Container id="pool-page" className="py-4 space-y-6 md:py-8 lg:py-12" maxWidth="2xl">
      <Head>
        <title>Pool | RadioShack</title>
        <meta
          key="description"
          name="description"
          content="RadioShack Swap liquidity pools are markets for trades between the two tokens, you can provide these tokens and become a liquidity provider to earn 0.25% of fees from trades."
        />
      </Head>

      {/* <Alert
        title={i18n._(t`Liquidity Provider Rewards`)}
        message={i18n._(
          t`Liquidity providers earn a 0.25% fee on all trades proportional to their share of the pool. Fees are added to the pool, accrue in real time and can be claimed by withdrawing your liquidity`
        )}
        type="error"
      /> */}

      <div className="p-4 space-y-4 rounded bg-dark-900">
        <div className="grid grid-flow-row gap-3">
          {!account ? (
            <Web3Connect size="lg" color="blue" className="w-full" />
          ) : v2IsLoading ? (
            <Empty>
              <Dots>{i18n._(t`Loading`)}</Dots>
            </Empty>
          ) : allV2PairsWithLiquidity?.length > 0 ? (
            <>
              {/* <div className="flex items-center justify-center">
                  <ExternalLink
                    href={"https://analytics.radioshack.com/user/" + account}
                  >
                    Account analytics and accrued fees <span> ???</span>
                  </ExternalLink>
                </div> */}
              {allV2PairsWithLiquidity.map((v2Pair) => (
                <FullPositionCard
                  key={v2Pair.liquidityToken.address}
                  pair={v2Pair}
                  stakedBalance={CurrencyAmount.fromRawAmount(v2Pair.liquidityToken, '0')}
                />
              ))}
            </>
          ) : (
            <Empty className="flex text-lg text-center text-low-emphesis">
              <div className="px-4 py-2">{i18n._(t`No liquidity was found. `)}</div>
            </Empty>
          )}
          <div className={classNames('grid gap-4', 'grid-cols-3')}>
            <Button
              id="add-pool-button"
              color="gradient"
              className="grid items-center justify-center grid-flow-col gap-2 whitespace-nowrap bg-gradient-to-r from-light-red to-dark-red hover:from-light-red-1 hover:to-dark-red-1"
              onClick={() => router.push(`/add/${currencyId(NATIVE[chainId])}`)}
            >
              {i18n._(t`Add`)}
            </Button>
            <Button
              id="add-pool-button"
              color="gray"
              className="w-full text-black bg-white bg-opacity-100 border-dark-800 hover:bg-opacity-80"
              onClick={() => router.push(`/find`)}
            >
              {i18n._(t`Import`)}
            </Button>
            <Button
              id="add-pool-button"
              color="gray"
              className="w-full text-black bg-white bg-opacity-100 border-dark-800 hover:bg-opacity-80"
              onClick={() => router.push(`/migrate`)}
            >
              {i18n._(t`Migrate`)}
            </Button>
          </div>
        </div>
      </div>
    </Container>
  )
}
