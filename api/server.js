require('@babel/register')({
  presets: ['@babel/env'],
});
require('regenerator-runtime/runtime');
// Import the rest of our application.
const app = require('.');

module.exports = app;

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// To catch all uncaught exceptio
if (process.env.NODE_ENV !== 'developemnt') {
  process.on('uncaughtException', (err) => {
    // TODO: webhook
    console.error(err);
    console.log('Node NOT Exiting...');
  });
}
