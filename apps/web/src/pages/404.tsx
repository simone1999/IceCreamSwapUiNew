import { NotFound } from '@pancakeswap/uikit'
import { NextSeo } from 'next-seo'
import { SUPPORT_ANY } from "config/constants/supportChains";

const NotFoundPage = () => (
  <NotFound>
    <NextSeo title="404" />
  </NotFound>
)

NotFoundPage.chains = SUPPORT_ANY

export default NotFoundPage
