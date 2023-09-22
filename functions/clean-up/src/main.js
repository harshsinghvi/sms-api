import { Client, Databases, Query } from 'node-appwrite';

const SMS_DATABSE_ID = 'sms-api';
const DEVICES_COLLECTION_ID = 'devices';

export default async ({ req, res, log, error }) => {
  console.log(process.env);
  try {
    if (!process.env.APPWRITE_FUNCTION_ENDPOINT || !process.env.APPWRITE_FUNCTION_API_KEY) {
      error('Environment variables are not set. Function cannot use Appwrite SDK.');
      return res.send('Environment variables are not set. Function cannot use Appwrite SDK.', 500);
    }

    const client = new Client()
      .setEndpoint(process.env.APPWRITE_FUNCTION_ENDPOINT)
      .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
      .setKey(process.env.APPWRITE_FUNCTION_API_KEY);

    const database = new Databases(client);

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

    for (let id of deleteKeys) {
      promises.push(database.deleteCollection(SMS_DATABSE_ID, id).then(() => log(id, '=>', 'Collection deleted'))).catch(error);
      promises.push(
        database
          .deleteDocument(SMS_DATABSE_ID, DEVICES_COLLECTION_ID, id)
          .then(() => log(id, '=>', 'Document deleted'))
          .catch(error)
      );
    }

    await Promise.all(promises);

    res.json({
      areDevelopersAwesome: true,
      promises: promises.length,
      deleteKeys,
    });
  } catch (err) {
    error(err);
    return res.json({ error: 'Something went Wrong !!' }, 500);
  }
};
