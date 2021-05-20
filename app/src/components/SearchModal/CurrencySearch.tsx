import { Currency, NATIVE, Token } from '@sushiswap/sdk'
import React, { KeyboardEvent, RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Row, { RowFixed } from '../Row'
import { filterTokens, useSortedTokensByQuery } from './filtering'
import { useAllTokens, useFoundOnInactiveList, useIsUserAddedToken, useToken } from '../../hooks/Tokens'

import AutoSizer from 'react-virtualized-auto-sizer'
import ButtonText from '../ButtonText'
import Column from '../Column'
import CommonBases from './CommonBases'
import CurrencyList from './CurrencyList'
import { Edit } from 'react-feather'
import { FixedSizeList } from 'react-window'
import IconWrapper from '../IconWrapper'
import ImportRow from './ImportRow'
import ModalHeader from '../ModalHeader'
import ReactGA from 'react-ga'
import { isAddress } from '../../functions/validate'
import styled from 'styled-components'
import { t } from '@lingui/macro'
import { useActiveWeb3React } from '../../hooks/useActiveWeb3React'
import useDebounce from '../../hooks/useDebounce'
import { useLingui } from '@lingui/react'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import useTheme from '../../hooks/useTheme'
import useToggle from '../../hooks/useToggle'
import { useTokenComparator } from './sorting'

const ContentWrapper = styled(Column)`
    height: 100%;
    width: 100%;
    flex: 1 1;
    position: relative;
    overflow-y: hidden;
`

interface CurrencySearchProps {
    isOpen: boolean
    onDismiss: () => void
    selectedCurrency?: Currency | null
    onCurrencySelect: (currency: Currency) => void
    otherSelectedCurrency?: Currency | null
    showCommonBases?: boolean
    showManageView: () => void
    showImportView: () => void
    setImportToken: (token: Token) => void
}

export function CurrencySearch({
    selectedCurrency,
    onCurrencySelect,
    otherSelectedCurrency,
    showCommonBases,
    onDismiss,
    isOpen,
    showManageView,
    showImportView,
    setImportToken
}: CurrencySearchProps) {
    console.log('CURRENCY SEARCH')

    const { i18n } = useLingui()

    const { chainId } = useActiveWeb3React()
    const theme = useTheme()

    // refs for fixed size lists
    const fixedList = useRef<FixedSizeList>()

    const [searchQuery, setSearchQuery] = useState<string>('')
    const debouncedQuery = useDebounce(searchQuery, 200)
    const [invertSearchOrder] = useState<boolean>(false)

    const allTokens = useAllTokens()

    // if they input an address, use it
    const isAddressSearch = isAddress(debouncedQuery)
    const searchToken = useToken(debouncedQuery)
    const searchTokenIsAdded = useIsUserAddedToken(searchToken)

    useEffect(() => {
        if (isAddressSearch) {
            ReactGA.event({
                category: 'Currency Select',
                action: 'Search by address',
                label: isAddressSearch
            })
        }
    }, [isAddressSearch])

    const showETH: boolean = useMemo(() => {
        const s = debouncedQuery.toLowerCase().trim()
        return s === '' || s === 'e' || s === 'et' || s === 'eth'
    }, [debouncedQuery])

    const tokenComparator = useTokenComparator(invertSearchOrder)

    const filteredTokens: Token[] = useMemo(() => {
        return filterTokens(Object.values(allTokens), debouncedQuery)
    }, [allTokens, debouncedQuery])

    const sortedTokens: Token[] = useMemo(() => {
        return filteredTokens.sort(tokenComparator)
    }, [filteredTokens, tokenComparator])

    const filteredSortedTokens = useSortedTokensByQuery(sortedTokens, debouncedQuery)

    const handleCurrencySelect = useCallback(
        (currency: Currency) => {
            onCurrencySelect(currency)
            onDismiss()
        },
        [onDismiss, onCurrencySelect]
    )

    // clear the input on open
    useEffect(() => {
        if (isOpen) setSearchQuery('')
    }, [isOpen])

    // manage focus on modal show
    const inputRef = useRef<HTMLInputElement>()
    const handleInput = useCallback(event => {
        const input = event.target.value
        const checksummedInput = isAddress(input)
        setSearchQuery(checksummedInput || input)
        fixedList.current?.scrollTo(0)
    }, [])

    const handleEnter = useCallback(
        (e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
                const s = debouncedQuery.toLowerCase().trim()
                if (s === 'eth') {
                    handleCurrencySelect(NATIVE)
                } else if (filteredSortedTokens.length > 0) {
                    if (
                        filteredSortedTokens[0].symbol?.toLowerCase() === debouncedQuery.trim().toLowerCase() ||
                        filteredSortedTokens.length === 1
                    ) {
                        handleCurrencySelect(filteredSortedTokens[0])
                    }
                }
            }
        },
        [filteredSortedTokens, handleCurrencySelect, debouncedQuery]
    )

    // menu ui
    const [open, toggle] = useToggle(false)
    const node = useRef<HTMLDivElement>()
    useOnClickOutside(node, open ? toggle : undefined)

    // if no results on main list, show option to expand into inactive
    const inactiveTokens = useFoundOnInactiveList(debouncedQuery)
    const filteredInactiveTokens: Token[] = useSortedTokensByQuery(inactiveTokens, debouncedQuery)

    console.log({
        inactiveTokens,
        filteredSortedTokens,
        a: searchToken && !searchTokenIsAdded,
        b: filteredSortedTokens?.length > 0 || filteredInactiveTokens?.length > 0
    })

    return (
        <ContentWrapper>
            <ModalHeader onClose={onDismiss} title="Select a token" />
            <div className="mt-3 mb-8">
                <input
                    type="text"
                    id="token-search-input"
                    placeholder={i18n._(t`Search name or paste address`)}
                    autoComplete="off"
                    value={searchQuery}
                    ref={inputRef as RefObject<HTMLInputElement>}
                    onChange={handleInput}
                    onKeyDown={handleEnter}
                    className="w-full bg-transparent border-1 border-dark-700 focus:border-transparent focus:border-gradient-r-blue-pink-dark-900 rounded placeholder-secondary focus:placeholder-primary  font-bold text-caption px-6 py-3.5"
                />
            </div>
            {showCommonBases && (
                <div className="mb-4">
                    <CommonBases
                        chainId={chainId}
                        onSelect={handleCurrencySelect}
                        selectedCurrency={selectedCurrency}
                    />
                </div>
            )}

            {searchToken && !searchTokenIsAdded ? (
                <Column style={{ padding: '20px 0', height: '100%' }}>
                    <ImportRow token={searchToken} showImportView={showImportView} setImportToken={setImportToken} />
                </Column>
            ) : filteredSortedTokens?.length > 0 || filteredInactiveTokens?.length > 0 ? (
                <div className="flex-1 h-full">
                    <AutoSizer disableWidth>
                        {({ height }) => (
                            <CurrencyList
                                height={height}
                                showETH={showETH}
                                currencies={
                                    filteredInactiveTokens
                                        ? filteredSortedTokens.concat(filteredInactiveTokens)
                                        : filteredSortedTokens
                                }
                                breakIndex={
                                    inactiveTokens && filteredSortedTokens ? filteredSortedTokens.length : undefined
                                }
                                onCurrencySelect={handleCurrencySelect}
                                otherCurrency={otherSelectedCurrency}
                                selectedCurrency={selectedCurrency}
                                fixedListRef={fixedList}
                                showImportView={showImportView}
                                setImportToken={setImportToken}
                            />
                        )}
                    </AutoSizer>
                </div>
            ) : (
                <Column style={{ padding: '20px', height: '100%' }}>
                    <div className="mb-8 text-center">{i18n._(t`No results found`)}</div>
                </Column>
            )}
            <div className="mt-3">
                <Row justify="center">
                    <ButtonText onClick={showManageView} className="list-token-manage-button">
                        <RowFixed>
                            <IconWrapper size="16px" marginRight="6px">
                                <Edit />
                            </IconWrapper>
                            <div>{i18n._(t`Manage`)}</div>
                        </RowFixed>
                    </ButtonText>
                </Row>
            </div>
        </ContentWrapper>
    )
}
