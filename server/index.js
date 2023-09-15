require('@babel/register')({
    presets: ['@babel/env'],
});
require('regenerator-runtime/runtime');
// Import the rest of our application.
module.exports = require('./server');
