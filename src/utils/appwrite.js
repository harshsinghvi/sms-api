import { Client, Account, Databases, Avatars, ID, Permission, Role, Query } from 'appwrite';
import { DEVICES_COLLECTION_ID, ERRORS, SMS_DATABSE_ID } from './constants';

if (!process.env.REACT_APP_APPWRITE_URL || !process.env.REACT_APP_APPWRITE_PROJECT_ID) throw new Error(ERRORS.AW_CREDS_NOT_FOUND);

export const client = new Client();

client.setEndpoint(process.env.REACT_APP_APPWRITE_URL).setProject(process.env.REACT_APP_APPWRITE_PROJECT_ID);

export const account = new Account(client);

export const databases = new Databases(client);

export const avatars = new Avatars(client);

export const logOut = async (callback) => {
  const { $id: sessionId } = await account.getSession('current');
  await account.deleteSession(sessionId);
  callback();
};

export const getDevices = async () => {
  const { documents: devices } = await databases.listDocuments(SMS_DATABSE_ID, DEVICES_COLLECTION_ID, [Query.equal('delete', false)]);

  devices.sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt));

  console.log(devices);
  return devices;
};

export const addDevice = async (userId) => {
  const device = await databases.createDocument(
    SMS_DATABSE_ID,
    DEVICES_COLLECTION_ID,
    ID.unique(),
    {
      name: prompt('Device Name'),
      // for debuging
      // model: prompt('model'),
      // battery: prompt('Battery'),
      // carrierName: prompt('carrierName'),
      // signalStrength: prompt('signalStrength'),

      model: 'Android',
      battery: 100,
      carrierName: 'Jio',
      signalStrength: 50,

      owner: userId,
      delete: false,
    },
    [Permission.read(Role.user(userId)), Permission.update(Role.user(userId))]
  );

  console.log(device);
  return device;
};

export const deleteDevice = async (id) => {
  await databases.updateDocument(SMS_DATABSE_ID, DEVICES_COLLECTION_ID, id, {
    delete: true,
  });
};
