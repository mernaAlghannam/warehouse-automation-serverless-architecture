module.exports = async function (context, req) {
  var documents = context.bindings.documents;

  context.res = {
      // status: 200, /* Defaults to 200 */
      //TODO: additional testing
      body: "sucessfully added data into cosmodb database"
};
}