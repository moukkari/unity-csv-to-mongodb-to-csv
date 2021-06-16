const express = require('express')
const app = express()
const port = 3000
require('./mongo')
const GameData = require('./models/gamedata')
const multer = require('multer')
const upload = multer()
const fs = require('fs')
const path = require('path')

const headers = [
  'unknown1', // 0
  'row', // 0-35
  'MMSI', // 123456789
  'IMO', // 1234567
  'name', // M/V Canary
  'callsign', // V7TC3
  'type', // Cargo
  'generalClass', // All Other Activities
  'individualClass', // Chemical Carrier
  'draught', // 12.00
  'length', // 100.00
  'beam', //15.00
  'status', // UnderWayUsingEngine
  'xPos', // position 8.58
  'yPos', // position
  'zPos', // position
  'rateOfTurn', // -13.86
  'speed', // 15.42
  'speedOverGround',
  'longitude',
  'latitude',
  'courseOverGround', // 9.31
  'trueHeading', // 359.28
  'trueBearing',
  'timestamp', // 29/04/2021 08:30:54
  'ETAUTC', // MM/DD hh:mm
  'distanceToPath', // 0.00
  'passStatus' // 1
]

app.post('/upload', upload.single('file'), async (req, res) => {
  // req.file is the `uploadCsv` file 
  // req.body will hold the text fields, if there were any 
  console.log('working')
  
  if (req.file) {
    console.log('yes, a file')
    try {
      let csv = req.file.buffer.toString('utf8')

      console.log('test', req.file)

      csv = csv.replace(/(\r)/gm, '')

      const split = csv.split('\n')

      let count = 0;
      for (data of split) {
        let doc = data.split(',')
        if (doc.length > 1) {
          let obj = {}
          for (let x = 0; x < doc.length; x++) {
            obj[headers[x]] = doc[x]
          }
          let data = new GameData(obj)
          await data.save()
          count++
        } else {
          console.log('discarded', doc)
        }
      }
      console.log(`inserted ${count} values`)
      res.status(200)
      res.send(`inserted ${count} values to database`)
    } catch (e) {
      res.status(500)
      res.send(`error uploading data`)
    }
  } else {
    res.status(400)
    res.send('no body or file')
  }
})

app.get('/data', async (req, res) => {
  const data = await GameData.find({})
  res.send(data)
})

app.get('/download', async (req, res) => {
  const data = await GameData.find({})

  let longString = ''

  for (let obj of data) {
    Object.entries(obj).forEach(([key, value]) => {
      if (key === '_doc') {
        Object.entries(value).forEach(([key, value]) => {
          if (key !== '_id') {
            longString += value + ','
          }
        })
        longString = longString.slice(0, -1)
        longString += '\n'
      }
    })
  }
  console.log(longString)

  try {
    fs.writeFile('public/data.csv', longString, async (err) => {
      if (err) throw err
      console.log('Saved!');
      try {
        await res.sendFile('public/data.csv', { root: path.join(__dirname) }, (err) => {
          if (err) {
            console.log(err)
          } else {
            console.log('sent')
          }
        })
      } catch(e) {
        console.log('errori', e)
      }
      
    })
  } catch(e) {
    console.log('e', e)
  }
  
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})