import { Box, Button, Card, Flex, Link, Progress, Text, useModal, useTooltip } from '@pancakeswap/uikit'
import styled, { useTheme } from 'styled-components'
import { useToken } from 'hooks/Tokens'
import { CampaignData, useCampaign, useCanBuy, useGivenAmount } from '../hooks'
import CampaignCardHeader from './CampaignCardHeader'
import BuyModal from './BuyModal'
import { renderDate } from 'utils/renderDate'
import { useAccount } from 'wagmi'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { formatAmount } from 'views/Bridge/formatter'
import { useState } from 'react'
import { formatDuration, intervalToDuration } from 'date-fns'
import { useTranslation } from '@pancakeswap/localization'
import { formatUnits } from "viem";

const StyledCard = styled(Card)`
  align-self: baseline;
  max-width: 100%;
  margin: 0 0 24px 0;
  ${({ theme }) => theme.mediaQueries.sm} {
    max-width: 350px;
    margin: 0 12px 46px;
  }
`

const LaunchpadCardInnerContainer = styled(Flex)`
  flex-direction: column;
  justify-content: space-around;
  padding: 24px;
  gap: 0.75em;
`

const ExpandingWrapper = styled(Flex)`
  padding: 24px;
  border-top: 2px solid ${({ theme }) => theme.colors.cardBorder};
  overflow: hidden;
  justify-content: center;
`
interface LaunchpadCardProps {
  campaign: CampaignData
}

const roundString = (str: string) => {
  const [whole, decimal] = str.split('.')
  if (!decimal) return whole
  return `${whole}.${decimal.slice(0, 2)}`
}

const CampaignCard: React.FC<LaunchpadCardProps> = (props) => {
  const { t } = useTranslation()
  const { campaign } = props
  const token = useToken(campaign?.tokenAddress)
  const [onPresentBuyModal] = useModal(<BuyModal campaign={campaign} />, true, true, `buyModal-${campaign.id}`)
  const started = new Date(Number(campaign.start_date * 1000n)) < new Date()
  const ended = new Date(Number(campaign.end_date * 1000n)) < new Date()
  const hardCapReached = campaign.hardCapProgress >= 1
  const { address, status } = useAccount()
  const c = useCampaign(campaign.address as `0x${string}`)

  const contributed = useGivenAmount(campaign.address as `0x${string}`, address)
  const canBuy = useCanBuy(campaign.address as `0x${string}`, address)
  const [claiming, setClaiming] = useState(false)

  const theme = useTheme()

  const tooltip = useTooltip(
    <Flex flexDirection="column" gap="0.5em">
      <Flex alignItems="center" gap="0.5em">
        <Box width="1ch" height="1ch" backgroundColor={theme.colors.secondary} /> {t('Soft Cap')}:{' '}
        {roundString(String(campaign.progress * 100))}%
      </Flex>
      <Flex alignItems="center" gap="0.5em">
        <Box width="1ch" height="1ch" backgroundColor={theme.colors.success} /> {t('Hard Cap')}:{' '}
        {roundString(String(campaign.hardCapProgress * 100))}%
      </Flex>
    </Flex>,
    { placement: 'bottom', trigger: 'hover' },
  )
  if (ended && (!address || (contributed.data && !(contributed.data > 0))) && campaign.deleted) {
    return null
  }

  return (
    <StyledCard isActive={started && !ended}>
      <LaunchpadCardInnerContainer>
        <CampaignCardHeader campaign={campaign} />
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="16px" color="secondary" fontWeight="bold">
            {formatAmount(formatUnits(campaign.rate, token?.decimals))} {token?.symbol} {t('per ICE')}
          </Text>
        </Flex>
        <Flex ref={tooltip.targetRef} flexDirection="column" gap="0.5em">
          {tooltip.tooltipVisible && tooltip.tooltip}
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontSize="16px" fontWeight="bold">
              {t('Progress')} ({roundString(`${campaign.hardCapProgress * 100}`)}%) {t('of hard cap')}
            </Text>
          </Flex>
          <Progress primaryStep={campaign.progress * 100} secondaryStep={campaign.hardCapProgress * 100} />
        </Flex>
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="16px">{t('Listing price increase')}</Text>
          <Text fontSize="16px">50%</Text>
        </Flex>
        {/*
        {campaign.liquidity_rate.toNumber() > 0 ? (
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontSize="16px">Liquidity</Text>
            <Text fontSize="16px">{campaign.liquidity_rate.toNumber() / 100}%</Text>
          </Flex>
        ) : undefined}
        {campaign.lock_duration.toNumber() > 0 ? (
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontSize="16px">Liquidity Locked</Text>
            <Text fontSize="16px">{campaign.lock_duration.toNumber() / 60 / 60 / 24} Days</Text>
          </Flex>
        ) : undefined}
        */}
        {contributed.data && (
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontSize="16px">{t('Contributed')}</Text>
            <Text fontSize="16px">{formatAmount(formatUnits(contributed.data, 18))} ICE</Text>
          </Flex>
        )}
        {started && !ended && (
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontSize="16px">{t('Ending at')}</Text>
            <Text fontSize="16px">{renderDate(Number(campaign.end_date * 1000n))}</Text>
          </Flex>
        )}
        {started ? (
          campaign.isLive && campaign.progress !== 1 ? (
            status === 'connected' ? (
              canBuy?.data ? (
                <Button onClick={onPresentBuyModal}>{t('Contribute')}</Button>
              ) : (
                <Button disabled>
                  {t('Public sale starting in')}{' '}
                  {formatDuration(
                    intervalToDuration({
                      start: new Date(),
                      end: new Date(Number(campaign.start_date * 1000n + 7200000n)),
                    }),
                  )}
                </Button>
              )
            ) : (
              <ConnectWalletButton />
            )
          ) : contributed.data > 0 && !campaign.isLive ? (
            campaign.collected > campaign.softCap ? (
              <Button
                disabled={claiming}
                onClick={() => {
                  setClaiming(true)
                  c.write.withdrawTokens({}).catch(() => {
                    setClaiming(false)
                  })
                }}
              >
                {t('Claim')}
              </Button>
            ) : (
              <Button
                disabled={claiming}
                onClick={() => {
                  setClaiming(true)
                  c.write.withdrawFunds({}).catch(() => {
                    setClaiming(false)
                  })
                }}
              >
                {t('Refund')}
              </Button>
            )
          ) : hardCapReached ? (
            <Button disabled>{t('Hard Cap Reached')}</Button>
          ) : (
            <Button disabled>{t('Ended')}</Button>
          )
        ) : (
          <Button disabled>
            {t('Starting in')}{' '}
            {formatDuration(
              intervalToDuration({
                start: new Date(),
                end: new Date(Number(campaign.start_date * 1000n)),
              }),
            )}
          </Button>
        )}
      </LaunchpadCardInnerContainer>
      <ExpandingWrapper>
        <Link fontSize="16px" color="primary" href={`/launchpad/${campaign.id}`}>
          {t('Details')}
        </Link>
      </ExpandingWrapper>
    </StyledCard>
  )
}

export default CampaignCard
