import { Client, Databases, Permission, Role } from 'node-appwrite';

// This is your Appwrite function
// It's executed each time we get a request
export default async ({ req, res, log, error }) => {
  if (!process.env.APPWRITE_FUNCTION_ENDPOINT || !process.env.APPWRITE_FUNCTION_API_KEY) {
    error('Environment variables are not set. Function cannot use Appwrite SDK.');
    return res.send('Environment variables are not set. Function cannot use Appwrite SDK.', 500);
  }

  const client = new Client()
    .setEndpoint(process.env.APPWRITE_FUNCTION_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  log(client);
  log(req.bodyRaw); // Raw request body, contains request data
  log(JSON.stringify(req.body)); // Object from parsed JSON request body, otherwise string
  log(JSON.stringify(req.headers)); // String key-value pairs of all request headers, keys are lowercase
  log(req.scheme); // Value of the x-forwarded-proto header, usually http or https
  log(req.method); // Request method, such as GET, POST, PUT, DELETE, PATCH, etc.
  log(req.url); // Full URL, for example: http://awesome.appwrite.io:8000/v1/hooks?limit=12&offset=50
  log(req.host); // Hostname from the host header, such as awesome.appwrite.io
  log(req.port); // Port from the host header, for example 8000
  log(req.path); // Path part of URL, for example /v1/hooks
  log(req.queryString); // Raw query params string. For example "limit=12&offset=50"
  log(JSON.stringify(req.query));

  log('----------------------------------------------------------------------');

  if (req.method !== 'POST') return res.json({ error: 'Something went Wrong !!' }, 500);
  const event = req.headers['x-appwrite-event'].split('.').pop();

  const { $id: deviceId, owner } = req.body;
  log(owner, owner, event);

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

      return res.json({ areDevelopersAwesome: true }, 200);

    // INFO: already deleted in manual clean up funciton saved for future reference
    // case 'delete':
    //   await databases.deleteCollection(BASE_DATABASE_ID, deviceId);
    //   return res.json({
    //     areDevelopersAwesome: true,
    //   });
  }
  return res.json({ error: 'Something went Wrong !!' }, 500);
};
