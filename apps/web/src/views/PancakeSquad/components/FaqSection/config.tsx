import { Text, Link } from '@pancakeswap/uikit'
import { ContextApi } from '@pancakeswap/localization'

type FAQsType = {
  t: ContextApi['t']
}

const config = ({ t }: FAQsType) => [
  {
    title: t('What is IceCreamSwap building?'),
    description: [
      t('A one stop DeFi solution with AI DEX aggregator and an intuitive UI to access efficient DeFi on all chains.')
    ],
  },
  {
    title: t('Are the Swap contracts audited?'),
    description: [
      <Text as="p" color="textSubtle" fontSize="16px">
        {t('Yes, IceCreamSwap has multiple audits including an Audit, Bug Bounty and KYC by CertiK: ',)}
        <Link
          display="inline-flex"
          color="text"
          title="CertiK Audit"
          href="https://skynet.certik.com/projects/icecreamswap"
        >
          {t('CertiK Audit')}
        </Link>
        {t('.')}
      </Text>,
    ],
  },
  {
    title: t('How does IceCreamSwap combine AI with Blockchains?'),
    description: [
      t('The Blockchain is an amazing tool for security and trust minimization. But as it\'s still in It\'s early stage, ' +
        'inefficiencies occur which result in an unwanted value transfer from users to MEV/Arbitrage bots. ' +
        'Our AI DEX aggregator detects these inefficiencies and automatically extracts them for our users, resulting in more efficient trades and less value lost.'),
    ],
  },
  {
    title: t('What is the IceCreamSwap AI DEX aggregator?'),
    description: [
      t('It\'s a sophisticated system that scans the entire blockchain to find the optimal way to execute your swap. ' +
        'It allows you to trade any token at the best rate, not only taking into account the IceCreamSwap liquidity, but also the liquidity of other DEXes. ' +
        'Simplified you can think about it as the booking.com of DEXes, finding you the best offer to execute your trade. ' +
        'It even extracts Arbitrage opportunities for you, so your trades sometimes end with more value than they began with.'),
    ],
  },
  {
    title: t('How does IceCreamSwap extract arbitrage for me?'),
    description: [
      t('With every trade, our AI DEX aggregator not only finds the best way to execute that trade but also scans for arbitrage opportunities. These opportunities are extracted directly in your trade. As most Arbitrage is generated from inefficient trades, IceCreamSwap users not only avoid losing value to arbitrage but also profit directly from users who still rely on traditional DEXes.'),
    ],
  },
  {
    title: t('How to list a token on IceCreamSwap?'),
    description: [
      t('Simply contact us on Telegram.'),
    ],
  },
  {
    title: t('How much reward will I get for providing liquidity?'),
    description: [
      t(
        'Most of the trading fees are distributed directly to our liquidity providers. Additionally, there are farming pools where you can receive extra ICE tokens, and some tokens, like SCORE, even generate rewards by securing the blockchain.',
      ),
    ],
  }
]
export default config
