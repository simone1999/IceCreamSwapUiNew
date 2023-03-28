import { Button } from '@pancakeswap/uikit'
import { canRegisterToken } from 'utils/wallet'
import { useAccount } from 'wagmi'

interface Props {
  tokenAddress: string
  tokenSymbol: string
  tokenDecimals: number
  tokenImage?: string
}

const AddToWallet: React.FC<Props> = (props) => {
  const { tokenAddress, tokenSymbol, tokenDecimals, tokenImage } = props

  const { connector, isConnected } = useAccount()
  const isCanRegisterToken = canRegisterToken()

  if (connector && connector.name === 'Binance') return null
  if (!(connector && connector.watchAsset && isConnected)) return null
  if (!isCanRegisterToken) return null

  return (
    <Button
      {...props}
      onClick={() => {
        connector.watchAsset?.({
          address: tokenAddress,
          symbol: tokenSymbol,
          image: tokenImage,
          // @ts-ignore
          decimals: tokenDecimals,
        })
      }}
    >
      Add to Wallet
    </Button>
  )
}

export default AddToWallet
