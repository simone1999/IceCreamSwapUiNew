import { Button, Flex, Heading, Link, NextLinkFromReactRouter } from '@pancakeswap/uikit'
import { useWeb3React } from '@pancakeswap/wagmi'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useTranslation } from '@pancakeswap/localization'
import Image from 'next/image'
import styled, { keyframes } from 'styled-components'
import hero from '../../../../public/images/home/hero-home.png'
import { SlideSvgDark, SlideSvgLight } from './SlideSvg'
import Script from 'next/script'

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
  position: relative;
  will-change: transform;
  > span {
    overflow: visible !important; // make sure the next-image pre-build blur image not be cropped
  }
`

const Hero = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()

  return (
    <>
      <Script id="emblem" async>
        {`(function hideEmblem() { var el = document.createElement('style'); document.head.appendChild(el); 
        var styleSheet = el.sheet; styleSheet.insertRule('.certik-emblem { display: none; }', 0); })();`}
      </Script>
      <Script async src="https://emblem.certik-assets.com/script?pid=icecreamswap&vid=91b5fa0e" />
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
          <Heading as="h1" scale="xxl" color="secondary" mb="12px">
            {t('IceCream brings people together')}
          </Heading>

          <div style={{ maxWidth: 225, height: 75 }}>
            <div className="certik-emblem" data-id="91b5fa0e">
              <a href="https://skynet.certik.com/projects/icecreamswap?utm_source=SkyEmblem&utm_campaign=icecreamswap&utm_medium=link">
                View project at certik.com
              </a>
            </div>
          </div>

          <Heading as="p" scale="md" mb="24px">
            {/* todo: make links display somewhat like the text, maybe a small underline or so. */}
            <Link href="https://icecreamswap.com/swap" display="inline-flex">
              DEX
            </Link>
            {', '}
            <Link href="https://icecreamswap.com/swap" display="inline-flex">
              {t('DEX Aggregator')}
            </Link>
            {', '}
            <Link href="https://chainlist.org" display="inline-flex">
              RPC
            </Link>
            {', '}
            {t('Block Explorer')}
            {', '}
            <Link href="https://icecreamswap.com/kyc" display="inline-flex">
              KYC
            </Link>
            {', '}
            <Link href="https://icecreamswap.com/launchpad" display="inline-flex">
              {t('Launchpad')}
            </Link>
            {t(' and ')}
            <Link href="https://icecreamswap.com/bridge" display="inline-flex">
              {t('Bridge')}
            </Link>
            {t(' on ')}
            <Link href="https://base.org/" display="inline-flex">
              Base
            </Link>
            {', '}
            <Link href="https://coredao.org/" display="inline-flex">
              Core DAO
            </Link>
            {', '}
            <Link href="https://www.telos.net/" display="inline-flex">
              Telos
            </Link>
            {', '}
            <Link href="https://bitgert.com/" display="inline-flex">
              Bitgert
            </Link>
            {', '}
            <Link href="https://xinfin.org/" display="inline-flex">
              XDC
            </Link>
            {', '}
            <Link href="https://shardeum.org/" display="inline-flex">
              Shardeum
            </Link>
            {', '}
            <Link href="https://shimmer.network/" display="inline-flex">
              Shimmer
            </Link>
            {', '}
            <Link href="https://www.bnbchain.org/en/smartChain" display="inline-flex">
              BSC
            </Link>
            {', '}
            <Link href="https://www.xo-dex.com/" display="inline-flex">
              Xodex
            </Link>
            {', '}
            <Link href="https://dogechain.dog/" display="inline-flex">
              Dogechain
            </Link>
            {t(' and ')}
            <Link href="https://www.fuse.io/" display="inline-flex">
              Fuse
            </Link>
            .
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
        </Flex>
      </Flex>
    </>
  )
}

export default Hero
