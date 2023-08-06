const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variable from .env file
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.static('dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log(__dirname);

// Serve service-worker.js
app.get('/service-worker.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'service-worker.js'));
});

// Validate input middleware function
function validateInputRequest(req, res, next) {
  if (!req.body.text) {
    // Check for input validation
    return res.status(400).json({
      message: 'Invalid input'
    });
  }
  return next();
}
// Aylien Text API integration for sentiment analysis
const aylien = require('aylien_textapi');
const textapi = new aylien({
  application_key: process.env.APP_KEY
});

// PostHandler function
function PostHandler(req, res, next) {
    textapi.sentiment({
      url: req.body.text
    }, function (error, response) {
      if (error) {
        // Handle error if sentiment analysis fails
        console.error('Sentiment Analysis Error:', error);
        res.status(500).json({ error: 'Sentiment analysis failed.' });
      } else {
        // Send the sentiment analysis result as JSON response
        res.status(200).json(response);
      }
    });
  }
// Apply the middleware and handler to the route
app.post('/article', validateInputRequest, PostHandler);

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});