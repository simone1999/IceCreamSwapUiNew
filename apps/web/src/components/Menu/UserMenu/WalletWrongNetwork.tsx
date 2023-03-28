import styled from 'styled-components'
import { useTranslation } from '@pancakeswap/localization'
import { Button, Text, Link, HelpIcon, Message, MessageText } from '@pancakeswap/uikit'
import { ChainId } from '@pancakeswap/sdk'
import { useSwitchNetwork } from 'hooks/useSwitchNetwork'

const StyledLink = styled(Link)`
  width: 100%;
  &:hover {
    text-decoration: initial;
  }
`

interface WalletWrongNetworkProps {
  onDismiss: () => void
}

const WalletWrongNetwork: React.FC<React.PropsWithChildren<WalletWrongNetworkProps>> = ({ onDismiss }) => {
  const { t } = useTranslation()
  const { switchNetworkAsync, canSwitch } = useSwitchNetwork()

  const handleSwitchNetwork = async (): Promise<void> => {
    await switchNetworkAsync(ChainId.BITGERT)
    onDismiss?.()
  }

  return (
    <>
      <Text mb="24px">{t('You’re connected to the wrong network.')}</Text>
      {canSwitch ? (
        <Button onClick={handleSwitchNetwork} mb="24px">
          {t('Switch Network')}
        </Button>
      ) : (
        <Message variant="danger">
          <MessageText>{t('Unable to switch network. Please try it on your wallet')}</MessageText>
        </Message>
      )}
    </>
  )
}

export default WalletWrongNetwork
