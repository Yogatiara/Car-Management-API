require('dotenv').config();

require('./src/server.js');

const {
  databaseValidation,
} = require('./configs/databaseConfig.js');

databaseValidation();
