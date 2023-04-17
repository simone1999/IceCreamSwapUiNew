import { Box, Button, Card, Flex, Link, Progress, Text, useModal, useTooltip } from '@pancakeswap/uikit'
import styled, { useTheme } from 'styled-components'
import { useToken } from 'hooks/Tokens'
import { CampaignData, useCampaign, useCanBuy, useFlags, useGivenAmount } from '../hooks'
import CampaignCardHeader from './CampaignCardHeader'
import BuyModal from './BuyModal'
import { renderDate } from 'utils/renderDate'
import { useAccount } from 'wagmi'
import { utils } from 'ethers'
import ConnectWalletButton from 'components/ConnectWalletButton'
import useNativeCurrency from 'hooks/useNativeCurrency'
import { formatAmount } from 'views/Bridge/formatter'
import { useState } from 'react'
import { formatDuration, intervalToDuration } from 'date-fns'

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
  const { campaign } = props
  const token = useToken(campaign?.tokenAddress)
  const native = useNativeCurrency()
  const [onPresentBuyModal] = useModal(<BuyModal campaign={campaign} />, true, true, `buyModal-${campaign.id}`)
  const started = new Date(campaign.start_date.toNumber() * 1000) < new Date()
  const ended = new Date(campaign.end_date.toNumber() * 1000) < new Date()
  const hardCapReached = campaign.hardCapProgress >= 1
  const { address, status } = useAccount()
  const c = useCampaign(campaign.address)

  const contributed = useGivenAmount(campaign.address, address)
  const canBuy = useCanBuy(campaign.address, address)
  const [claiming, setClaiming] = useState(false)

  const theme = useTheme()

  const tooltip = useTooltip(
    <Flex flexDirection="column" gap="0.5em">
      <Flex alignItems="center" gap="0.5em">
        <Box width="1ch" height="1ch" backgroundColor={theme.colors.secondary} /> Soft Cap:{' '}
        {roundString(String(campaign.progress * 100))}%
      </Flex>
      <Flex alignItems="center" gap="0.5em">
        <Box width="1ch" height="1ch" backgroundColor={theme.colors.success} /> Hard Cap:{' '}
        {roundString(String(campaign.hardCapProgress * 100))}%
      </Flex>
    </Flex>,
    { placement: 'bottom', trigger: 'hover' },
  )
  if (ended && (!address || (contributed.data && !contributed.data.gt(0))) && campaign.deleted) {
    return null
  }

  return (
    <StyledCard isActive={started && !ended}>
      <LaunchpadCardInnerContainer>
        <CampaignCardHeader campaign={campaign} />
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="16px" color="secondary" fontWeight="bold">
            {formatAmount(utils.formatUnits(campaign.rate, token?.decimals))} {token?.symbol} per ICE
          </Text>
        </Flex>
        <Flex ref={tooltip.targetRef} flexDirection="column" gap="0.5em">
          {tooltip.tooltipVisible && tooltip.tooltip}
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontSize="16px" fontWeight="bold">
              Progress ({roundString(`${campaign.hardCapProgress * 100}`)}%) of hard cap
            </Text>
          </Flex>
        </Flex>
        <Progress primaryStep={campaign.progress * 100} secondaryStep={campaign.hardCapProgress * 100} />
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="16px">Listing price increase</Text>
          <Text fontSize="16px">50%</Text>
        </Flex>
        {
          /*
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
            <Text fontSize="16px">Contributed</Text>
            <Text fontSize="16px">{formatAmount(utils.formatUnits(contributed.data, 18))} ICE</Text>
          </Flex>
        )}
        {started && !ended && (
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontSize="16px">Ending at</Text>
            <Text fontSize="16px">{renderDate(campaign.end_date.mul(1000).toNumber())}</Text>
          </Flex>
        )}
        {started ? (
          campaign.isLive ? (
            status === 'connected' ? (
              canBuy?.data ? (
                <Button onClick={onPresentBuyModal}>Contribute</Button>
              ) : (
                <Button disabled>
                  Public sale starting in{' '}
                  {formatDuration(
                    intervalToDuration({
                      start: new Date(),
                      end: new Date(campaign.start_date.mul(1000).toNumber() + 7200000),
                    }),
                  )}
                </Button>
              )
            ) : (
              <ConnectWalletButton />
            )
          ) : contributed.data?.gt(0) ? (
            campaign.collected.gt(campaign.softCap) ? (
              <Button
                disabled={claiming}
                onClick={() => {
                  setClaiming(true)
                  c.withdrawTokens().catch(() => {
                    setClaiming(false)
                  })
                }}
              >
                Claim
              </Button>
            ) : (
              <Button
                disabled={claiming}
                onClick={() => {
                  setClaiming(true)
                  c.withdrawFunds().catch(() => {
                    setClaiming(false)
                  })
                }}
              >
                Refund
              </Button>
            )
          ) : hardCapReached ? (
            <Button disabled>Hard Cap Reached</Button>
          ) : (
            <Button disabled>Ended</Button>
          )
        ) : (
          <Button disabled>
            Starting in{' '}
            {formatDuration(
              intervalToDuration({
                start: new Date(),
                end: new Date(campaign.start_date.mul(1000).toNumber()),
              }),
            )}
          </Button>
        )}
      </LaunchpadCardInnerContainer>
      <ExpandingWrapper>
        <Link fontSize="16px" color="primary" href={`/launchpad/${campaign.id}`}>
          Details
        </Link>
      </ExpandingWrapper>
    </StyledCard>
  )
}

export default CampaignCard
