import { RADIO_ADDRESS } from '@radioshackswap/sdk'
import { useUSDCValue } from '../../hooks/useUSDCPrice'
import { useActiveWeb3React } from '../../services/web3'
import { tryParseAmount } from '../../functions/parse'
import { useCurrency } from '../../hooks/Tokens'

export default function MarketPlace(): JSX.Element | null {
  const { chainId } = useActiveWeb3React()
  const RADIO_ADD = RADIO_ADDRESS[chainId]
  const rawAmount = tryParseAmount('1', useCurrency(RADIO_ADD))
  const ratioValue = useUSDCValue(rawAmount)?.toSignificant(4, { groupSeparator: ',' })
  return (
    <div className="w-auto flex items-center rounded bg-dark-900 hover:bg-dark-800 p-0.5 whitespace-nowrap text-sm font-bold cursor-pointer select-none pointer-events-auto">
      <div className="px-3 py-2 text-primary text-bold">${ratioValue}</div>
    </div>
  )
}
