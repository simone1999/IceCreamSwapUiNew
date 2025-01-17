import { DefaultSeoProps } from 'next-seo'

export const SEO: DefaultSeoProps = {
  titleTemplate: '%s | MermaidSwap',
  defaultTitle: 'MermaidSwap',
  description:
    'MermaidSwap combines a decentralized exchange(DEX), fun games, and profit-sharing to revolutionize DeFi on KAIA.',
  twitter: {
    cardType: 'summary_large_image',
    handle: '@mermaidswap_xyz',
    site: '@mermaidswap_xyz',
  },
  openGraph: {
    title: 'MermaidSwap - Gaming and Rewards DeFi',
    description:
      'MermaidSwap combines a decentralized exchange(DEX), fun games, and profit-sharing to revolutionize DeFi on KAIA.',
    images: [{ url: '/images/icecreamswap.png' }],
  },
}
