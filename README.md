# SMS API (WIP)

> work in progress, feel free to contribute

![Arch](/docs/SMS_API.png)

TODOs

- [ ] upgrade functions [https://appwrite.io/docs/functions-develop#upgrade](https://appwrite.io/docs/functions-develop#upgrade)
- [ ] update local-server.js
- [ ] add cicd to appwrite functions

- [x] remove hardcoded ids form code
- [x] sort device list on bases of dates
- [x] express api server
- [x] vercel deployment
- [x] change deployment branches (vercel)

- [ ] update react
- [ ] pagination in db querries
- [ ] dashboard stats

- [ ] send sms ui
- [ ] landing page + documentation
- [ ] remove material kit branding
- [ ] new device forms
- [ ] logo
- [ ] loader
- [ ] modals

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

## Prettfy all code

- `prettier --write "./**/*.{js,jsx,json,css}"`

## Credits

- Dashboard Design [https://github.com/minimal-ui-kit/material-kit-react](https://github.com/minimal-ui-kit/material-kit-react)
- AppWrite docs [https://appwrite.io/docs](https://appwrite.io/docs)
- SVG [https://www.veryicon.com/icons/miscellaneous/generic-icon/ic_-document.html](https://www.veryicon.com/icons/miscellaneous/generic-icon/ic_-document.html)
- dashboard templates [https://mui.com/store/collections/free-react-dashboard/](https://mui.com/store/collections/free-react-dashboard/)
