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
    
 },

 all_signals: async () => {
    try {
       const signalFetched = await models.Signal.find({ })
        return signalFetched.map(signal => {
            return { 
                ...signal._doc, 
                _id: signal.id }
        })
    }
    catch (error) {
        throw error
    }
    
 },

 all_decisions: async ({analyst}) => {
    try {
       const decisionFetched = await models.Decision.find({analyst:analyst})
        return decisionFetched.map(decision => {
            return { 
                ...decision._doc, 
                _id: decision.id }
        })
    }
    catch (error) {
        throw error
    }
    
 },

 analysts_rank: async () => {
    const trueDecisions = await models.Decision.aggregate([
        {
            $lookup: {
                from: 'signals',
                localField: 'signal',
                foreignField: 'signal_number',
                as: 'signal'
            }
        },
        {
            $match: {
                $or:[
                    {
                        $and:[
                            {'signal.status': { $eq: "target"}},
                            {'analyst_decision': { $eq: "confirm"}}
                        ]
                    },
                    {
                        $and:[
                            {'signal.status': { $eq: "stop"}},
                            {'analyst_decision': { $eq: "reject"}}
                        ]
                    }
                ]
            }          
        },
        {
            $group: { _id: '$analyst', true_decisions: { $sum: 1 } }
        }
    ])
  
    const acceptableDecisions = await models.Decision.aggregate([
        {
            $lookup: {
                from: 'signals',
                localField: 'signal',
                foreignField: 'signal_number',
                as: 'signal'
            }
        },
        {
            $match: { 'signal.status': { $ne: "open" } }
        },
        {
            $group: { _id: '$analyst', acceptable_decisions: { $sum: 1 } }
        }
    ])
  
    acceptableDecisions.forEach(record => {
        record.true_decisions = trueDecisions.find(analyst => analyst._id === record._id).true_decisions,
        record.decisions_rate = (trueDecisions.find(analyst => analyst._id === record._id).true_decisions / record.acceptable_decisions) * 100
    })

    acceptableDecisions.sort((a,b) =>{
        return b.decisions_rate - a.decisions_rate
    })
    return acceptableDecisions
    }

}
