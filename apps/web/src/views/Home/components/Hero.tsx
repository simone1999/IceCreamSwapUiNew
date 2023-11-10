import { Button, Flex, Heading, Link, NextLinkFromReactRouter } from '@pancakeswap/uikit'
import { useAccount } from 'wagmi'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useTranslation } from '@pancakeswap/localization'
import Image from 'next/image'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { styled, keyframes } from 'styled-components'
import hero from '../../../../public/images/home/hero-home.png'
import CompositeImage, { CompositeImageProps } from './CompositeImage'
import { SlideSvgDark, SlideSvgLight } from './SlideSvg'
import starL from '../../../../public/images/home/lunar-bunny/star-l.png'
import starR from '../../../../public/images/home/lunar-bunny/star-r.png'
import starTopR from '../../../../public/images/home/lunar-bunny/star-top-r.png'

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

const fading = () => keyframes`
  from {
    opacity: 0.9;
  }
  50% {
    opacity: 0.1;
  }
  to {
    opacity: 0.9;
  }
`

const BgWrapper = styled.div`
  z-index: -1;
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 0px;
  left: 0px;
`

const InnerWrapper = styled.div`
  position: absolute;
  width: 100%;
  bottom: -3px;
`

const BunnyWrapper = styled.div`
  width: 100%;
  animation: ${flyingAnim} 3.5s ease-in-out infinite;
  position: relative;
  will-change: transform;
  > span {
    overflow: visible !important; // make sure the next-image pre-build blur image not be cropped
  }
`

const StarsWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  & :nth-child(2) {
    animation: ${fading} 2s ease-in-out infinite;
    animation-delay: 1s;
  }

  & :nth-child(3) {
    animation: ${fading} 5s ease-in-out infinite;
    animation-delay: 0.66s;
  }

  & :nth-child(4) {
    animation: ${fading} 2.5s ease-in-out infinite;
    animation-delay: 0.33s;
  }
`

const starsImage: CompositeImageProps = {
  path: '/images/home/lunar-bunny/',
  attributes: [
    { src: starL, alt: '3D Star' },
    { src: starR, alt: '3D Star' },
    { src: starTopR, alt: '3D Star' },
  ],
}

const Hero = () => {
  const { t } = useTranslation()
  const { address: account } = useAccount()
  const { chainId } = useActiveChainId()

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
            {t('IceCream brings people together')}
          </Heading>
          <Heading as="p" scale="md" mb="24px">
            {/* todo: make links display somewhat like the text, maybe a small underline or so. */}
            <Link href="https://icecreamswap.com/swap" display="inline-flex">DEX</Link>{", "}
            <Link href="https://icecreamswap.com/swap" display="inline-flex">{t('DEX Aggregator')}</Link>{", "}
            <Link href="https://chainlist.org" display="inline-flex">RPC</Link>{", "}
            {t('Block Explorer')}{", "}
            <Link href="https://icecreamswap.com/kyc" display="inline-flex">KYC</Link>{", "}
            <Link href="https://icecreamswap.com/launchpad" display="inline-flex">{t('Launchpad')}</Link>{t(' and ')}
            <Link href="https://icecreamswap.com/bridge" display="inline-flex">{t('Bridge')}</Link>{t(' on ')}
            <Link href="https://base.org/" display="inline-flex">Base</Link>{", "}
            <Link href="https://coredao.org/" display="inline-flex">Core DAO</Link>{", "}
            <Link href="https://www.telos.net/" display="inline-flex">Telos</Link>{", "}
            <Link href="https://bitgert.com/" display="inline-flex">Bitgert</Link>{", "}
            <Link href="https://xinfin.org/" display="inline-flex">XDC</Link>{", "}
            <Link href="https://shardeum.org/" display="inline-flex">Shardeum</Link>{", "}
            <Link href="https://shimmer.network/" display="inline-flex">Shimmer</Link>{", "}
            <Link href="https://www.bnbchain.org/en/smartChain" display="inline-flex">BSC</Link>{", "}
            <Link href="https://www.xo-dex.com/" display="inline-flex">Xodex</Link>{", "}
            <Link href="https://dogechain.dog/" display="inline-flex">Dogechain</Link>{t(' and ')}
            <Link href="https://www.fuse.io/" display="inline-flex">Fuse</Link>.
          </Heading>
          <Flex>
            {!account && <ConnectWalletButton mr="8px" />}
            <NextLinkFromReactRouter to="/swap">
              <Button variant={!account ? 'secondary' : 'primary'}>{t('Trade Now')}</Button>
            </NextLinkFromReactRouter>
          </Flex>
        </Flex>
        <Flex
          minHeight={['292px', null, null, '100%']}
          width={['auto', null, null, '100%']}
          flex={[null, null, null, '1']}
          mb={['12px', null, null, '0']}
          position="relative"
        >
          <BunnyWrapper>
            <Image
              sizes="(max-width: 768px) 95vw, 580px"
              src={hero}
              priority
              objectFit="fill"
              placeholder="blur"
              alt={t('IceCream Store')}
            />
          </BunnyWrapper>
          <StarsWrapper>
            <CompositeImage {...starsImage} />
          </StarsWrapper>
        </Flex>
      </Flex>
    </>
  )
}

export default Hero
