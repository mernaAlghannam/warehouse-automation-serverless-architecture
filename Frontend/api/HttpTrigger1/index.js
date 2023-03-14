const https = require('https');

module.exports = async function (context, req) {


    const options = {
        hostname: 'shipping-data-api.azurewebsites.net',
        path: '/api/get-shipping-data',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-functions-key': ""+process.env.API_KEY
        },
      };

    // const url = 'https://shipping-data-api.azurewebsites.net/api/get-shipping-data';
    // const headers = {
    //     'x-functions-key': api_key
    // };

    // await https.require(options) // 3
    //     .then(response => response.json())
    //     .then(response => context.res.json(response)); // 4

    await https.get((options), (resp) => {
            let data = '';
          
            // A chunk of data has been received.
            resp.on('data', (chunk) => {
              data += chunk;
            });
          
            // The whole response has been received. Print out the result.
            resp.on('end', () => {
              context.res.json(data);
              console.log(JSON.parse(data).explanation);
            });
          
          }).on("error", (err) => {
            console.log("Error: " + err.message);
          });

}