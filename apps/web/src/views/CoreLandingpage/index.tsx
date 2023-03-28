import { TranslateFunction, useTranslation } from '@pancakeswap/localization'
import { PageMeta } from 'components/Layout/Page'
import PageSection from 'components/PageSection'
import styled from 'styled-components'
import useTheme from 'hooks/useTheme'
import Hero from 'views/Home/components/Hero'
import SalesSection from 'views/Home/components/SalesSection'
import { InnerWedgeWrapper, OuterWedgeWrapper, WedgeTopLeft } from 'views/Home/components/WedgeSvgs'
import Countdown from './Countdown'
import rocket from './rocket.png'

const StyledHeroSection = styled(PageSection)`
  padding-top: 16px;

  ${({ theme }) => theme.mediaQueries.md} {
    padding-top: 48px;
  }
`

const HomeSectionContainerStyles = { margin: '0', width: '100%', maxWidth: '968px' }

export const swapSectionData = (t: TranslateFunction): any => ({
  headingText: t('HUGE CORE APY!'),
  bodyText: (
    <>
      IceCreamSwap will provide <i>huge farm rewards</i> for CORE/USDT and ICE/USDT liqudity provider
    </>
  ),
  reverse: false,
  primaryButton: {
    to: '/add?chainId=1116',
    text: t('Earn Now'),
    external: false,
  },
  secondaryButton: {
    to: 'https://wiki.icecreamswap.com/dex/liquidity',
    text: t('Learn'),
    external: true,
  },
  images: {
    attributes: [{ src: rocket, alt: '' }],
  },
})

const CoreLandingpage = () => {
  const { theme } = useTheme()
  const { t } = useTranslation()
  return (
    <>
      <PageMeta />
      <style jsx global>{`
        #home-1 .page-bg {
          background: linear-gradient(139.73deg, #e6fdff 0%, #f3efff 100%);
        }
        [data-theme='dark'] #home-1 .page-bg {
          background: radial-gradient(103.12% 50% at 50% 50%, #21193a 0%, #191326 100%);
        }
        #home-2 .page-bg {
          background: linear-gradient(180deg, #ffffff 22%, #d7caec 100%);
        }
        [data-theme='dark'] #home-2 .page-bg {
          background: linear-gradient(180deg, #09070c 22%, #201335 100%);
        }
        #home-3 .page-bg {
          background: linear-gradient(180deg, #6fb6f1 0%, #eaf2f6 100%);
        }
        [data-theme='dark'] #home-3 .page-bg {
          background: linear-gradient(180deg, #0b4576 0%, #091115 100%);
        }
        #home-4 .inner-wedge svg {
          fill: #d8cbed;
        }
        [data-theme='dark'] #home-4 .inner-wedge svg {
          fill: #201335;
        }
      `}</style>
      <StyledHeroSection
        innerProps={{ style: { margin: '0', width: '100%' } }}
        containerProps={{
          id: 'home-1',
        }}
        index={2}
        hasCurvedDivider={false}
      >
        <Countdown />
      </StyledHeroSection>
      <PageSection
        innerProps={{ style: HomeSectionContainerStyles }}
        background={theme.colors.background}
        containerProps={{
          id: 'home-2',
        }}
        index={2}
        hasCurvedDivider={false}
      >
        <OuterWedgeWrapper>
          <InnerWedgeWrapper top>
            <WedgeTopLeft />
          </InnerWedgeWrapper>
        </OuterWedgeWrapper>
        <SalesSection {...swapSectionData(t)} />
      </PageSection>
    </>
  )
}

export default CoreLandingpage
