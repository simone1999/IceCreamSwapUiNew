/**
 * This file contains the root router of your tRPC-backend
 */
import { publicProcedure, router } from '../trpc'
import { campaignRouter } from './campaign'
import { kycRouter } from './kyc'
import { sessionRouter } from './session'
import { tokenRouter } from './token'

export const appRouter = router({
  health: publicProcedure.query(() => 'yay!'),
  session: sessionRouter,
  token: tokenRouter,
  kyc: kycRouter,
  campaign: campaignRouter,
})

export type AppRouter = typeof appRouter
