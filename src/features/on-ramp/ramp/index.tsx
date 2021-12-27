import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { ChainId } from '@radioshackswap/sdk'
import { RampInstantSDK } from '@ramp-network/ramp-instant-sdk'
import { useCallback } from 'react'
import { useActiveWeb3React } from '../../../services/web3'

const DEFAULT_NETWORK = {
  [ChainId.MAINNET]: 'ethereum',
  [ChainId.BSC]: 'bsc',
  [ChainId.MATIC]: 'matic',
}

const DEFAULT_CRYPTO_CURRENCY = {
  [ChainId.MAINNET]: 'ETH',
  [ChainId.BSC]: 'BNB',
  [ChainId.MATIC]: 'MATIC',
}

export default function Buy() {
  const { account, chainId } = useActiveWeb3React()
  const { i18n } = useLingui()
  const onClick = useCallback(() => {
    if (!(chainId in DEFAULT_NETWORK)) {
      return
    }

    const widget = new RampInstantSDK({
      userAddress: account,
      hostAppName: 'SHACK',
      hostLogoUrl: 'http://sushiswap-interface-canary.vercel.app/_next/image?url=%2Flogo.png&w=32&q=75',
      defaultAsset: DEFAULT_CRYPTO_CURRENCY[chainId],
    })

    widget.show()
  }, [account, chainId])

  return (
    <a
      id={`buy-link`}
      onClick={onClick}
      className="p-2 cursor-pointer text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis md:p-3 whitespace-nowrap"
    >
      {i18n._(t`Buy`)}
    </a>
  )
}
