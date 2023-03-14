const https = require("https"); // 1

const options = {
    hostname: 'shipping-data-api.azurewebsites.net',
    path: '/api/get-shipping-data',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-functions-key': ""+process.env.API_KEY
    },
  };

/**
 * Do a request with options provided.
 *
 * @param {Object} options
 * @return {Promise} a promise of request
 */
function doRequest(options) {
    return new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        res.setEncoding('utf8');
        let responseBody = '';
  
        res.on('data', (chunk) => {
          responseBody += chunk;
        });
  
        res.on('end', () => {
          resolve(JSON.parse(responseBody));
        });
      });

      req.on('error', (err) => {
        reject(err);
      });
  
      req.end();
      
    });
  }
  

module.exports = async function (context, req) {

    const presponse = await doRequest(options); 

    context.res.json(presponse);

}