import { Popover } from '@headlessui/react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { ChainId, SHACK_ADDRESS } from '@radioshackswap/sdk'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { ANALYTICS_URL } from '../../constants'
import { Feature, featureEnabled } from '../../functions/feature'
import { useActiveWeb3React } from '../../services/web3'
import { useETHBalances } from '../../state/wallet/hooks'
import ExternalLink from '../ExternalLink'
import MarketPlace from '../MarketPlace'
import NavLink from '../NavLink'
import QuestionHelper from '../QuestionHelper'
import Web3Network from '../Web3Network'
import Web3Status from '../Web3Status'
import More from './More'

// import { ExternalLink, NavLink } from "./Link";
// import { ReactComponent as Burger } from "../assets/images/burger.svg";

function AppBar(): JSX.Element {
  const { i18n } = useLingui()
  const { account, chainId, library } = useActiveWeb3React()

  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']

  return (
    <header className="flex-shrink-0 w-full">
      <Popover as="nav" className="z-10 w-full bg-transparent header-border-b">
        {({ open }) => (
          <>
            <div className="px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <NavLink href="/swap">
                    <a>
                      <Image src="/logo.png" alt="Radio" width="239px" height="32px" />
                    </a>
                  </NavLink>
                  <div className="hidden sm:block sm:ml-4">
                    <div className="flex space-x-2">
                      {/* <Buy /> */}
                      <NavLink href="/swap">
                        <a
                          id={`swap-nav-link`}
                          className="p-2 text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis md:p-3 whitespace-nowrap"
                        >
                          {i18n._(t`Swap`)}
                        </a>
                      </NavLink>
                      <NavLink href="/pool">
                        <a
                          id={`pool-nav-link`}
                          className="p-2 text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis md:p-3 whitespace-nowrap"
                        >
                          {i18n._(t`Pool`)}
                        </a>
                      </NavLink>

                      {chainId && featureEnabled(Feature.STAKING, chainId) && (
                        <NavLink href={'/stake'}>
                          <a
                            id={`stake-nav-link`}
                            className="p-2 text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis md:p-3 whitespace-nowrap"
                          >
                            {i18n._(t`Stake`)}
                          </a>
                        </NavLink>
                      )}
                    </div>
                  </div>
                </div>

                <div className="fixed bottom-0 left-0 z-10 flex flex-row items-center justify-center w-full p-4 lg:w-auto bg-dark-1000 lg:relative lg:p-0 lg:bg-transparent">
                  <div className="flex items-center justify-between w-full space-x-2 sm:justify-end">
                    {chainId &&
                      [ChainId.MAINNET, ChainId.MATIC].includes(chainId) &&
                      library &&
                      library.provider.isMetaMask && (
                        <>
                          <QuestionHelper text={i18n._(t`Add xSHACK to your MetaMask wallet`)}>
                            <div
                              className="hidden p-0.5 rounded-md cursor-pointer sm:inline-flex bg-dark-900 hover:bg-dark-800"
                              onClick={() => {
                                if (library && library.provider.isMetaMask && library.provider.request) {
                                  const params: any = {
                                    type: 'ERC20',
                                    options: {
                                      address: '0x8798249c2e607446efb7ad49ec89dd1865ff4272',
                                      symbol: 'XSHACK',
                                      decimals: 18,
                                      image:
                                        'https://user-images.githubusercontent.com/89943761/149034857-5ebd3f05-ddc9-4a35-9085-11d38bada2a1.png',
                                    },
                                  }
                                  library.provider
                                    .request({
                                      method: 'wallet_watchAsset',
                                      params,
                                    })
                                    .then((success) => {
                                      if (success) {
                                        console.log('Successfully added XSHACK to MetaMask')
                                      } else {
                                        throw new Error('Something went wrong.')
                                      }
                                    })
                                    .catch(console.error)
                                }
                              }}
                            >
                              <Image
                                src="/images/tokens/s-radio-square.jpg"
                                alt="xSHACK"
                                width="38px"
                                height="38px"
                                objectFit="contain"
                                className="rounded-md"
                              />
                            </div>
                          </QuestionHelper>
                        </>
                      )}

                    {chainId && chainId in SHACK_ADDRESS && library && library.provider.isMetaMask && (
                      <>
                        <QuestionHelper text={i18n._(t`Add SHACK to your MetaMask wallet`)}>
                          <div
                            className="hidden rounded-md cursor-pointer sm:inline-flex bg-dark-900 hover:bg-dark-800 p-0.5"
                            onClick={() => {
                              const params: any = {
                                type: 'ERC20',
                                options: {
                                  address: SHACK_ADDRESS[chainId],
                                  symbol: 'SHACK',
                                  decimals: 18,
                                  image:
                                    'https://user-images.githubusercontent.com/89943761/149034841-2e2a3e0c-cc39-4e4e-8004-7f020d4d8199.png',
                                },
                              }
                              if (library && library.provider.isMetaMask && library.provider.request) {
                                library.provider
                                  .request({
                                    method: 'wallet_watchAsset',
                                    params,
                                  })
                                  .then((success) => {
                                    if (success) {
                                      console.log('Successfully added SHACK to MetaMask')
                                    } else {
                                      throw new Error('Something went wrong.')
                                    }
                                  })
                                  .catch(console.error)
                              }
                            }}
                          >
                            <Image
                              src="/images/tokens/radio-square.jpg"
                              alt="SHACK"
                              width="38px"
                              height="38px"
                              objectFit="contain"
                              className="rounded-md"
                            />
                          </div>
                        </QuestionHelper>
                      </>
                    )}
                    <MarketPlace />
                    {library && library.provider.isMetaMask && (
                      <div className="hidden sm:inline-block">
                        <Web3Network />
                      </div>
                    )}

                    <div className="w-auto flex items-center rounded bg-dark-900 hover:bg-dark-800 p-0.5 whitespace-nowrap text-sm font-bold cursor-pointer select-none pointer-events-auto">
                      <Web3Status />
                    </div>
                    <More />
                  </div>
                </div>
              </div>
            </div>

            <Popover.Panel className="sm:hidden">
              <div className="flex flex-col px-4 pt-2 pb-3 space-y-1">
                <Link href={'/swap'}>
                  <a
                    id={`swap-nav-link`}
                    className="p-2 text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis md:p-3 whitespace-nowrap"
                  >
                    {i18n._(t`Swap`)}
                  </a>
                </Link>
                <Link href={'/pool'}>
                  <a
                    id={`pool-nav-link`}
                    className="p-2 text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis md:p-3 whitespace-nowrap"
                  >
                    {i18n._(t`Pool`)}
                  </a>
                </Link>

                {/* {chainId && featureEnabled(Feature.LIQUIDITY_MINING, chainId) && (
                  <Link href={'/farm'}>
                    <a
                      id={`farm-nav-link`}
                      className="p-2 text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis md:p-3 whitespace-nowrap"
                    >
                      {' '}
                      {i18n._(t`Farm`)}
                    </a>
                  </Link>
                )} */}

                {/* {chainId && featureEnabled(Feature.KASHI, chainId) && (
                  <>
                    <Link href={'/lend'}>
                      <a
                        id={`farm-nav-link`}
                        className="p-2 text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis md:p-3 whitespace-nowrap"
                      >
                        {' '}
                        {i18n._(t`Farm`)}
                      </a>
                    </Link>
                    <Link href={'/borrow'}>
                      <a
                        id={`borrow-nav-link`}
                        className="p-2 text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis md:p-3 whitespace-nowrap"
                      >
                        {i18n._(t`Borrow`)}
                      </a>
                    </Link>
                  </>
                )} */}

                {chainId && featureEnabled(Feature.STAKING, chainId) && (
                  <Link href={'/stake'}>
                    <a
                      id={`stake-nav-link`}
                      className="p-2 text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis md:p-3 whitespace-nowrap"
                    >
                      {i18n._(t`Stake`)}
                    </a>
                  </Link>
                )}

                {chainId && featureEnabled(Feature.ANALYTICS, chainId) && (
                  <ExternalLink
                    id={`analytics-nav-link`}
                    href={ANALYTICS_URL[chainId] || 'https://analytics.radioshack.com'}
                    className="p-2 text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis md:p-3 whitespace-nowrap"
                  >
                    {i18n._(t`Analytics`)}
                  </ExternalLink>
                )}
              </div>
            </Popover.Panel>
          </>
        )}
      </Popover>
    </header>
  )
}

export default AppBar
