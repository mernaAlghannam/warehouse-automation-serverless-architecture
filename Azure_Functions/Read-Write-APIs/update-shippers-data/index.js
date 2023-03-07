module.exports = async function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');

  context.bindings.outputDocument = JSON.stringify([req.body]);

  context.res = {
      body: JSON.stringify(req.body)
  }
};