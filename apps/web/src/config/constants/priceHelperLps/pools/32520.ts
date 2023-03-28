import { SerializedFarmConfig } from '../../types'
import { bitgertTokens } from '@pancakeswap/tokens'

const priceHelperLps: SerializedFarmConfig[] = [
  /**
   * These LPs are just used to help with price calculation for MasterChef LPs (farms.ts).
   * This list is added to the MasterChefLps and passed to fetchFarm. The calls to get contract information about the token/quoteToken in the LP are still made.
   * The absence of a PID means the masterchef contract calls are skipped for this farm.
   * Prices are then fetched for all farms (masterchef + priceHelperLps).
   * Before storing to redux, farms without a PID are filtered out.
   */
  {
    pid: null,
    lpSymbol: 'Miidas-Wbrise LP',
    lpAddress: '0xd98e4C6352F6D73bAa65c0A5DF2bdf68f4C9C18E',
    token: bitgertTokens.miidas,
    quoteToken: bitgertTokens.wbrise,
  },
].map((p) => ({ ...p, token: p.token.serialize, quoteToken: p.quoteToken.serialize }))

export default priceHelperLps
