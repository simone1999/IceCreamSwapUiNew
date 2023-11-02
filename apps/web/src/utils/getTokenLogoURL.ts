import { getAddress } from 'ethers/lib/utils'
import memoize from 'lodash/memoize'
import { Token } from '@pancakeswap/sdk'
import chainName from "../config/constants/chainName";
import { TOKEN_LOGO_S3_BUCKET_NAME } from '@icecreamswap/constants';


const getTokenLogoURL = memoize(
  (token?: Token) => {
    if (token && chainName[token.chainId] && isAddress(token.address)) {
      return `https://${TOKEN_LOGO_S3_BUCKET_NAME}.s3.amazonaws.com/token/${token.chainId}/${safeGetAddress(token.address)}.png`
    }
    return null
  },
  (t) => `${t?.chainId}#${t?.address}`,
)

export default getTokenLogoURL
