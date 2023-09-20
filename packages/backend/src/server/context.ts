// @ts-check
import * as trpc from '@trpc/server'
import { getIronSession } from 'iron-session'
import { sessionOptions } from './session'

export async function createContext(opts: any) {
  const session = (await getIronSession(opts.req, opts.res, sessionOptions)) as any

  return { session, res: opts.res }
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>
