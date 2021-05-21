import { AlertTriangle, ArrowUpCircle } from 'react-feather'
import { AutoColumn, ColumnCenter } from '../Column'
import React  from 'react'
import styled  from 'styled-components'

import { ButtonPrimary } from '../ButtonLegacy'
import { ChainId } from '@sushiswap/sdk'
import CloseIcon from '../CloseIcon'
import { CustomLightSpinner } from '../Spinner'
import ExternalLink from '../ExternalLink'
import Modal from '../Modal'
import { RowBetween } from '../Row'
import { Text } from 'rebass'
import { getExplorerLink } from '../../functions/explorer'
import { useActiveWeb3React } from '../../hooks/useActiveWeb3React'
import { XCircle } from 'react-feather'
import { useLingui } from "@lingui/react";
import { t } from '@lingui/macro';

const Wrapper = styled.div`
    width: 100%;
`
const Section = styled(AutoColumn)`
    // padding: 24px;
`

const BottomSection = styled(Section)`
    background-color: ${({ theme }) => theme.bg2};
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
`

const ConfirmedIcon = styled(ColumnCenter)`
    padding: 60px 0;
`

function ConfirmationPendingContent({ onDismiss, pendingText }: { onDismiss: () => void; pendingText: string }) {
    const { i18n } = useLingui();

    return (
        <div className="w-full">
            <div className="grid grid-auto-rows">
                <div className="flex justify-end">
                    <XCircle onClick={onDismiss} />
                </div>
                <ConfirmedIcon>
                    <CustomLightSpinner src="/blue-loader.svg" alt="loader" size={'90px'} />
                </ConfirmedIcon>
                <div className="grid gap-3 flex justify-center">
                    <span className="text-center text-xl font-bold">{i18n._(t`Waiting For Confirmation`)}</span>
                    <span className="text-center text font-bold">{pendingText}</span>
                    <span className="text-center text-secondary text-sm font-bold">{i18n._(t`Confirm this transaction in your wallet`)}</span>
                </div>
            </div>
        </div>
    )
}

function TransactionSubmittedContent({
    onDismiss,
    chainId,
    hash
}: {
    onDismiss: () => void
    hash: string | undefined
    chainId: ChainId
}) {
    const { i18n } = useLingui()

    return (
        <Wrapper>
            <Section>
                <RowBetween>
                    <div />
                    <CloseIcon onClick={onDismiss} />
                </RowBetween>
                <ConfirmedIcon>
                    <ArrowUpCircle strokeWidth={0.5} size={90} className="text-blue" />
                </ConfirmedIcon>
                <AutoColumn gap="12px" justify={'center'}>
                    <Text className="text-lg font-medium">{i18n._(t`Transaction Submitted`)}</Text>
                    {chainId && hash && (
                        <ExternalLink href={getExplorerLink(chainId, hash, 'transaction')}>
                            <Text fontWeight={500} fontSize={14} className="text-blue">
                                {i18n._(t`View on explorer`)}
                            </Text>
                        </ExternalLink>
                    )}
                    <ButtonPrimary onClick={onDismiss} style={{ margin: '20px 0 0 0' }}>
                        <Text className="text-lg font-medium">{i18n._(t`Close`)}</Text>
                    </ButtonPrimary>
                </AutoColumn>
            </Section>
        </Wrapper>
    )
}

export function ConfirmationModalContent({
    title,
    bottomContent,
    onDismiss,
    topContent
}: {
    title: string
    onDismiss: () => void
    topContent: () => React.ReactNode
    bottomContent: () => React.ReactNode
}) {
    return (
        <div className="w-full">
            <div className="flex justify-between mb-3">
                <div className="text-xl font-bold text-high-emphesis">{title}</div>
                <XCircle size={18} onClick={onDismiss} />
            </div>
            {topContent()}
            {bottomContent()}
        </div>
    )
}

export function TransactionErrorContent({ message, onDismiss }: { message: string; onDismiss: () => void }) {
    const { i18n } = useLingui();
    return (
        <Wrapper>
            <Section>
                <RowBetween>
                    <Text className="text-lg font-medium">{i18n._(t`Error`)}</Text>
                    <CloseIcon onClick={onDismiss} />
                </RowBetween>
                <AutoColumn style={{ marginTop: 20, padding: '2rem 0' }} gap="24px" justify="center">
                    <AlertTriangle className="text-red" style={{ strokeWidth: 1.5 }} size={64} />
                    <Text
                        fontWeight={500}
                        fontSize={16}
                        className="text-red"
                        style={{ textAlign: 'center', width: '85%' }}
                    >
                        {message}
                    </Text>
                </AutoColumn>
            </Section>
            <BottomSection gap="12px">
                <ButtonPrimary onClick={onDismiss}>{i18n._(t`Dismiss`)}</ButtonPrimary>
            </BottomSection>
        </Wrapper>
    )
}

interface ConfirmationModalProps {
    isOpen: boolean
    onDismiss: () => void
    hash: string | undefined
    content: () => React.ReactNode
    attemptingTxn: boolean
    pendingText: string
}

export default function TransactionConfirmationModal({
    isOpen,
    onDismiss,
    attemptingTxn,
    hash,
    pendingText,
    content
}: ConfirmationModalProps) {
    const { chainId } = useActiveWeb3React()

    if (!chainId) return null

    // confirmation screen
    return (
        <Modal isOpen={isOpen} onDismiss={onDismiss} maxHeight={90}>
            {attemptingTxn ? (
                <ConfirmationPendingContent onDismiss={onDismiss} pendingText={pendingText} />
            ) : hash ? (
                <TransactionSubmittedContent chainId={chainId} hash={hash} onDismiss={onDismiss} />
            ) : (
                content()
            )}
        </Modal>
    )
}
