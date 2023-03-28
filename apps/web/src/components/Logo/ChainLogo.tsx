import Image, { StaticImageData } from 'next/image'
import { HelpIcon } from '@pancakeswap/uikit'
import { isChainSupported } from 'utils/wagmi'
import { memo } from 'react'
import logo32520 from '../../../public/images/chains/32520.png'
import logo2000 from '../../../public/images/chains/2000.png'
import logo61916 from '../../../public/images/chains/61916.png'
import logo122 from '../../../public/images/chains/122.png'
import logo50 from '../../../public/images/chains/50.png'
import logo56 from '../../../public/images/chains/56.png'
import logo1116 from '../../../public/images/chains/1116.png'
import { ChainId } from '@pancakeswap/sdk'

const logoMap: Record<ChainId, StaticImageData> = {
  32520: logo32520,
  2000: logo2000,
  61916: logo61916,
  122: logo122,
  50: logo50,
  56: logo56,
  1116: logo1116,
}

export const ChainLogo = memo(
  ({ chainId, width = 24, height = 24 }: { chainId: number; width?: number; height?: number }) => {
    if (isChainSupported(chainId)) {
      return (
        <Image
          alt={`chain-${chainId}`}
          style={{ maxHeight: `${height}px` }}
          src={logoMap[chainId]}
          width={width}
          height={height}
        />
      )
    }

    return <HelpIcon width={width} height={height} />
  },
)
