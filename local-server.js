const main = async () => {
  if (process.argv.length < 3) {
    console.log('Invalid Usage');
    return;
  }

  let path = process.argv[2].split('/');

  if (path[path.length - 1] === 'index.js') path = path.join('/');
  if (path[path.length - 1] === 'src') path = path.join('/');
  if (path.length > 1) path = `${path.join('/')}`;
  if (path.length === 1) path = `./functions/${path}/src`;

  // eslint-disable-next-line global-require
  require('dotenv').config({ path: `${path}/../.env` });

  // eslint-disable-next-line import/no-dynamic-require
  const func = await import(`${path}/main.js`);

  const req = {
    method: 'POST',
    body: {
      name: 'test',
      status: 'unregistered',
      owner: null,
      model: null,
      delete: false,
      battery: null,
      carrierName: null,
      signalStrength: null,
      lastSeen: null,
      $id: '650dfa58477e756df9a7',
      $permissions: [],
      $createdAt: '2023-09-22T20:34:32.293+00:00',
      $updatedAt: '2023-09-22T20:34:32.293+00:00',
      $databaseId: 'sms-api',
      $collectionId: 'devices',
    },
    headers: {
      host: '650df9fc0831d:3000',
      'user-agent': 'Appwrite/1.4.3',
      'x-appwrite-trigger': 'event',
      'x-appwrite-event': 'databases.sms-api.collections.devices.documents.650dfa58477e756df9a7.create',
      'x-appwrite-user-id': '64ea7c90df02919e23f1',
      'content-type': 'application/x-www-form-urlencoded',
      connection: 'keep-alive',
      'content-length': '339',
    },
  };

  const res = {
    send(text, status) {
      console.log('[SEND] ', text, status);
    },
    json(obj, status) {
      console.log('[JSON] ', obj, status);
    },
  };

  const log = (...args) => console.log('[LOG] ', ...args);
  const error = (...args) => console.error('[ERR] ', ...args);

  func.default({ req, res, log, error }).then();
};

main();
