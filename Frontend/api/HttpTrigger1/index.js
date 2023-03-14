const fetch = require("node-fetch"); // 1

module.exports = async function (context, req) {

    const url = 'https://shipping-data-api.azurewebsites.net/api/get-shipping-data';
    const headers = {
        'accept': 'application/json',
        'x-functions-key': ""+process.env.API_KEY
    };

    const response = await fetch(url, {method: 'GET', headers });
    const body = await response.json();

    // await fetch(url, { headers }) // 3
    //     .then(response => response.json())
    //     .then(response => context.res.json(response)); // 4

    context.res.json(response)

}