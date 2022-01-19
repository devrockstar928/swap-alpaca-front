import React from 'react'
import Input from '../Input'

interface PercentInputPanelProps {
  value: string
  onUserInput: (value: string) => void
  id: string
}

export default function PercentInputPanel({ value, onUserInput, id }: PercentInputPanelProps) {
  return (
    <div id={id} className="px-2 py-4 bg-[#F7F8FA] rounded-2xl">
      <div className="flex flex-col justify-between space-y-3 sm:space-y-0 sm:flex-row">
        <div className="w-full h-[40px] text-center flex justify-center items-center text-base text-black bg-white rounded-xl sm:w-2/5">
          Amount to Remove
        </div>
        <div className="flex items-center w-full p-1 ml-3 space-x-3 text-xl font-bold bg-white rounded-xl sm:w-3/5">
          <Input.Numeric
            className="bg-transparent token-amount-input"
            value={value}
            onUserInput={(val) => {
              onUserInput(val)
            }}
            align="right"
          />
          <div className="pl-2 text-xl font-bold">%</div>
        </div>
      </div>
    </div>
  )
}
