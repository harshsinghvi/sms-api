const { Client, Databases, Permission, Role } = 'node-appwrite';

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
const BASE_DATABASE_ID = 'sms-api';

export default async ({ req, res, log, error }) => {
  const client = new Client();
  const databases = new Databases(client);

  if (!process.env['APPWRITE_FUNCTION_ENDPOINT'] || !process.env['APPWRITE_FUNCTION_API_KEY']) {
    error('Environment variables are not set. Function cannot use Appwrite SDK.');
    return res.send('Environment variables are not set. Function cannot use Appwrite SDK.', 500);
  }

  client
    .setEndpoint(process.env['APPWRITE_FUNCTION_ENDPOINT'])
    .setProject(process.env['APPWRITE_FUNCTION_PROJECT_ID'])
    .setKey(process.env['APPWRITE_FUNCTION_API_KEY'])
    .setSelfSigned(true);

  // log(req.bodyRaw); // Raw request body, contains request data
  // log(JSON.stringify(req.body)); // Object from parsed JSON request body, otherwise string
  // log(JSON.stringify(req.headers)); // String key-value pairs of all request headers, keys are lowercase
  // log(req.scheme); // Value of the x-forwarded-proto header, usually http or https
  // log(req.method); // Request method, such as GET, POST, PUT, DELETE, PATCH, etc.
  // log(req.url); // Full URL, for example: http://awesome.appwrite.io:8000/v1/hooks?limit=12&offset=50
  // log(req.host); // Hostname from the host header, such as awesome.appwrite.io
  // log(req.port); // Port from the host header, for example 8000
  // log(req.path); // Path part of URL, for example /v1/hooks
  // log(req.queryString); // Raw query params string. For example "limit=12&offset=50"
  // log(JSON.stringify(req.query));

  // return res.send('Something went Wrong !!', 500);
  const event = process.env['APPWRITE_FUNCTION_EVENT'].split('.').pop();

  const { $id: deviceId, owner } = JSON.parse(process.env['APPWRITE_FUNCTION_EVENT_DATA']);
  if (!deviceId || !owner) return res.json('no deviceId or userId', 400);

  switch (event) {
    case 'create':
      await databases.createCollection(BASE_DATABASE_ID, deviceId, `device_${deviceId}`, [Permission.read(Role.any())]);

      // TODO: Check if needed
      // const { enabled } = await databases.updateCollection(BASE_DATABASE_ID, deviceId, `device_${deviceId}`, [], false, true);

      if (!enabled) res.send('Something went Wrong', 500);

      await Promise.all([
        databases.createStringAttribute(BASE_DATABASE_ID, deviceId, 'text', 160, true),
        databases.createStringAttribute(BASE_DATABASE_ID, deviceId, 'to', 11, true),
        databases.createEnumAttribute(BASE_DATABASE_ID, deviceId, 'status', ['pending', 'success', 'failed'], false, 'pending'),
      ]);

      return res.json({
        areDevelopersAwesome: true,
      });

    // INFO: already deleted in manual clean up funciton saved for future reference
    // case 'delete':
    //   await databases.deleteCollection(BASE_DATABASE_ID, deviceId);
    //   return res.json({
    //     areDevelopersAwesome: true,
    //   });
  }
  return res.send('Something went Wrong !!', 500);
};
