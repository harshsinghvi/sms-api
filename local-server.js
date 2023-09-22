if (process.argv.length < 3) {
  console.log('Invalid Usage');
  process.exit();
}

const fs = require('fs');
const dotenv = require('dotenv');

let path = process.argv[2].split('/');

if (path[path.length - 1] === 'index.js') path = path.join('/');
if (path[path.length - 1] === 'src') path = path.join('/');
if (path.length > 1) path = `${path.join('/')}`;
if (path.length === 1) path = `./functions/${path}/src`;

// eslint-disable-next-line import/no-dynamic-require
const func = require(path);

// eslint-disable-next-line import/no-dynamic-require
const customReq = fs.existsSync(`${path}/../req.js`) ? require(`${path}/../req.js`) : {};

const req = {
  headers: {},
  payload: {},
  variables: {
    ...process.env, // add env vars
    // custom
    SMS_DATABSE_ID: 'asdasd',
    DEVICES_COLLECTION_ID: 'asd',
    // // Creds
    // APPWRITE_FUNCTION_ENDPOINT: 'https://cloud.appwrite.io/v1',
    // APPWRITE_FUNCTION_API_KEY:
    //   '3e26e32b03a54ea17d0a1a196eab4cf572c7c35a953b07b5de6c9f46962f408da9d8dd108f6d40aafaf42f441a79772e75d619782aea4cda95aac62e017b661283d082a49f36496ad3ba79930727f674fece61ef76dffcf8258ea13b942679987a407c0f84095bde6baa76a0bd0f46d25a37913c6ee613cb7660f0c614814ae9',

    // default
    APPWRITE_FUNCTION_ID: '',
    APPWRITE_FUNCTION_NAME: '',
    APPWRITE_FUNCTION_DEPLOYMENT: '',
    APPWRITE_FUNCTION_TRIGGER: '',
    APPWRITE_FUNCTION_RUNTIME_NAME: '',
    APPWRITE_FUNCTION_RUNTIME_VERSION: '',
    APPWRITE_FUNCTION_EVENT: '',
    APPWRITE_FUNCTION_EVENT_DATA: '',
    APPWRITE_FUNCTION_DATA: '',
    APPWRITE_FUNCTION_USER_ID: '',
    APPWRITE_FUNCTION_JWT: '',
  },
  ...customReq,
};

const res = {
  send(text, status) {
    console.log(text, status);
  },
  json(obj, status) {
    console.log(obj, status);
  },
};

func(req, res).then();
