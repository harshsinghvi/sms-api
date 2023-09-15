import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { handleErrors } from './errorHandler';

(async () => {
  // eslint-disable-next-line global-require
  require('dotenv').config();

  // eslint-disable-next-line global-require, import/no-unresolved
  const router = require('./routes');

  const PORT = process.env.PORT || 5050;

  const app = express();

  // to prevent clickjacking
  app.use((req, res, next) => {
    res.set('X-Frame-Options', 'DENY');
    next();
  });

  // to prevent Browser content sniffing
  app.use((req, res, next) => {
    res.set('X-Content-Type-Options', 'nosniff');
    next();
  });

  // for HSTS
  app.use((req, res, next) => {
    res.set('Strict-Transport-Security', 'max-age=31536000; includeSubdomains; preload');
    next();
  });
  app.use(bodyParser.text());
  app.use(bodyParser.raw());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(cors());
  app.use(
    bodyParser.json({
      limit: '20mb',
    })
  );

  app.use('/api', router);

  app.use(express.static(path.join(__dirname, '..', 'build')));

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
  });

  // Error handelling
  app.use(handleErrors);

  // TODO-Phase2: Uncomment when socket-io is needed
  // io.use(handleSocketAuth);
  // io.on('connection', handleSocketConnections);

  app.listen(PORT, () => console.log(`Listening on port ${PORT}`))

  // To catch all uncaught exceptio
  if (process.env.NODE_ENV !== 'developemnt') {
    process.on('uncaughtException', (err) => {
      // TODO: webhook
      console.error(err);
      console.log('Node NOT Exiting...');
    });
  }
})();
