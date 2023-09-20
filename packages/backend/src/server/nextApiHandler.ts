// @ts-nocheck
import { createNextApiHandler } from '@trpc/server/adapters/next'
import { createContext } from './context'
import { appRouter } from './routers/_app'

export const nextApiHandler: any = createNextApiHandler({
  router: appRouter,
  createContext,
  onError: ({ error }) => {
    if (error.code === 'INTERNAL_SERVER_ERROR') {
      console.error(error)
    }
  },
  batching: {
    enabled: true,
  },
})
