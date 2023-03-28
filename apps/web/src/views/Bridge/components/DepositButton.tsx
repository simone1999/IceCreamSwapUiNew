import { Button, useModal } from '@pancakeswap/uikit'
import { useWeb3React } from '@pancakeswap/wagmi'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useEffect } from 'react'
import { useBridge } from '../BridgeProvider'
import { useDeposit } from '../hooks/useDeposit'
import DepositModal from './DepositModal'

interface DepositButtonProps {
  validateForm: () => Promise<boolean>
  setHasSubmitted: (hasSubmitted: boolean) => void
}

const DepositButton: React.FC<DepositButtonProps> = (props) => {
  const { validateForm, setHasSubmitted } = props
  const { account } = useWeb3React()

  const { bridge: _, ...bridge } = useBridge()
  const { deposit, approve } = useDeposit()

  const [onPresentDepositModal, , isOpen] = useModal(
    <DepositModal bridge={bridge as any} deposit={deposit} approve={approve} />,
    true,
    true,
    'bridgeDepositModal',
  )

  const { setTransactionStatus } = bridge
  useEffect(() => {
    if (!isOpen) {
      setTransactionStatus(null)
    }
  }, [isOpen, setTransactionStatus])

  if (!account) return <ConnectWalletButton />

  return (
    <Button
      onClick={() => {
        validateForm().then((isValid) => {
          if (isValid) {
            setTransactionStatus(null)
            onPresentDepositModal()
          }
        })
        setHasSubmitted(true)
      }}
    >
      Bridge
    </Button>
  )
}

export default DepositButton
