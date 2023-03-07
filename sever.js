const { FILE } = require('dns');
const express = require('express');
const request = require('request');
const fetch = require('node-fetch');
const app = express();

// Google Drive URL of the image you want to retrieve
const GAS_URL = 'https://script.google.com/macros/s/AKfycby6DwsjnA7-lpgFT0gELZCcgwcmIWJTVc4ZXQAoDFMvhMUJ6MmArlImc0Br3OlyJ3u7/exec';

// Set response headers
app.get('/image.png', (req, res) => {
    console.log("req")
    let FILE_URL = "";
    try {
      fetch(GAS_URL)
      .then((response) => response.json())
      .then((data) => {
          res.setHeader('Content-Type', 'image/png');
          res.setHeader('Content-Disposition', `inline; filename="image.png"`);
      
          // Pipe the image data to the response
          request.get(`http://drive.google.com/uc?export=view&id=${data.id}`).pipe(res);
      })}
    catch(error) {
      res.setHeader('Content-Type', 'image/png');
      res.setHeader('Content-Disposition', `inline; filename="image.png"`);
      console.error(error);
      // Pipe the image data to the response
      request.get(`http://drive.google.com/uc?export=view&id=1Ec3FESUZT0QlMRKQ-CyR-orw65j63sp1`).pipe(res);
      }
    }

);
// Start the server
app.listen(process.env.PORT, () => {
  console.log('Server listening on port 3000');
});