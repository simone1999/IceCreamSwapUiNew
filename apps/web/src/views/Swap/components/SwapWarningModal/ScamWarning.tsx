import { useTranslation } from '@pancakeswap/localization'
import { Text } from '@pancakeswap/uikit'

const RugPullWarning = () => {
  const { t } = useTranslation()

  return (
    <>
      <Text>{t('The selected token is a scam token.')}</Text>
      <Text>{t('Saved you this time, but pay more attention which tokens you manaully import to your token list next time.')}</Text>
    </>
  )
}

export default RugPullWarning
