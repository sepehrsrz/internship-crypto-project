const Binance = require('binance-api-node').default
const mongoose = require('mongoose')
const models = require('./models')

const now = new Date().getTime()
const step = 86400 * 1000 * 1000 // 24hr * 1000 day * 1000 ms
const client = Binance()

async function get_data(symbol = "BTCUSDT", interval = '1d', startTime = 0 , endTime = 0){
  const limit = 1000;
  const start_time = (startTime < 1501545600000) ? 1501545600000 : startTime;
  const end_time = (endTime >= now || endTime < start_time) ? now : endTime;
  let records = []

  var time = start_time;

  do{
    const record = await client.candles({
      symbol,
      interval,
      startTime: time,
      endTime: time+step,
      limit
      }).then(all => {
        const edit_record = all.map(rec => {
          rec.pair = symbol,
          rec.timeframe = interval
          return rec
        })
        return edit_record
      })
  
    records = records.concat(record)
    
    time += step

  }while(time < end_time)
  return records
}

const connectDB = async () => {
  console.log('Please wait for database to be updated')
  await models.Market.deleteMany({})
  await get_data().then(async records => {
  await models.Market.insertMany(records)
  })
}

connectDB().then(() => {
  console.log('Database updated successfully')
})




