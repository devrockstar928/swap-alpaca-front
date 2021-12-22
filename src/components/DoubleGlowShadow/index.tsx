import { FC } from 'react'
import { isMobile } from 'react-device-detect'
import { classNames } from '../../functions'

const DoubleGlowShadow: FC<{ className?: string }> = ({ children, className }) => {
  if (isMobile) {
    return <div className="shadow-swap">{children}</div>
  }

  return (
    <div className={classNames(className, 'relative w-full max-w-2xl')}>
      <div className="absolute top-1/4 -left-10 bg-red bottom-4 w-3/5 full z-0 filter blur-[150px]" />
      <div className="absolute bottom-1/4 -right-10 bg-light-red top-4 w-3/5 full z-0  filter blur-[150px]" />
      <div className="relative filter drop-shadow">{children}</div>
    </div>
  )
}

export default DoubleGlowShadow
