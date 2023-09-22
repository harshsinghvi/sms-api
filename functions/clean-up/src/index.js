import { Client, Databases, Query } from 'node-appwrite';

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

// INFO: Change ID
const SMS_DATABSE_ID = 'sms-api';
const DEVICES_COLLECTION_ID = 'devices';

export default async ({ req, res, log, error }) => {
  if (!req.variables['APPWRITE_FUNCTION_ENDPOINT'] || !req.variables['APPWRITE_FUNCTION_API_KEY']) {
    error('Environment variables are not set. Function cannot use Appwrite SDK.');
    return res.send('Environment variables are not set. Function cannot use Appwrite SDK.');
  }

  const client = new Client();
  const database = new Databases(client);
  client
    .setEndpoint(req.variables['APPWRITE_FUNCTION_ENDPOINT'])
    .setProject(req.variables['APPWRITE_FUNCTION_PROJECT_ID'])
    .setKey(req.variables['APPWRITE_FUNCTION_API_KEY'])
    .setSelfSigned(true);

  const markDeletesDocs = await database.listDocuments(SMS_DATABSE_ID, DEVICES_COLLECTION_ID, [Query.select(['$id']), Query.equal('delete', true)]);

  const deleteNullDocs = await database.listDocuments(SMS_DATABSE_ID, DEVICES_COLLECTION_ID, [Query.select(['$id']), Query.isNull('delete')]);

  const deleteKeys = [];

  log(
    'delete key =>',
    markDeletesDocs.documents.map(({ $id }) => {
      deleteKeys.push($id);
      return $id;
    })
  );

  log(
    'null delete key =>',
    deleteNullDocs.documents.map(({ $id }) => {
      deleteKeys.push($id);
      return $id;
    })
  );

  let promises = [];

  for (id of deleteKeys) {
    promises.push(database.deleteCollection(SMS_DATABSE_ID, id).then(() => log(id, '=>', 'Collection deleted')));
    promises.push(database.deleteDocument(SMS_DATABSE_ID, DEVICES_COLLECTION_ID, id).then(() => log(id, '=>', 'Document deleted')));
  }

  await Promise.all(promises);

  res.json({
    areDevelopersAwesome: true,
    promises: promises.length,
    deleteKeys,
  });
};
