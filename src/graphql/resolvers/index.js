const models = require('../../models/models')

module.exports = {

  all_market: async ({pair,timeframe}) => {
    try {
       const marketFetched = await models.Market.find({ $and: [ {pair:pair},{timeframe:timeframe} ] })
        return marketFetched.map(market => {
            return { 
                ...market._doc, 
                _id: market.id }
        })
    }
    catch (error) {
        throw error
    }
    
 },

 timespan_market: async ({pair,timeframe,openTime,closeTime}) => {
    try {
       const marketFetched = await models.Market.find({ $and: 
        [ {pair:pair},
            {timeframe:timeframe},
            {openTime:{$gte:openTime}},
            {closeTime:{$lte:closeTime}} ] })
        return marketFetched.map(market => {
            return { 
                ...market._doc, 
                _id: market.id }
        })
    }
    catch (error) {
        throw error
    }
    
 }

}
