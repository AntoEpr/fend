//Setup server
const express = require('express')
var app = express()
const cors = require('cors')
app.use(cors())
const dotenv = require('dotenv')
dotenv.config()
var path = require('path')
const mockAPIResponse = require('./mockAPI.js')
const aylien = require('aylien_textapi')
var app = express()

var textapi = new aylien({
    application_key: process.env.API_KEY
  })

const app = express()

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})
