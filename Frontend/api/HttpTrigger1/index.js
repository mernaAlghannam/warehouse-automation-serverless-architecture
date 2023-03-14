const fetch = require("node-fetch"); // 1

module.exports = async function (context, req) {

    const url = 'https://shipping-data-api.azurewebsites.net/api/get-shipping-data';
    const headers = {
        'x-functions-key': api_key
    };

    await fetch(url, { headers }) // 3
        .then(response => response.json())
        .then(response => context.res.json(response)); // 4

}