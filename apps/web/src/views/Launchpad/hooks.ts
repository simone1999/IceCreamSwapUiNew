/* eslint-disable camelcase */
import { PSIPadCampaign } from '@passive-income/launchpad-contracts/typechain/PSIPadCampaign'
import { PSIPadCampaignFactory } from '@passive-income/launchpad-contracts/typechain/PSIPadCampaignFactory'
import { useActiveChain } from 'hooks/useActiveChain'
import { useContract } from 'hooks/useContract'
import campaignAbi from '@passive-income/launchpad-contracts/abi/contracts/PSIPadCampaign.sol/PSIPadCampaign.json'
import campaignFactoryAbi from '@passive-income/launchpad-contracts/abi/contracts/PSIPadCampaignFactory.sol/PSIPadCampaignFactory.json'
import useSWR from 'swr'
import { multicallv2 } from 'utils/multicall'
import { BigNumber } from 'ethers'
import { useProvider } from 'wagmi'

export const useCampaignFactory = () => {
  const chain = useActiveChain()
  return useContract<PSIPadCampaignFactory>(chain?.campaignFactory, campaignFactoryAbi, true)
}

export const useCampaignSigner = (contractAddress: string) => {
  return useContract<PSIPadCampaign>(contractAddress, campaignAbi, true)
}

export const useCampaign = (contractAddress: string) => {
  return useContract<PSIPadCampaign>(contractAddress, campaignAbi)
}

export const useGivenAmount = (contractAddress: string, address: string) => {
  const campaign = useCampaign(contractAddress)
  return useSWR<BigNumber>(
    campaign && address ? ['givenAmount', contractAddress, address] : null,
    async () => {
      return campaign.getGivenAmount(address)
    },
    {
      refreshInterval: 3000,
    },
  )
}

export const useFlags = () => {
  return useSWR<Record<string, string>>(
    '/api/get-flags',
    async () => {
      const flags = await fetch('/api/get-flags').then((res) => res.json())
      return flags
    },
    {
      refreshInterval: 60000,
    },
  )
}

export interface CampaignData {
  address: string
  banner?: string
  chainId: number
  collected: BigNumber
  description: string
  discord?: string
  end_date: BigNumber
  github?: string
  hardCap: BigNumber
  id: number
  liquidity_rate: BigNumber
  lock_duration: BigNumber
  max_allowed: BigNumber
  min_allowed: BigNumber
  pool_rate: BigNumber
  rate: BigNumber
  reddit?: string
  softCap: BigNumber
  start_date: BigNumber
  telegram?: string
  tokenAddress: string
  twitter?: string
  website: string
  tags: string[]
  progress: number
  hardCapProgress: number
}

export const useCampaigns = ({ filter, id }: { filter?: string; id?: number }) => {
  const chain = useActiveChain()
  const provider = useProvider({ chainId: chain?.id })

  return useSWR<CampaignData[]>(
    chain ? ['campaigns', chain] : null,
    async () => {
      const campaigns: any[] = await fetch('/api/get-campaigns', {
        method: 'POST',
        body: JSON.stringify({ chainId: chain.id, filter, id }),
      }).then((res) => res.json())
      let multiCallResult: any = []
      try {
        multiCallResult = await multicallv2({
          abi: campaignAbi,
          chainId: chain.id,
          provider,
          calls: campaigns
            .map((campaign) => [
              {
                address: campaign.address,
                name: 'token',
              },
              {
                address: campaign.address,
                name: 'softCap',
              },
              {
                address: campaign.address,
                name: 'hardCap',
              },
              {
                address: campaign.address,
                name: 'start_date',
              },
              {
                address: campaign.address,
                name: 'end_date',
              },
              {
                address: campaign.address,
                name: 'rate',
              },
              {
                address: campaign.address,
                name: 'min_allowed',
              },
              {
                address: campaign.address,
                name: 'max_allowed',
              },
              {
                address: campaign.address,
                name: 'pool_rate',
              },
              {
                address: campaign.address,
                name: 'lock_duration',
              },
              {
                address: campaign.address,
                name: 'liquidity_rate',
              },

              {
                address: campaign.address,
                name: 'collected',
              },
            ])
            .flat(),
        })
      } catch (e) {
        console.error(e)
      }
      return campaigns.map((campaign, index: number) => {
        return {
          ...campaign,
          tokenAddress: multiCallResult[index * 12][0],
          softCap: multiCallResult[index * 12 + 1][0],
          hardCap: multiCallResult[index * 12 + 2][0],
          start_date: multiCallResult[index * 12 + 3][0],
          end_date: multiCallResult[index * 12 + 4][0],
          rate: multiCallResult[index * 12 + 5][0],
          min_allowed: multiCallResult[index * 12 + 6][0],
          max_allowed: multiCallResult[index * 12 + 7][0],
          pool_rate: multiCallResult[index * 12 + 8][0],
          lock_duration: multiCallResult[index * 12 + 9][0],
          liquidity_rate: multiCallResult[index * 12 + 10][0],
          collected: multiCallResult[index * 12 + 11][0],
          progress:
            Number(multiCallResult[index * 12 + 11][0].toString()) /
            Number(multiCallResult[index * 12 + 1][0].toString()),
          hardCapProgress:
            Number(multiCallResult[index * 12 + 11][0].toString()) /
            Number(multiCallResult[index * 12 + 2][0].toString()),
        }
      })
    },
    {
      refreshInterval: 30000,
    },
  )
}
