const sdk = require('node-appwrite');

/*
  'req' variable has:
    'headers' - object with request headers
    'payload' - request body data as a string
    'variables' - object with function variables

  'res' variable has:
    'send(text, status)' - function to return text response. Status code defaults to 200
    'json(obj, status)' - function to return JSON response. Status code defaults to 200

  If an error is thrown, a response with code 500 will be returned.
*/

module.exports = async function (req, res) {
  if (
    !req.variables['APPWRITE_FUNCTION_ENDPOINT'] ||
    !req.variables['APPWRITE_FUNCTION_API_KEY'] ||
    !req.variables['DEVICES_COLLECTION_ID'] ||
    !req.variables['SMS_DATABSE_ID']
  ) {
    console.warn('Environment variables are not set. Function cannot use Appwrite SDK.');
    return res.send('Environment variables are not set. Function cannot use Appwrite SDK.');
  }

  const { DEVICES_COLLECTION_ID, SMS_DATABSE_ID } = req.variables;

  const client = new sdk.Client();
  const database = new sdk.Databases(client);
  client
    .setEndpoint(req.variables['APPWRITE_FUNCTION_ENDPOINT'])
    .setProject(req.variables['APPWRITE_FUNCTION_PROJECT_ID'])
    .setKey(req.variables['APPWRITE_FUNCTION_API_KEY'])
    .setSelfSigned(true);

  const markDeletesDocs = await database.listDocuments(SMS_DATABSE_ID, DEVICES_COLLECTION_ID, [
    sdk.Query.select(['$id']),
    sdk.Query.equal('delete', true),
  ]);

  const deleteNullDocs = await database.listDocuments(SMS_DATABSE_ID, DEVICES_COLLECTION_ID, [sdk.Query.select(['$id']), sdk.Query.isNull('delete')]);

  const deleteKeys = [];

  console.log(
    'delete key =>',
    markDeletesDocs.documents.map(({ $id }) => {
      deleteKeys.push($id);
      return $id;
    })
  );

  console.log(
    'null delete key =>',
    deleteNullDocs.documents.map(({ $id }) => {
      deleteKeys.push($id);
      return $id;
    })
  );

  // console.log(deleteKeys);

  let promises = [];

  for (id of deleteKeys) {
    promises.push(database.deleteCollection(SMS_DATABSE_ID, id).then(() => console.log(id, '=>', 'Collection deleted')));
    promises.push(database.deleteDocument(SMS_DATABSE_ID, DEVICES_COLLECTION_ID, id).then(() => console.log(id, '=>', 'Document deleted')));
  }

  await Promise.all(promises);

  res.json({
    areDevelopersAwesome: true,
    promises: promises.length,
    deleteKeys,
  });
};
