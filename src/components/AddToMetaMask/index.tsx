import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Currency } from '@radioshackswap/sdk'
import Image from 'next/image'
import React, { FC } from 'react'
import { useActiveWeb3React } from '../../services/web3'

interface AddToMetaMaskProps {
  currency?: Currency
}

const AddToMetaMask: FC<AddToMetaMaskProps> = ({ currency }) => {
  const { i18n } = useLingui()
  const { library } = useActiveWeb3React()

  const openMetamaskModel = () => {
    if (currency && currency.wrapped.address && library && library.provider.isMetaMask && library.provider.request) {
      const params: any = {
        type: 'ERC20',
        options: {
          address: currency.wrapped.address,
          symbol: currency.symbol,
          decimals: currency.decimals,
          // image: currency.wrapped.image,
        },
      }
      library.provider
        .request({
          method: 'wallet_watchAsset',
          params,
        })
        .then((success) => {
          if (success) {
            console.log(`Successfully added ${currency.symbol} to MetaMask`)
          } else {
            throw new Error('Something went wrong.')
          }
        })
        .catch(console.error)
    }
  }

  return (
    <button
      className="flex mt-4 items-center justify-center min-h-[48px] min-w-[200px] rounded-lg bg-[#F7F8FA]"
      onClick={() => openMetamaskModel()}
    >
      <div className="mx-3">
        <Image src="/metamask.png" width={20} height={20} alt="metamask" />
      </div>
      <div className="text-center text-[#F5841F]">{i18n._(t`Add to Metamask`)}</div>
    </button>
  )
}

export default AddToMetaMask
