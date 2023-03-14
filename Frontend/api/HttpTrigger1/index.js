const https = require("https"); // 1
  
// Sample URL

module.exports = async function (context, req) {


    const url = 'https://shipping-data-api.azurewebsites.net/api/get-shipping-data?code='+process.env.API_KEY;
    const responsebody = {}
  
    const request = https.request(url, (response) => {
        let data = '';
        response.on('data', (chunk) => {
            data = data + chunk.toString();
        });
    
        response.on('end', () => {
            const body = JSON.parse(data);
            responsebody = body;
        });
    })
    
    const error = "an error"
    request.on('error', (error) => {
        error = error;
    });
    
    request.end() 

    context.res.json(error);

}