const express = require('express');
const cors = require('cors');
var request = require('request');
const https = require('https');

const app = express();

app.use(cors());
app.use(express.json());

// const options = {
//   hostname: 'shipping-data-api.azurewebsites.net',
//   port: 443,
//   path: '/api/get-shipping-data',
//   method: 'GET',
//   headers: {
//   'accept': 'application/json',
//   'x-functions-key': 
//   },
// };

// const req = https.request(options, res => {
//   console.log(`statusCode: ${res.statusCode}`);

//   res.on('data', d => {
//     process.stdout.write(d);
//   });
// });

// req.on('error', error => {
//   console.error(error);
// });


app.get('/', function(req, res, next) {
  request({
    uri: 'https://shipping-data-api.azurewebsites.net/api/get-shipping-data?code=wbZSAG9uF_QA_fFqaJOrzlMYmf_pV1oUqNX5fRuh9TXbAzFukRXm7g=='
    // qs: {
    //   api_: 'wbZSAG9uF_QA_fFqaJOrzlMYmf_pV1oUqNX5fRuh9TXbAzFukRXm7g==',
    //   // query: 'World of Warcraft: Legion'
    // }
  }).pipe(res);
});

// const got = require('got');
// const { pipeline } = require('stream');

// app.get('/', function(req, res) {
//   const dataStream = got.stream({
//       uri: 'https://shipping-data-api.azurewebsites.net/api/get-shipping-data',
//       qs: {
//         api_key: 'wbZSAG9uF_QA_fFqaJOrzlMYmf_pV1oUqNX5fRuh9TXbAzFukRXm7g=='
//       }
//   });
//   pipeline(dataStream, res, (err) => {
//       if (err) {
//           console.log(err);
//           res.sendStatus(500);
//       }
//   });
// });



app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});

module.exports = app;