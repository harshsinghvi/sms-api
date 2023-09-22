# SMS API (WIP)

> work in progress, feel free to contribute

![Arch](/docs/SMS_API.png)

TODOs

- loader
- modals
- pagination in db querries
- send sms ui
- sort device list on bases of dates
- landing page + documentation
- new device forms
- express api server
- vercel deployment
- remove material kit branding
- logo
- dashboard stats

## ENV Vars

```.env
# Server
PORT=5000
NODE_ENV=development

# Client
REACT_APP_APPWRITE_URL=
REACT_APP_APPWRITE_PROJECT_ID=
```

## Execute functions on Appwrite or locally

- `node local-server.js <function-name>`
- or `yarn run aw-function ./function/<function-name>`
- or `yarn run aw-function <function-name>`

## Future Features

- Load balancing,
- device group/pool and sharing,
- access sharing,
- per device limits
- remote MDM for android, (for management of devices)
- multi sim support
- **+ collection**`dashboard-stats` cache for dashboard stats
- **+ function** `get-dashboard-stats` for calculating dashboard stats

## Credits

- Dashboard Design [https://github.com/minimal-ui-kit/material-kit-react](https://github.com/minimal-ui-kit/material-kit-react)
- AppWrite docs [https://appwrite.io/docs](https://appwrite.io/docs)
- SVG [https://www.veryicon.com/icons/miscellaneous/generic-icon/ic_-document.html](https://www.veryicon.com/icons/miscellaneous/generic-icon/ic_-document.html)
- dashboard templates [https://mui.com/store/collections/free-react-dashboard/](https://mui.com/store/collections/free-react-dashboard/)
