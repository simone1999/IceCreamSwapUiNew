import { defineFarmV3Configs } from '../src/defineFarmV3Configs'
import { SerializedFarmConfig } from '..'
import { getAddress } from "viem";

export const farmsV3 = defineFarmV3Configs([
])

const farms: SerializedFarmConfig[] = [
].map((p) => ({ ...p, token: p.token.serialize, quoteToken: p.quoteToken.serialize, lpAddress: getAddress(p.lpAddress), }))

export default farms
