import { ChainId, Currency } from '@pancakeswap/sdk'
import { BinanceIcon } from '@pancakeswap/uikit'
import { useMemo } from 'react'
import { WrappedTokenInfo } from '@pancakeswap/token-lists'
import styled from 'styled-components'
import { useHttpLocations } from '@pancakeswap/hooks'
import getTokenLogoURL from '../../utils/getTokenLogoURL'
import Logo from './Logo'
import chainName from 'config/constants/chainName'

const StyledLogo = styled(Logo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: 50%;
`

export default function CurrencyLogo({
  currency,
  size = '24px',
  style,
}: {
  currency?: Currency
  size?: string
  style?: React.CSSProperties
}) {
  const uriLocations = useHttpLocations(currency instanceof WrappedTokenInfo ? currency.logoURI : undefined)

  const srcs: string[] = useMemo(() => {
    if (currency?.isNative) return []

    if (currency?.isToken) {
      const tokenLogoURL = getTokenLogoURL(currency)

      if (currency instanceof WrappedTokenInfo) {
        if (!tokenLogoURL) return [...uriLocations]
        return [...uriLocations, tokenLogoURL]
      }
      if (!tokenLogoURL) return []
      return [tokenLogoURL]
    }
    return []
  }, [currency, uriLocations])
  const chainId = currency?.chainId
  const nativeName = chainName[chainId]

  if (currency?.isNative) {
    return (
      <StyledLogo
        size={size}
        srcs={[`/images/chains/${currency.chainId}.png`]}
        width={size}
        style={style}
        alt={`native ${nativeName} logo`}
      />
    )
  }

  return <StyledLogo size={size} srcs={srcs} alt={`${currency?.symbol ?? 'token'} logo`} style={style} />
}
