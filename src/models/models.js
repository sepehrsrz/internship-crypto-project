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


const Market = mongoose.model('Market', marketSchema)

const models = { Market }

module.exports = models
