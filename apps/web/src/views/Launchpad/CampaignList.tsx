import { Box, Flex, Grid, Heading, PageHeader } from '@pancakeswap/uikit'
import Page from 'components/Layout/Page'
import styled, { useTheme } from 'styled-components'
import CampaignCard from './components/CampaignCard'
import { useCampaigns } from './hooks'
import header from './images/header.png'
import rocket from './images/rocket.png'
import Image from 'next/image'
import { tokens } from '@pancakeswap/ui'

const H1 = styled(Heading)`
  font-size: 32px;
  margin-bottom: 8px;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 64px;
    margin-bottom: 24px;
  }
`
const H2 = styled(Heading)`
  font-size: 16px;
  margin-bottom: 8px;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 24px;
    margin-bottom: 18px;
  }
`

const Filler = styled.div`
  min-height: 175px;
  ${({ theme }) => theme.mediaQueries.sm} {
    min-height: 0px;
  }
`

const Rocket = styled.div`
  display: none;
  ${({ theme }) => theme.mediaQueries.sm} {
    display: block;
    margin-right: 24px;
  }
`
const Rocket2 = styled.div`
  ${({ theme }) => theme.mediaQueries.sm} {
    display: none;
  }
`

const LaunchpadList: React.FC = () => {
  const campaigns = useCampaigns({})
  const { isDark } = useTheme()

  return (
    <Box background={isDark ? 'linear-gradient(135deg, #1d1c21 0%, #141317 100%)' : undefined}>
      <PageHeader
        background={`url(${header.src})`}
        style={{
          backgroundPosition: 'right bottom',
          backgroundColor: '#E66280',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Flex>
          <Rocket>
            <Image src={rocket.src} alt="Rocket" width={96} height={96} />
          </Rocket>
          <Flex flexDirection="column">
            <H1 as="h1" color={tokens.colors.dark.secondary} scale="xxl">
              Launchpad
            </H1>
            <H2 color="#F4EEFF">Be the first investing in new Projects</H2>
            <Filler />
          </Flex>
        </Flex>
      </PageHeader>
      <Page>
        {campaigns.data?.length > 0 && (
          <Grid gridGap="32px" gridTemplateColumns={['1fr', null, null, 'repeat(2, 1fr)', 'repeat(3, 1fr)']}>
            {campaigns.data.length === 1 && <div />}
            {campaigns.data.map((launchpad) => (
              <CampaignCard key={launchpad.id} campaign={launchpad} />
            ))}
          </Grid>
        )}
        <Flex justifyContent="center" width="100%">
          <Rocket2>
            <Image src={rocket.src} alt="Rocket" width={96} height={96} />
          </Rocket2>
        </Flex>
      </Page>
    </Box>
  )
}

export default LaunchpadList
