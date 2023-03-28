import { Button, Flex, Heading, Link, NextLinkFromReactRouter } from '@pancakeswap/uikit'
import { useWeb3React } from '@pancakeswap/wagmi'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useTranslation } from '@pancakeswap/localization'
import Image from 'next/image'
import styled, { keyframes } from 'styled-components'
import hero from '../../../../public/images/home/hero-home.png'
import { SlideSvgDark, SlideSvgLight } from '../Home/components/SlideSvg'
import Countdown from 'react-countdown'
import { SUPPORT_BRIDGE } from 'config/constants/supportChains'
import { ChainId } from '@pancakeswap/sdk'

const flyingAnim = () => keyframes`
  from {
    transform: translate(0,  0px);
  }
  50% {
    transform: translate(-5px, -5px);
  }
  to {
    transform: translate(0, 0px);
  }
`

const BgWrapper = styled.div`
  z-index: -1;
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 0;
  left: 0;
`

const InnerWrapper = styled.div`
  position: absolute;
  width: 100%;
  bottom: -3px;
`

const BunnyWrapper = styled.div`
  width: 100%;
  animation: ${flyingAnim} 3.5s ease-in-out infinite;
  will-change: transform;
  > span {
    overflow: visible !important; // make sure the next-image pre-build blur image not be cropped
  }
`

// 2/8/2023 12:00:00 AM UTC
const coreReleaseDate = new Date('2023-02-09T00:00:00.000Z')

const countdownRenderer = ({ hours, minutes, seconds, completed, days }) => {
  return (
    <Flex flexDirection="column" style={{ fontSize: '6rem' }} alignItems="center">
      {completed ? (
        <span style={{ fontSize: '2.5em' }}>Ready for takeoff 🚀</span>
      ) : (
        <>
          <span style={{ fontSize: '2rem' }}>Time until Release</span>
          <span>
            {hours + days * 24}:{minutes}:{seconds}
          </span>
        </>
      )}
    </Flex>
  )
}

const Hero = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()

  return (
    <>
      <style jsx global>
        {`
          .slide-svg-dark {
            display: none;
          }
          .slide-svg-light {
            display: block;
          }
          [data-theme='dark'] .slide-svg-dark {
            display: block;
          }
          [data-theme='dark'] .slide-svg-light {
            display: none;
          }
        `}
      </style>
      <BgWrapper>
        <InnerWrapper>
          <SlideSvgDark className="slide-svg-dark" width="100%" />
          <SlideSvgLight className="slide-svg-light" width="100%" />
        </InnerWrapper>
      </BgWrapper>
      <Flex
        position="relative"
        flexDirection={['column-reverse', null, null, 'row']}
        alignItems="center"
        justifyContent="center"
        mt={['50px', null, 0]}
        id="homepage-hero"
      >
        <Flex flex="1" flexDirection="column">
          <Heading as="h1" scale="xxl" color="secondary" mb="24px">
            {t('IceCreamSwap goes Core!')}
          </Heading>
          <Heading scale="md" mb="24px" as="p" lineHeight="120%">
            IceCreamSwap will be supporting the{' '}
            <Link display="inline-flex" href="https://coredao.org/">
              Core Chain
            </Link>{' '}
            from the start on. IceCreamSwap offers a seamless trading experience for digital assets on Core with our
            swap. The core chain also will support our bridge, allowing users to easily and quickly transfer between
            different chains - <i>the fastest way to get you startet on Core</i>.
          </Heading>
          <Flex style={{ gap: '8px' }} flexDirection={['column', null, null, 'row']} alignItems="stretch">
            {!account && <ConnectWalletButton />}
            <NextLinkFromReactRouter to="/swap">
              <Button width="100%" variant={!account ? 'secondary' : 'primary'}>
                {t('Trade Now')}
              </Button>
            </NextLinkFromReactRouter>
            {SUPPORT_BRIDGE.includes(ChainId.CORE) && (
              <NextLinkFromReactRouter to="/bridge">
                <Button width="100%" variant={!account ? 'secondary' : 'primary'}>
                  {t('Start Bridging')}
                </Button>
              </NextLinkFromReactRouter>
            )}
          </Flex>
        </Flex>
        <Flex
          height={['292px', null, null, '100%']}
          width={['292px', null, null, '100%']}
          flex={[null, null, null, '1']}
          mb={['24px', null, null, '0']}
          position="relative"
          alignItems="center"
          justifyContent="center"
        >
          <Flex flexDirection="column" alignItems="center">
            <span style={{ fontSize: '2.5em' }}>Ready for takeoff 🚀</span>
            <span style={{ fontSize: '1.5em' }}>First Dex on Core Chain!</span>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}

export default Hero
