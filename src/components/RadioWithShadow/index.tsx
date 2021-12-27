import Image from 'next/image'
import { FC } from 'react'
import { isMobile } from 'react-device-detect'
import { classNames } from '../../functions'

const RadioWithShadow: FC<{ className?: string }> = ({ children, className }) => {
  if (isMobile) {
    return <div className="shadow-swap">{children}</div>
  }

  return (
    <div className={classNames(className, 'relative w-full h-auto block max-w-2xl')}>
      <div
        className="absolute top-10 -left-20 -right-20 bg-brown rounded-[80px] -bottom-4 w-[837px] h-auto inline-block z-0"
        style={{ boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.5), 0px 20px 50px rgba(0, 0, 0, 0.2)' }}
      >
        <div
          style={{
            position: 'relative',
            left: '59px',
            top: '-19px',
            height: '20px',
            width: '720px',
          }}
        >
          <Image src="/images/swap/radio-top.png" alt="top" layout="fill" />
        </div>
        <div
          className="absolute left-[29px] right-[28px] -top-1 h-[56px] rounded-[55px]"
          style={{
            filter: 'blur(5px)',
          }}
        >
          <Image src="/images/swap/highlight.png" alt="top" layout="fill" />
        </div>

        <div className="absolute left-[85px] w-[51px] bottom-[-7px] h-[9px]">
          <Image src="/images/swap/radio-foot.png" alt="bottom" layout="fill" />
        </div>

        <div className="absolute left-[685px] w-[51px] bottom-[-7px] h-[12px]">
          <Image src="/images/swap/radio-foot-right.png" alt="bottom" layout="fill" />
        </div>

        <div className="absolute left-[27px] right-[27px] top-[30px] bottom-[28px] bg-[#2F2528] rounded-[55px]">
          <div
            className="absolute left-[14px] w-[21px] top-[73px] h-[400px]"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.12)', filter: 'blur(18px)' }}
          />
          <div
            className="absolute right-[14px] w-[21px] top-[73px] h-[389px]"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.16)',
              filter: 'blur(18px)',
              border: '1px solid rgba(0, 0, 0, 0.22)',
            }}
          />
          <div className="absolute left-[14px] w-[32.5px] bottom-[12.5px] h-[31px]" style={{ filter: 'blur(4px)' }}>
            <Image src="/images/swap/radio-corner.png" alt="left" layout="fill" />
          </div>
          <div
            className="absolute left-[47px] right-[45px] bottom-[21px] h-[15px]"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.29)', filter: 'blur(18px)' }}
          ></div>
          <div className="absolute left-[38px] right-[39px] top-[34px] bottom-[36px]">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default RadioWithShadow
