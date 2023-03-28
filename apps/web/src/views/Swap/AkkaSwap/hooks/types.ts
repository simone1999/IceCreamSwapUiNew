export interface AkkaRouterArgsResponseType {
  akkaFee: AkkaFeeType
  amountIn: string
  amountOutMin: string
  bridge: []
  data: any[]
  dstData: []
  to: string
  value: string
  valueHex: string
}

export interface AkkaFeeType {
  fee: string,
  r: string,
  s: string,
  signature: string,
  v: string
}

export interface AkkaRouterTrade {
  route: AkkaRouterInfoResponseType
  args: AkkaRouterArgsResponseType
}

export interface AkkaRouterInfoResponseType {
  inputAmount: string
  inputAmountWei: number
  bestAlt: number
  priceImpact: number
  returnAmount: string
  returnAmountWei: string
  returnAmountInUsd: number
  routes: BitgertRouteResponseDto
}

export interface BitgertRouteResponseDto {
  bitgert: Array<VolumeSpilitedRouteRoutes>
}

export interface VolumeSpilitedRouteRoutes {
  gasFeeInUsd: number
  inputAmount: number
  inputAmountInUsd: number
  inputAmountWei: number
  priceImpact: number
  returnAmount: number
  returnAmountInUsd: number
  returnAmountWei: string
  routes: Array<RouteRoutes>
}

export interface RouteRoutes {
  inputAmount: number
  inputAmountWei: number
  operations: Array<RouteRegularOperations>
  operationsSeperated: Array<RouteOperationsSeparated>
  returnAmount: number
  returnAmountWei: string
}

export interface RouteRegularOperations {
  amountIn: number
  amountInWei: string
  amountOut: number
  amountOutWei: string
  askToken: Array<string>
  contractAddr: string
  exchange: string
  offerToken: Array<string>
  routerAddr: string
}

export enum NetworkName {
  BSC = 'BSC',
  FTM = 'FANTOM',
  BITGERT = 'BITGERT',
  BRIDGE = 'BRIDGE',
}

export enum ChainId {
  BSC = 56,
  FTM = 250,
  BRISE = 32520,
}
export interface RouteOperationsSeparated {
  chain: NetworkName
  chainId?: number
  gasFee?: number
  operations: Array<RouteRegularOperations>
}

