import Image from 'next/image'
import { FC } from 'react'
import { isMobile } from 'react-device-detect'
import { classNames } from '../../functions'

const RadioWithShadow: FC<{ className?: string }> = ({ children, className }) => {
  if (isMobile) {
    return <div className="shadow-swap">{children}</div>
  }

  return (
    <div className={classNames(className, 'relative h-auto block')}>
      <div className="absolute w-full max-w-3xl min-h-[38rem] radio-left-shadow"></div>
      <div className="absolute radio-left-bottom-shadow"></div>
      <div className="absolute radio-right-bottom-shadow"></div>
      <div className="absolute radio-right-rotate-shadow"></div>
      <div className="relative inline-block bg-brown top-8 rounded-[80px] p-[28px] shadow-lg z-50">
        <div className="absolute top-[-19px] left-[59px] right-[59px] h-[20px]">
          <Image src="/images/swap/radio-top.png" alt="top" layout="fill" />
        </div>
        <div className="absolute left-[18px] right-[18px] top-1 h-[56px] rounded-[55px] blur-sm">
          <Image src="/images/swap/highlight.png" alt="top" layout="fill" />
        </div>

        <div className="absolute left-[85px] w-[51px] bottom-[-7px] h-[9px]">
          <Image src="/images/swap/radio-foot.png" alt="bottom" layout="fill" />
        </div>

        <div className="absolute right-[85px] w-[51px] bottom-[-7px] h-[12px]">
          <Image src="/images/swap/radio-foot-right.png" alt="bottom" layout="fill" />
        </div>

        <div className="relative inline-block p-[36px] bg-[#2F2528] rounded-[55px]">
          <div className="absolute left-[14px] w-[21px] top-[73px] bottom-[36px] blur-lg bg-white bg-opacity-[0.12]" />
          <div className="absolute right-[14px] w-[21px] top-[73px] bottom-[36px] blur-lg bg-white bg-opacity-[0.16]" />
          <div className="absolute left-[14px] w-[32.5px] bottom-[12.5px] h-[31px]" style={{ filter: 'blur(4px)' }}>
            <Image src="/images/swap/radio-corner.png" alt="left" layout="fill" />
          </div>
          <div className="absolute left-[47px] right-[45px] bottom-[21px] h-[15px] blur-lg bg-white bg-opacity-[0.29]"></div>
          <div className="relative inline-block w-auto">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default RadioWithShadow
