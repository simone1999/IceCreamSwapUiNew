/* eslint-disable camelcase */
import { useActiveChain } from 'hooks/useActiveChain'
import { useContract } from 'hooks/useContract'
import { campaignABI } from 'config/abi/campaign'
import { campaignFactoryABI } from 'config/abi/campaignFactory'
import useSWR from 'swr'
import { Address } from "wagmi";
import { publicClient } from "utils/wagmi";

export const useCampaignFactory = () => {
  const chain = useActiveChain()
  return useContract(chain?.campaignFactory, campaignFactoryABI)
}

export const useCampaign = (contractAddress: Address) => {
  return useContract(contractAddress, campaignABI)
}

export const useGivenAmount = (contractAddress: Address, address: Address) => {
  const campaign = useCampaign(contractAddress)
  return useSWR(
    campaign && address ? ['givenAmount', contractAddress, address] : null,
    async () => {
      return campaign.read.getGivenAmount([address])
    },
    {
      refreshInterval: 3000,
    },
  )
}

export const useCanBuy = (contractAddress: Address, address: Address) => {
  const campaign = useCampaign(contractAddress)
  return useSWR<boolean>(
    campaign && address ? ['canBuy', contractAddress, address] : null,
    async () => {
      if (!(await campaign.read.whitelistEnabled())) return true
      return await campaign.read.whitelisted([address])
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
      return await fetch('/api/get-flags').then((res) => res.json())
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
  collected: bigint
  description: string
  discord?: string
  end_date: bigint
  github?: string
  hardCap: bigint
  id: number
  liquidity_rate: bigint
  lock_duration: bigint
  max_allowed: bigint
  min_allowed: bigint
  pool_rate: bigint
  rate: bigint
  reddit?: string
  softCap: bigint
  start_date: bigint
  telegram?: string
  tokenAddress: string
  raisedToken: string
  twitter?: string
  website: string
  tags: string[]
  progress: number
  hardCapProgress: number
  deleted: boolean
  dummyRate?: string
  dummyMaxContrib?: string
  dummySoftCap?: string
  startDate?: number
  dummyHardCap?: string
  isLive: boolean
}

export const useCampaigns = ({ filter, id }: { filter?: string; id?: number }) => {
  const chain = useActiveChain()

  return useSWR<CampaignData[]>(
    chain ? ['campaigns', chain] : null,
    async () => {
      const campaigns: any[] = await fetch('/api/get-campaigns', {
        method: 'POST',
        body: JSON.stringify({ chainId: chain.id, filter, id }),
      }).then((res) => res.json())
      let multiCallResult: any = []
      try {
        multiCallResult = await publicClient({ chainId: chain.id }).multicall({
          contracts: campaigns
            .filter((c) => c.address !== 'dummy')
            .map((campaign) => {
              const campaignAddress = campaign.address
              return [
                {
                  abi: campaignABI,
                  address: campaignAddress,
                  functionName: 'token',
                } as const,
                {
                  abi: campaignABI,
                  address: campaignAddress,
                  functionName: 'softCap',
                } as const,
                {
                  abi: campaignABI,
                  address: campaignAddress,
                  functionName: 'hardCap',
                } as const,
                {
                  abi: campaignABI,
                  address: campaignAddress,
                  functionName: 'start_date',
                } as const,
                {
                  abi: campaignABI,
                  address: campaignAddress,
                  functionName: 'end_date',
                } as const,
                {
                  abi: campaignABI,
                  address: campaignAddress,
                  functionName: 'rate',
                } as const,
                {
                  abi: campaignABI,
                  address: campaignAddress,
                  functionName: 'min_allowed',
                } as const,
                {
                  abi: campaignABI,
                  address: campaignAddress,
                  functionName: 'max_allowed',
                } as const,
                {
                  abi: campaignABI,
                  address: campaignAddress,
                  functionName: 'pool_rate',
                } as const,
                {
                  abi: campaignABI,
                  address: campaignAddress,
                  functionName: 'lock_duration',
                } as const,
                {
                  abi: campaignABI,
                  address: campaignAddress,
                  functionName: 'liquidity_rate',
                } as const,
                {
                  abi: campaignABI,
                  address: campaignAddress,
                  functionName: 'collected',
                } as const,
                {
                  abi: campaignABI,
                  address: campaignAddress,
                  functionName: campaign.address === '0x6189bCe52857e83E0F6D0390Bdf3aC8C7Bac6104' ? 'token' : 'raisedToken',
                } as const,
                {
                  abi: campaignABI,
                  address: campaignAddress,
                  functionName: 'isLive',
                } as const,
              ]
            }).flat(),
          allowFailure: false,
        })
      } catch (e) {
        console.error(e)
      }
      return [
        ...campaigns
          .filter((c) => c.address !== 'dummy')
          .map((campaign, index: number) => {
            return {
              ...campaign,
              tokenAddress: multiCallResult[index * 14][0],
              raisedToken: multiCallResult[index * 14 + 12][0],
              isLive: multiCallResult[index * 14 + 13][0],
              softCap: multiCallResult[index * 14 + 1][0],
              hardCap: multiCallResult[index * 14 + 2][0],
              start_date: multiCallResult[index * 14 + 3][0],
              end_date: multiCallResult[index * 14 + 4][0],
              rate: multiCallResult[index * 14 + 5][0],
              min_allowed: multiCallResult[index * 14 + 6][0],
              max_allowed: multiCallResult[index * 14 + 7][0],
              pool_rate: multiCallResult[index * 14 + 8][0],
              lock_duration: multiCallResult[index * 14 + 9][0],
              liquidity_rate: multiCallResult[index * 14 + 10][0],
              collected: multiCallResult[index * 14 + 11][0],
              progress:
                Number(multiCallResult[index * 14 + 11][0].toString()) /
                Number(multiCallResult[index * 14 + 1][0].toString()),
              hardCapProgress:
                Number(multiCallResult[index * 14 + 11][0].toString()) /
                Number(multiCallResult[index * 14 + 2][0].toString()),
            }
          })
          .map((c) => ({
            ...c,
            progress: c.progress > 0.995 ? 1 : c.progress,
            hardCapProgress: c.hardCapProgress > 0.995 ? 1 : c.hardCapProgress,
          })),
        ...campaigns.filter((c) => c.address === 'dummy'),
      ]
    },
    {
      refreshInterval: 30000,
    },
  )
}
