import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Image from 'next/image'

function AddToMetaMask(): JSX.Element {
  const { i18n } = useLingui()

  return (
    <button className="flex mt-4 items-center justify-center min-h-[48px] min-w-[200px] rounded-lg bg-[#F7F8FA]">
      <div className="mx-3">
        <Image src="/metamask.png" width={20} height={20} alt="metamask" />
      </div>
      <div className="text-center text-[#F5841F]">{i18n._(t`Add to Metamask`)}</div>
    </button>
  )
}

export default AddToMetaMask
