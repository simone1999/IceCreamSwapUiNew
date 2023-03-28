import { Button, Flex, Heading, Link, Table, Td, Text, useMatchBreakpoints } from '@pancakeswap/uikit'
import { PropsWithChildren, useMemo, useCallback, useEffect } from 'react'
import { FetchStatus } from 'config/constants/types'
import { BigNumber, utils } from 'ethers'
import styled from 'styled-components'
import { useActiveChain } from 'hooks/useActiveChain'
import { useToken } from 'hooks/Tokens'
import { formatAmount } from 'views/Bridge/formatter'
import { useAccount } from 'wagmi'
import AppWrapper from 'components/AppWrapper'
import { useCampaigns, useFlags } from './hooks'
import TokenName from 'views/Locks/components/TokenName'
import { renderDate } from 'utils/renderDate'
import InfoTooltip from '@pancakeswap/uikit/src/components/Timeline/InfoTooltip'
import useNativeCurrency from 'hooks/useNativeCurrency'

const RowStyled = styled.tr`
  &:hover {
    background: ${({ theme }) => theme.colors.backgroundDisabled};
  }

  &:last-of-type {
    border-radius: 0 0 16px 16px;
  }

  max-width: calc(100vw - 48px);

  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: table-row;
  }
`

const StyledFlex = styled(Flex)`
  align-items: center;
  gap: 0.25em;
`

const Td1: React.FC<PropsWithChildren> = ({ children }) => {
  const { isMobile } = useMatchBreakpoints()
  return (
    <Td
      style={{
        paddingBottom: isMobile ? '0px' : undefined,
        borderBottom: isMobile ? '0px' : undefined,
      }}
    >
      {children}
    </Td>
  )
}

const Td2: React.FC<PropsWithChildren> = ({ children }) => {
  const { isMobile } = useMatchBreakpoints()
  return <Td style={{ paddingTop: isMobile ? '12px' : undefined, wordWrap: 'break-word' }}>{children}</Td>
}

export const CampaignOverview: React.FC<{ id: number }> = ({ id }) => {
  const { isMobile } = useMatchBreakpoints()
  const { data, status } = useCampaigns({ id })
  const campaign = data?.[0]
  const chain = useActiveChain()
  const native = useNativeCurrency()
  const getAddressUrl = (add: string) => `${chain?.blockExplorers.default.url}/address/${add}`
  const flags = useFlags()
  useEffect(() => {
    if (!campaign) return
    console.log(
      'Total Contributed: ',
      utils.formatEther(campaign?.softCap.mul(Math.floor(campaign.progress * 10000)).div(10000)),
    )
  }, [campaign?.progress, campaign?.softCap])

  const token = useToken(campaign?.tokenAddress)
  const isIceSale = flags.data?.iceSaleAddress === campaign?.tokenAddress
  if (!campaign) return null

  return (
    <AppWrapper
      hasBackButton
      title={`Viewing ${
        campaign.tokenAddress === '0xc0E49f8C615d3d4c245970F6Dc528E4A47d69a44' ? 'IceCream' : token?.name
      } Campaign`}
      subtitle=""
      backlink="/launchpad"
    >
      <Flex flexDirection="column" gap="0.75em">
        {status === FetchStatus.Failed ? (
          <Heading as="h2" marginY="3">
            Campaign not found
          </Heading>
        ) : (
          <>
            <Heading as="h2" marginY="3">
              {campaign.tokenAddress === '0xc0E49f8C615d3d4c245970F6Dc528E4A47d69a44' ? 'IceCream' : token?.name}{' '}
              Campaign
            </Heading>
            <Text>{campaign?.description}</Text>
            {campaign && (
              <>
                <Table>
                  <tbody>
                    <RowStyled>
                      <Td1>Token{isMobile && ':'}</Td1>
                      <Td2>
                        <TokenName withSymbol address={campaign.tokenAddress} />
                      </Td2>
                    </RowStyled>
                    <RowStyled>
                      <Td1>Token Address{isMobile && ':'}</Td1>
                      <Td2>
                        <Link external href={getAddressUrl(campaign.tokenAddress)} display="inline" target="_blank">
                          {campaign.tokenAddress}
                        </Link>
                      </Td2>
                    </RowStyled>

                    <RowStyled>
                      <Td1>
                        <StyledFlex>
                          Soft Cap{' '}
                          <InfoTooltip text="The soft cap is required for the campaign to succeed. If the Soft Cap is not reached you will get your funds back" />
                        </StyledFlex>
                      </Td1>
                      <Td2>
                        {formatAmount(utils.formatUnits(campaign.softCap, 18))} {native?.symbol}
                      </Td2>
                    </RowStyled>
                    {!isIceSale ? (
                      <RowStyled>
                        <Td1>
                          <StyledFlex>
                            Hard Cap
                            <InfoTooltip text="The hard cap allows for additional contribution to the campaign. The remaining tokens of the hard cap will be burned. When the hard cap is reached the campaign is lock for additional contributions." />
                          </StyledFlex>
                        </Td1>
                        <Td2>
                          {formatAmount(utils.formatUnits(campaign.hardCap, 18))} {native?.symbol}
                        </Td2>
                      </RowStyled>
                    ) : undefined}
                    {!campaign.min_allowed.isZero() ? (
                      <RowStyled>
                        <Td1>Minimum Contribution</Td1>
                        <Td2>
                          {formatAmount(utils.formatUnits(campaign.min_allowed, 18))} {native?.symbol}
                        </Td2>
                      </RowStyled>
                    ) : undefined}
                    <RowStyled>
                      <Td1>Maximum Contribution</Td1>
                      <Td2>
                        {formatAmount(utils.formatUnits(campaign.max_allowed, 18))} {native?.symbol}
                      </Td2>
                    </RowStyled>
                    <RowStyled>
                      <Td1>Rate</Td1>
                      <Td2>
                        {formatAmount(utils.formatUnits(campaign.rate, token?.decimals))} {token?.symbol} per{' '}
                        {native?.symbol}
                      </Td2>
                    </RowStyled>
                    {isIceSale ? (
                      <>
                        <RowStyled>
                          <Td1>Reward</Td1>
                          <Td2>{flags.data?.reward}</Td2>
                        </RowStyled>
                        <RowStyled>
                          <Td1>Vesting Duration</Td1>
                          <Td2>{flags.data?.vestingDuration}</Td2>
                        </RowStyled>
                      </>
                    ) : (
                      <>
                        <RowStyled>
                          <Td1>
                            <StyledFlex>
                              Liquidity Rate
                              <InfoTooltip
                                text={`The amount of ${token?.symbol} that will be added per ${native?.symbol} as liquidity after the campaign succeeded. This will also determine the starting price after the campaign.`}
                              />
                            </StyledFlex>
                          </Td1>
                          <Td2>
                            {formatAmount(utils.formatUnits(campaign.pool_rate, token?.decimals))} {token?.symbol} per{' '}
                            {native?.symbol}
                          </Td2>
                        </RowStyled>
                        <RowStyled>
                          <Td1>
                            <StyledFlex>
                              Liquidity Percentage
                              <InfoTooltip text="That percentage of the total raised amount that will be added as liquidity." />
                            </StyledFlex>
                          </Td1>
                          <Td2>{campaign.liquidity_rate.toNumber() / 100}%</Td2>
                        </RowStyled>
                      </>
                    )}
                    <RowStyled>
                      <Td1>Starting at</Td1>
                      <Td2>{renderDate(campaign.start_date.mul(1000).toNumber())}</Td2>
                    </RowStyled>
                    <RowStyled>
                      <Td1>Ending at</Td1>
                      <Td2>{renderDate(campaign.end_date.mul(1000).toNumber())}</Td2>
                    </RowStyled>
                  </tbody>
                </Table>
              </>
            )}
          </>
        )}
      </Flex>
    </AppWrapper>
  )
}
