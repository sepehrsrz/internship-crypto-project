const mongoose = require('mongoose')

const marketSchema = new mongoose.Schema({
  pair: String,
  timeframe: String,
  openTime: Number,
  open: Number,
  high: Number,
  low: Number,
  close: Number,
  volume: Number,
  closeTime: Number,
  quoteVolume : Number,
  trades: Number,
  baseAssetVolume : Number,
  quoteAssetVolume : Number
      
});

const signalSchema = new mongoose.Schema({
  signal_number: {
      type: Number,
      required: 'This field is required'
  },
  status: {
      type: String,
      required: 'This field is required',
      enum: ['open', 'target', 'stop']
  },

})

const decisionSchema = new mongoose.Schema({
  analyst: {
      type: Number,
      required: 'This field is required'
  },
  signal: {
      type: Number,
      required: 'This field is required'
  },
  analyst_decision: {
      type: String,   
      enum: ['confirm', 'reject'],
      required: 'This field is required'
  },
  
})

const Market = mongoose.model('Market', marketSchema)
const Signal = mongoose.model("Signal",signalSchema);
const Decision = mongoose.model("Decision",decisionSchema);

const models = { Market, Signal, Decision }

module.exports = models
