module.exports = async function (context, req) {
  var documents = context.bindings.documents;
  context.log('Shippers complete information '+ JSON.stringify(documents));

  context.res = {
      // status: 200, /* Defaults to 200 */
      body: JSON.stringify(documents)
};
}