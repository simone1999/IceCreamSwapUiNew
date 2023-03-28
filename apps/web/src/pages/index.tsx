import { getUnixTime, sub } from 'date-fns'
import { gql } from 'graphql-request'
import { GetStaticProps } from 'next'
import { SWRConfig } from 'swr'
import { getBlocksFromTimestamps } from 'utils/getBlocksFromTimestamps'
import { bitQueryServerClient, infoServerClient } from 'utils/graphql'
import { CHAIN_IDS } from 'utils/wagmi'
import Home from '../views/Home'

const IndexPage = ({ totalTx30Days, addressCount30Days, tvl }) => {
  return (
    <SWRConfig
      value={{
        fallback: {
          totalTx30Days,
          addressCount30Days,
          tvl,
        },
      }}
    >
      <Home />
    </SWRConfig>
  )
}

// Values fetched from TheGraph and BitQuery jan 24, 2022
const txCount = 54780336
const addressCount = 4425459

const tvl = 6082955532.115718

export const getStaticProps: GetStaticProps = async () => {
  const totalTxQuery = gql`
    query TotalTransactions($id: ID!, $block: Block_height) {
      pancakeFactory(id: $id, block: $block) {
        totalTransactions
      }
    }
  `

  const days30Ago = sub(new Date(), { days: 30 })

  const results = {
    totalTx30Days: txCount,
    addressCount30Days: addressCount,
    tvl,
  }

  const usersQuery = gql`
    query userCount($since: ISO8601DateTime, $till: ISO8601DateTime) {
      ethereum(network: bsc) {
        dexTrades(exchangeName: { in: ["Pancake", "Pancake v2"] }, date: { since: $since, till: $till }) {
          count(uniq: senders)
        }
      }
    }
  `

  if (process.env.BIT_QUERY_HEADER) {
    try {
      const result = await bitQueryServerClient.request(usersQuery, {
        since: days30Ago.toISOString(),
        till: new Date().toISOString(),
      })
      if (result?.ethereum?.dexTrades?.[0]?.count) {
        results.addressCount30Days = result.ethereum.dexTrades[0].count
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'production') {
        console.error('Error when fetching address count', error)
      }
    }
  }

  return {
    props: results,
    revalidate: 60 * 60 * 24 * 30, // 30 days
  }
}

IndexPage.chains = CHAIN_IDS

export default IndexPage
