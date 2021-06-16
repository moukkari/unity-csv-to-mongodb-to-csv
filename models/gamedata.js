const mongoose = require('mongoose')

//const gameDataSchema =  mongoose.Schema({}, {strict: false})

const gameDataSchema = mongoose.Schema({
  unknown1: Number, // 0
  row: Number, // 0-35
  MMSI: Number, // 123456789
  IMO: Number, // 1234567
  name: String, // M/V Canary
  callsign: String, // V7TC3
  type: String, // Cargo
  generalClass: String, // All Other Activities
  individualClass: String, // Chemical Carrier
  draught: Number, // 12.00
  length: Number, // 100.00
  beam: Number, //15.00
  status: String, // UnderWayUsingEngine
  xPos: Number, // position 8.58
  yPos: Number, // position
  zPos: Number, // position
  rateOfTurn: Number, // -13.86
  speed: Number, // 15.42
  speedOverGround: Number,
  longitude: Number,
  latitude: Number,
  courseOverGround: Number, // 9.31
  trueHeading: Number, // 359.28
  trueBearing: Number,
  timestamp: String, // 29/04/2021 08:30:54
  ETAUTC: String, // MM/DD hh:mm
  distanceToPath: Number, // 0.00
  passStatus: Number // 1
})

gameDataSchema.set('toObject', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('GameData', gameDataSchema)