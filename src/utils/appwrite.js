import { Client, Account, Databases, Avatars, ID, Permission, Role, Query } from 'appwrite';
import { ERRORS } from './constants';

if (
  !process.env.REACT_APP_APPWRITE_URL ||
  !process.env.REACT_APP_APPWRITE_PROJECT_ID
  // || !process.env.REACT_APP_APPWRITE_API_KEY
)
  throw new Error(ERRORS.AW_CREDS_NOT_FOUND);

export const client = new Client();

client.setEndpoint(process.env.REACT_APP_APPWRITE_URL).setProject(process.env.REACT_APP_APPWRITE_PROJECT_ID);
// .setKey(process.env.REACT_APP_APPWRITE_API_KEY);

export const account = new Account(client);

export const databases = new Databases(client);

export const avatars = new Avatars(client);

export const logOut = async (callback) => {
  const { $id: sessionId } = await account.getSession('current');
  await account.deleteSession(sessionId);
  callback();
};

export const getDevices = async () => {
  const { documents: devices } = await databases.listDocuments('64eb86e3be39b1fca82c', '64eb87b42cf58f11232c', [
    Query.equal('delete', false),
    // Query.equal('delete', null),
  ]);

  devices.sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt));

  console.log(devices);
  return devices;
};

export const addDevice = async (userId) => {
  const device = await databases.createDocument(
    '64eb86e3be39b1fca82c',
    '64eb87b42cf58f11232c',
    ID.unique(),
    {
      name: prompt('Device Name'),
      model: prompt('model'),
      battery: prompt('Battery'),
      carrierName: prompt('carrierName'),
      signalStrength: prompt('signalStrength'),

      // model: 'Android',
      // battery: 100,
      // carrierName: 'JIO',
      // signalStrength: 50,

      owner: userId,
      delete: false,
    },
    [Permission.read(Role.user(userId)), Permission.update(Role.user(userId))]
  );

  console.log(device);
  return device;
};

export const deleteDevice = async (id) => {
  await databases.updateDocument('64eb86e3be39b1fca82c', '64eb87b42cf58f11232c', id, {
    delete: true,
  });
};
