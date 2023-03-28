import { useEffect } from 'react'
import { getNftSaleAddress } from 'utils/addressHelpers'
import { getPancakeSquadContract } from 'utils/contractHelpers'
import { multicallv2 } from 'utils/multicall'
import { BigNumber } from '@ethersproject/bignumber'
import nftSaleAbi from 'config/abi/nftSale.json'
import {useActiveChainId} from "../../../hooks/useActiveChainId";

const useEventInfos = ({ refreshCounter, setCallback }) => {
  const { chainId } = useActiveChainId()
  useEffect(() => {
    const fetchEventInfos = async () => {
      try {
        const nftSaleAddress = getNftSaleAddress()
        const pancakeSquadContract = getPancakeSquadContract()

        const calls = [
          'maxSupply',
          'maxPerAddress',
          'pricePerTicket',
          'maxPerTransaction',
          'totalTicketsDistributed',
          'currentStatus',
          'startTimestamp',
        ].map((method) => ({
          address: nftSaleAddress,
          name: method,
        }))

        const [
          [currentMaxSupply],
          [currentMaxPerAddress],
          [currentPricePerTicket],
          [currentMaxPerTransaction],
          [currentTotalTicketsDistributed],
          [currentSaleStatus],
          [currentStartTimestamp],
          // @ts-ignore fix chainId support
        ] = await multicallv2({ abi: nftSaleAbi, calls, chainId })

        const currentTotalSupplyMinted = await pancakeSquadContract.totalSupply()

        setCallback({
          maxSupply: currentMaxSupply.toNumber(),
          maxPerAddress: currentMaxPerAddress.toNumber(),
          pricePerTicket: BigNumber.from(currentPricePerTicket),
          maxPerTransaction: currentMaxPerTransaction.toNumber(),
          totalTicketsDistributed: currentTotalTicketsDistributed.toNumber(),
          saleStatus: currentSaleStatus,
          startTimestamp: Number(currentStartTimestamp.toString().padEnd(13, '0')),
          totalSupplyMinted: currentTotalSupplyMinted.toNumber(),
        })
      } catch (e) {
        console.error(e)
      }
    }

    if (nftSaleAbi.length > 0) {
      fetchEventInfos()
    }
  }, [refreshCounter, setCallback])
}

export default useEventInfos
