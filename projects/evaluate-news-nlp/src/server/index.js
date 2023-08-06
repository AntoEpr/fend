const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mockAPIResponse = require('./mockAPI.js')
const fetch = import('node-fetch');
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

// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// POST route to update projectData
app.post('/data', (req, res) => {
    const newData = req.body;
    projectData.agreement = newData.agreement;
    projectData.subjectivity = newData.subjectivity;
    projectData.confidence = newData.confidence;
    projectData.irony = newData.irony;
    res.send(projectData);
});

// GET route to return projectData
app.get('/all', getALL);

function getALL(req, res) {
    res.status(200).send(projectData);
};