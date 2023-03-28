import { BigNumber } from 'ethers'
import { Campaign as CampaignMeta } from '@prisma/client'

// export interface CampaignData {
//   id: string
//   token: string
//   softCap: BigNumber
//   hardCap: BigNumber
//   startDate: Date
//   endDate: Date
//   rate: BigNumber
//   paymentToken: string
//   minAllowed: BigNumber // min amount of payment token
//   maxAllowed: BigNumber // max amount of payment token
//   poolRate: BigNumber
//   lockDuration: BigNumber
//   liquidityRate: BigNumber
// }

export type { CampaignMeta }
