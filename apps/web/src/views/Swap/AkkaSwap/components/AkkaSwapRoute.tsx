import { Fragment, memo, useEffect } from 'react'
import { Trade, Currency, TradeType } from '@pancakeswap/sdk'
import { Text, Flex, ChevronRightIcon, Link } from '@pancakeswap/uikit'
import { unwrappedToken } from 'utils/wrappedCurrency'
import { AkkaRouterInfoResponseType } from '../hooks/types'
import useTheme from 'hooks/useTheme'
import { useActiveChainId } from 'hooks/useActiveChainId'

export default memo(function SwapRoute({ route }: { route: AkkaRouterInfoResponseType }) {

  // Create better route object to filter routes to show in ui
  const { chainId } = useActiveChainId()
  const akkaRoute = route?.routes[chainId.toString()]
  akkaRoute?.forEach((item) => {
    item.routes[0].operationsSeperated[0].operations.forEach((i) => {
      /* eslint-disable no-param-reassign */
      delete i.amountIn
      delete i.amountInWei
      delete i.amountOut
      delete i.amountOutWei
      /* eslint-enable no-param-reassign */
    })
  })
  const result = akkaRoute?.filter(
    (thing, index, self) =>
      index ===
      self.findIndex(
        (t) => JSON.stringify(t.routes[0].operationsSeperated) === JSON.stringify(thing.routes[0].operationsSeperated),
      ),
  )
  function count() {
    const arrayElements = result.map((item) => {
      return JSON.stringify(item)
    })
    arrayElements.sort()

    const arrayElements2 = akkaRoute?.map((item) => {
      return JSON.stringify(item)
    })
    arrayElements2.sort()
    const array = []
    for (let i = 0; i < arrayElements.length; i++) {
      let cnt = 0
      let sum = 0
      for (let j = 0; j < arrayElements2.length; j++) {
        if (
          JSON.stringify(JSON.parse(arrayElements[i]).routes[0].operationsSeperated) ===
          JSON.stringify(JSON.parse(arrayElements2[j]).routes[0].operationsSeperated)
        ) {
          sum += JSON.parse(arrayElements2[j]).routes[0].inputAmount
          cnt++
        }
      }
      array.push([arrayElements[i], cnt, sum])
    }
    return array
  }
  const modifiedArray = count()
  return (
    <Flex flexDirection="column" flexWrap="wrap" width="100%" alignItems="flex-end" marginY="20px" marginLeft="10px" maxWidth="400px">
      {modifiedArray.map((item, index) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <Flex key={index} flexWrap="wrap" justifyContent="flex-end">
            <Text fontSize="12px">{(Number((item[2] / Number(route.inputAmount)).toFixed(3)) * 100).toFixed(1)}%</Text>
            <ChevronRightIcon width="16px" />
            {JSON.parse(item[0]).routes[0].operationsSeperated[0].operations.map((item2, index2, path) => {
              const isLastItem: boolean = index2 === path.length - 1
              return (
                <Fragment key={item2.askToken[3]}>
                  <Text fontSize="12px"> {item2.askToken[3]} </Text>
                  {!isLastItem && <ChevronRightIcon width="16px" />}
                </Fragment>
              )
            })}
          </Flex>
        )
      })}

    </Flex>
  )
})
