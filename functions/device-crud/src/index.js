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
const BASE_DATABASE_ID = '64eb86e3be39b1fca82c';
const MAX_RETRIES = 3;

module.exports = async function (req, res) {
  const client = new sdk.Client();

  // You can remove services you don't use
  // const account = new sdk.Account(client);
  // const avatars = new sdk.Avatars(client);
  const databases = new sdk.Databases(client);
  // const functions = new sdk.Functions(client);
  // const health = new sdk.Health(client);
  // const locale = new sdk.Locale(client);
  // const storage = new sdk.Storage(client);
  // const teams = new sdk.Teams(client);
  // const users = new sdk.Users(client);

  if (!req.variables['APPWRITE_FUNCTION_ENDPOINT'] || !req.variables['APPWRITE_FUNCTION_API_KEY']) {
    console.warn('Environment variables are not set. Function cannot use Appwrite SDK.');
    return res.json('env not set', 500);
  }

  client
    .setEndpoint(req.variables['APPWRITE_FUNCTION_ENDPOINT'])
    .setProject(req.variables['APPWRITE_FUNCTION_PROJECT_ID'])
    .setKey(req.variables['APPWRITE_FUNCTION_API_KEY'])
    .setSelfSigned(true);

  const event = req.variables['APPWRITE_FUNCTION_EVENT'].split('.').pop();

  const { $id: deviceId, owner } = JSON.parse(req.variables['APPWRITE_FUNCTION_EVENT_DATA']);
  if (!deviceId || !owner) return res.json('no deviceId or userId', 400);

  switch (event) {
    case 'create':
      await databases.createCollection(BASE_DATABASE_ID, deviceId, `device_${deviceId}`, [
        sdk.Permission.read(sdk.Role.any()),
        // sdk.Permission.read(sdk.Role.user('app_event_listner')), // event listner user
        // sdk.Permission.read(sdk.Role.user(owner)),
        // sdk.Permission.create(sdk.Role.user(owner)),
        // sdk.Permission.write(sdk.Role.user(owner)),
        // sdk.Permission.update(sdk.Role.user(owner)),
        // sdk.Permission.delete(sdk.Role.user(owner)),
      ]);

      const { enabled } = await databases.updateCollection(BASE_DATABASE_ID, deviceId, `device_${deviceId}`, [], false, true);

      if (!enabled) res.send('Something went Wrong', 500);

      await Promise.all([
        databases.createStringAttribute(BASE_DATABASE_ID, deviceId, 'text', 160, true),
        databases.createStringAttribute(BASE_DATABASE_ID, deviceId, 'to', 11, true),
        databases.createEnumAttribute(BASE_DATABASE_ID, deviceId, 'status', ['pending', 'success', 'failed'], false, 'pending'),
        databases.createIntegerAttribute(BASE_DATABASE_ID, deviceId, 'retries', false, 0, MAX_RETRIES, 0),
      ]);
      return res.json({
        areDevelopersAwesome: true,
      });

    case 'delete':
      await databases.deleteCollection(BASE_DATABASE_ID, deviceId);
      return res.json({
        areDevelopersAwesome: true,
      });
  }
  res.send('Something went Wrong !!', 500);
};
