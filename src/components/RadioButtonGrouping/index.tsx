import Image from 'next/image'
import { FC } from 'react'

const RadioButtonGrouping: FC<{ className?: string }> = ({ children }) => {
  return (
    <div
      className="relative flex left-0 right-[39px] h-[100px] justify-center items-center text-center"
      style={{
        background: 'rgba(163, 121, 83, 0.92)',
        border: '3px solid #202230',
        boxSizing: 'border-box',
        boxShadow: 'inset 4px 0px 4px rgba(0, 0, 0, 0.25), inset -6px -5px 4px rgba(0, 0, 0, 0.25)',
        borderRadius: '25px',
      }}
    >
      <div className="absolute flex-none left-[32px] w-[78px] h-[76px] bottom-[8px]">
        <Image src="/images/swap/radio-button.png" alt="button1" layout="fill" />
      </div>
      <div className="absolute flex-none right-[32px] w-[78px] h-[76px] bottom-[8px]">
        <Image src="/images/swap/radio-button.png" alt="button1" layout="fill" />
      </div>
      <div className="absolute flex-1 w-[512px] m-auto h-[76px]">{children}</div>
    </div>
  )
}
export default RadioButtonGrouping
