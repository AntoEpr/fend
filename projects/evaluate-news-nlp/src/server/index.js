const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mockAPIResponse = require('./mockAPI.js')
const fetch = require ('node-fetch')
// Load environment variable from .env file
dotenv.config();

const app = express();

// Middleware
app.use(cors());
const bodyParser = require('body-parser')
app.use(express.static('dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

console.log(__dirname);

// Serve service-worker.js
app.get('/service-worker.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'service-worker.js'));
});

app.get('/test', function(req,res){
  res.send(mockAPIResponse)
})

//api
const baseURL = "https://api.meaningcloud.com/sentiment-2.1";
const apiKey = process.env.API_KEY;

app.post('/add', async (req, res) => {
  //generates the api url, which we retrieve the url input from the handleSubmit 
  const data = req.body;
  //it also fetches the url data
  const apiURL = await fetch(`${baseURL}?key=${apiKey}&url=${data.url}&lang=en`, {method : "POST"});
  console.log(`Input url: ${data.url}`)

  //try convert the url data into a json and send, otherwise catch the error
  try{
      const result = await apiURL.json();
      res.send(result);

  }catch(error){
      console.log("error", error);
  }
});