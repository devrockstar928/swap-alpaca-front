import React, { useEffect, useState } from 'react'

import ExternalLink from './../ExternalLink'
import { getExplorerLink } from '../../functions/explorer'
import { useActiveWeb3React } from '../../services/web3'
import { useBlockNumber } from '../../state/application/hooks'

export default function Polling() {
  const { chainId } = useActiveWeb3React()

  const blockNumber = useBlockNumber()

  const [isMounted, setIsMounted] = useState(true)

  useEffect(
    () => {
      const timer1 = setTimeout(() => setIsMounted(true), 1000)

      // this will clear Timeout when component unmount like in willComponentUnmount
      return () => {
        setIsMounted(false)
        clearTimeout(timer1)
      }
    },
    [blockNumber] // useEffect will run only one time
    // if you pass a value to array, like this [data] than clearTimeout will run every time this value changes (useEffect re-run)
  )

  return (
    <ExternalLink
      href={chainId && blockNumber ? getExplorerLink(chainId, blockNumber.toString(), 'block') : ''}
      className={`${!isMounted ? 'text-high-emphesis' : 'text-low-emphesis'}`}
    >
      <div className={`flex items-center space-x-2`}>
        <div>{blockNumber}</div>
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${!isMounted ? 'animate-pulse' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    </ExternalLink>
  )
}
