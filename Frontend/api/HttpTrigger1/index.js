const fetch = require("node-fetch"); // 1

module.exports = async function (context, req) {

    // const url = 'https://shipping-data-api.azurewebsites.net/api/get-shipping-data';
    // const headers = {
    //     'accept': 'application/json',
    //     'x-functions-key': ""+process.env.API_KEY
    // };

    try {

    const response = await fetch("https://shipping-data-api.azurewebsites.net/api/get-shipping-data", {
        method: "GET",
        headers: {
          'accept': 'application/json',
          'x-functions-key': ""+process.env.API_KEY
        },
      }
      );

    const body = await response.json();
    context.res.json(body)

} catch (error) {
    if (error.name === 'AbortError') {
        context.res.json({error: 'request was aborted'});
    }else{
    context.res.json({error: 'request was aborted'});
    }
}

    // await fetch(url, { headers }) // 3
    //     .then(response => response.json())
    //     .then(response => context.res.json(response)); // 4

}