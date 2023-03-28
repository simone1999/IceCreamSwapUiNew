import { useTranslation } from '@pancakeswap/localization'
import { Tag, TestnetIcon, VerifiedIcon } from '@pancakeswap/uikit'

const KYCTag: React.FC = () => {
  const { t } = useTranslation()
  return (
    <Tag
      variant="secondary"
      style={{ background: 'none' }}
      outline
      startIcon={<VerifiedIcon width="18px" color="secondary" mr="4px" />}
    >
      {t('KYC')}
    </Tag>
  )
}

const OfficialTag: React.FC = () => {
  const { t } = useTranslation()
  return (
    <Tag
      variant="secondary"
      style={{ background: 'none' }}
      outline
      startIcon={<VerifiedIcon width="18px" color="primary" mr="4px" />}
    >
      {t('Official')}
    </Tag>
  )
}

const TestTag: React.FC = () => {
  const { t } = useTranslation()
  return (
    <Tag
      variant="success"
      style={{ background: 'none' }}
      outline
      startIcon={<TestnetIcon width="18px" color="primary" mr="4px" />}
    >
      {t('Test')}
    </Tag>
  )
}

export const LaunchpadTags = {
  Kyc: KYCTag,
  Official: OfficialTag,
  Test: TestTag,
}
