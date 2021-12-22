import { RADIO_ADDRESS } from '@radioshackswap/sdk'
import { tryParseAmount } from '../../functions/parse'
import { useCurrency } from '../../hooks/Tokens'
import { useUSDCValue } from '../../hooks/useUSDCPrice'
import { useActiveWeb3React } from '../../services/web3'

export default function MarketPlace(): JSX.Element | null {
  const { chainId } = useActiveWeb3React()
  const rawAmount = tryParseAmount('1', useCurrency(RADIO_ADDRESS[chainId]))
  const radioTokenUSDCPrice = useUSDCValue(rawAmount)?.toFixed(2)
  return (
    <div className="w-auto flex items-center bg-dark-900 hover:bg-dark-800 p-0.5 whitespace-nowrap text-sm font-bold cursor-pointer select-none pointer-events-auto">
      <div className="px-3 py-2 text-primary text-bold">${radioTokenUSDCPrice}</div>
    </div>
  )
}
