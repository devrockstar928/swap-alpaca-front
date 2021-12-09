import { ChainId } from '@alpaca-swap/sdk'
import { request } from 'graphql-request'
import { GRAPH_HOST } from '../constants'

export const status = async (chainId = ChainId.MAINNET, subgraphName) =>
  request(
    `${GRAPH_HOST[chainId]}/index-node/graphql`,
    `
        indexingStatusForCurrentVersion(subgraphName: "${subgraphName}") {
            synced
            health
            fatalError {
              message
              block {
                number
                hash
              }
              handler
            }
            chains {
              chainHeadBlock {
                number
              }
              latestBlock {
                number
              }
            }
          }
        `
  )
