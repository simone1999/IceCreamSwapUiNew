import { useGasPrice } from 'state/user/hooks'
import makeHandleDeposit from '../contracts/makeHandleDeposit'
import { useBridge } from '../BridgeProvider'
import { useSigner } from 'wagmi'
import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@pancakeswap/wagmi'

export const useDeposit = (bridgeFee?: number, bridgeFeeToken?: string) => {
  const gasPrice = useGasPrice()
  const { account } = useWeb3React()
  const { setTransactionStatus, setDepositNonce, setHomeTransferTxHash, homeChainConfig, bridge } = useBridge()
  const signer = useSigner()

  return makeHandleDeposit(
    setTransactionStatus,
    setDepositNonce,
    setHomeTransferTxHash,
    parseFloat(gasPrice?.toString() || '0'),
    homeChainConfig,
    bridge,
    signer?.data?.provider as Web3Provider,
    account,
    bridgeFee,
    bridgeFeeToken,
  )
}
