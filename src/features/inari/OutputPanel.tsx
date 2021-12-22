import React, { FC } from 'react'
import Typography from '../../components/Typography'
import CurrencyInputPanel from '../legacy/limit-order/CurrencyInputPanel'

interface OutputPanelProps {
  label: string
}

const OutputPanel: FC<OutputPanelProps> = ({ label }) => {
  return (
    <CurrencyInputPanel
      id="token-output"
      className=" p-0 px-5 border-2 border-dark-800 flex items-center"
      selectComponent={
        <Typography variant="lg" className="text-primary" weight={700}>
          {label}
        </Typography>
      }
      inputComponent={<div className="bg-dark-900 r sm:w-3/5 h-16" />}
    />
  )
}

export default OutputPanel
