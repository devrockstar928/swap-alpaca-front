import Image from 'next/image'
import React from 'react'

export interface StakeTabProps {
  staking: boolean
  swithToStake: () => void
  switchToUnstake: () => void
}

const StakeTab = ({ staking, swithToStake, switchToUnstake }: StakeTabProps) => {
  return (
    <div className="flex rounded-lg bg-[#13141D] h-[82px]">
      <div className="flex-1 h-full">
        <button className="w-full h-full" onClick={swithToStake}>
          <div className={staking ? 'text-white' : 'text-[#3B4553]'}>Stake SHACK</div>
        </button>
      </div>
      <div className="relative flex-1">
        <button
          onClick={() => {
            staking ? switchToUnstake() : swithToStake()
          }}
        >
          {staking ? (
            <Image src="/images/bar/tab-bg-stake.png" width={'145px'} height={'82px'} alt="stake" />
          ) : (
            <Image src="/images/bar/tab-bg-unstake.png" width={'145px'} height={'82px'} alt="unstake" />
          )}
        </button>
      </div>
      <div className="flex-1 h-full">
        <button className="w-full h-full" onClick={switchToUnstake}>
          <div className={!staking ? 'text-white' : 'text-[#3B4553]'}>Unstake</div>
        </button>
      </div>
    </div>
  )
}

export default StakeTab
