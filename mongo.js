require('dotenv').config()
const mongoose = require('mongoose')
const uri = `mongodb+srv://tester:${process.env.MONGODB}@cluster0.ojwei.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(uri, 
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })
