const express = require('express');
const cors = require('cors');
var request = require('request');
const https = require('https');

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(process.cwd()+"/Frontend/build/"));

app.get("/message", (req, res) => {
  res.json({ message: ''+process.env.REACT_APP_NOT_SECRET_CODE });
});


app.get('/', function(req, res, next) {
  request({
    headers: {'x-functions-key':''+process.env.apikey},
    uri: 'https://shipping-data-api.azurewebsites.net/api/get-shipping-data'
  }).pipe(res);
});



app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});

module.exports = app;