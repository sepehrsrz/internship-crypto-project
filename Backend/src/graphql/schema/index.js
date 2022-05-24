const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Market {
    _id: ID!
    pair: String!
    timeframe : String!
    openTime: Float!
    open: Float!
    high: Float!
    low: Float!
    close: Float!
    volume: Float!
    closeTime: Float!
    quoteVolume: Float!
    trades: Int!
    baseAssetVolume : Float!
    quoteAssetVolume : Float!
  }

  type Signal {
    _id: ID!
    signal_number: Int!
    status: String!
  }

  type Decision {
    _id: ID!
    analyst: Int!
    signal: Int!
    analyst_decision: String!
  }

  type AnalystRate {
    _id: ID!
    true_decisions: Int!
    acceptable_decisions: Int!
    decisions_rate: Float!
  }

  type Query {
    all_market(pair: String!,timeframe: String!):[Market!]
    timespan_market(pair: String!,timeframe: String!,openTime: Float!,closeTime: Float!): [Market!]

    all_signals:[Signal!]
    all_decisions(analyst:Int):[Decision!]
    analysts_rank:[AnalystRate!]!

  }

  schema {
    query: Query
  }
`)
