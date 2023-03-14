const express = require('express');
const cors = require('cors');
var request = require('request');
const https = require('https');
const path = require('path');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

const app = express();

// app.use(cors());
app.use(express.json());

app.use(express.static(path.resolve(__dirname, "../Frontend/build/")));

app.get("/message", (req, res) => {
  res.json({ message: ''+process.env.API_KEY });
});


app.get('/api/get-data', function(req, res, next) {
  request({
    headers: {'x-functions-key':''+process.env.API_KEY},
    uri: 'https://shipping-data-api.azurewebsites.net/api/get-shipping-data'
  }).pipe(res);
});



app.listen(PORT, () => {
  console.log(`Server is running on port 8000.`+process.env.API_KEY);
});

module.exports = app;