import { TranslateFunction } from '@pancakeswap/localization'
import { SalesSectionProps } from '.'
import iceConeA from '../../../../../public/images/home/trade/iceconea.png'
import iceConeB from '../../../../../public/images/home/trade/iceconeb.png'
import bridgeA from '../../../../../public/images/home/bridge/bridge_a.png'
import bridgeB from '../../../../../public/images/home/bridge/bridge_b.png'
import earnIce from '../../../../../public/images/home/earn/ice.png'

export const swapSectionData = (t: TranslateFunction): SalesSectionProps => ({
  headingText: t('Trade any token at the best rate'),
  bodyText: t(
    'Our AI-powered DEX aggregator scans the entire blockchain to find the most efficient way to execute your trade. ' +
      'Stop wasting money on inefficient trades!',
  ),
  reverse: false,
  primaryButton: {
    to: '/swap',
    text: t('Trade Now'),
    external: false,
  },
  secondaryButton: {
    to: 'https://wiki.icecreamswap.com/dex/swap',
    text: t('Learn'),
    external: true,
  },
  images: {
    path: '/images/home/trade/',
    attributes: [
      { src: iceConeA, alt: '' },
      // { src: iceConeB, alt: '' },
    ],
  },
})

export const bridgeSectionData = (t: TranslateFunction): SalesSectionProps => ({
  headingText: t('Bridge with built-in Faucet'),
  bodyText: t(
    'IceCreamSwap allows direct bridging between many chains with ' +
      'its audited and battle tested smart contracts. ' +
      'The unique built-in faucet automatically drops you native tokens so you never have to worry about gas fees again.',
  ),
  reverse: true,
  primaryButton: {
    to: '/bridge',
    text: t('Bridge Now'),
    external: false,
  },
  secondaryButton: {
    to: 'https://wiki.icecreamswap.com/dex/bridge',
    text: t('Learn'),
    external: true,
  },
  images: {
    path: '/images/home/earn/',
    attributes: [
      { src: bridgeA, alt: '' },
      { src: bridgeB, alt: '' },
    ],
  },
})

export const earnSectionData = (t: TranslateFunction): SalesSectionProps => ({
  headingText: t('Earn. Provide liquidity and earn TRI tokens'),
  bodyText: t(
    'Not only do you earn trading fees by providing liquidity, but with Liquidity Farms, you can also earn TRI tokens on top.',
  ),
  reverse: false,
  primaryButton: {
    to: '/farms',
    text: t('Farms'),
    external: false,
  },
  secondaryButton: {
    to: 'https://wiki.icecreamswap.com/dex/farm',
    text: t('Learn'),
    external: true,
  },
  images: {
    path: '/images/home/ice/',
    attributes: [{ src: earnIce, alt: '' }],
  },
})

export const stakeSectionData = (t: TranslateFunction): SalesSectionProps => ({
  headingText: t('Stake. Earn Profit Sharing from MermaidSwap Games'),
  bodyText: t(
    'Not only do you earn trading fees by providing liquidity, but with Liquidity Farms, you can also earn TRI tokens on top.',
  ),
  reverse: false,
  primaryButton: {
    to: '/pools',
    text: t('Stake'),
    external: false,
  },
  secondaryButton: {
    to: 'https://wiki.icecreamswap.com/dex/staking',
    text: t('Learn'),
    external: true,
  },
  images: {
    path: '/images/home/ice/',
    attributes: [{ src: iceConeB, alt: 'Stake TRI' }],
  },
})
