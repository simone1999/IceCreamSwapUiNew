import { Button, Card, Flex, Progress, Text } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { CampaignData } from '../hooks'
import { renderDate } from 'utils/renderDate'
import CampaignCardDummyHeader from './CampaignCardDummyHeader'

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

interface LaunchpadCardProps {
  campaign: CampaignData
}

const CampaignCardDummy: React.FC<LaunchpadCardProps> = (props) => {
  const { campaign } = props
  const started = new Date(campaign.startDate * 1000) < new Date()

  return (
    <StyledCard isActive={started}>
      <LaunchpadCardInnerContainer>
        <CampaignCardDummyHeader campaign={campaign} />
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="16px" color="secondary" fontWeight="bold">
            ~{campaign.dummyRate} UCORE per ICE
          </Text>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="16px" fontWeight="bold">
            Progress (0%)
          </Text>
        </Flex>
        <Progress primaryStep={0} />
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="16px">Liquidity Locked</Text>
          <Text fontSize="16px">70%</Text>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="16px">Max Contribution</Text>
          <Text fontSize="16px">{campaign.dummyMaxContrib} ICE</Text>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="16px">Soft Cap</Text>
          <Text fontSize="16px">~{campaign.dummySoftCap} ICE</Text>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="16px">Hard Cap</Text>
          <Text fontSize="16px">~{campaign.dummyHardCap} ICE</Text>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="16px">Whitelist Duration</Text>
          <Text fontSize="16px">2h</Text>
        </Flex>
        <Button disabled>Starting at {renderDate(campaign.startDate * 1000)}</Button>
      </LaunchpadCardInnerContainer>
      {/* <ExpandingWrapper> */}
      {/*   <Link fontSize="16px" color="primary" href={`/launchpad/${campaign.id}`}> */}
      {/*     Details */}
      {/*   </Link> */}
      {/* </ExpandingWrapper> */}
    </StyledCard>
  )
}

export default CampaignCardDummy
