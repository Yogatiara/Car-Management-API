require('dotenv').config();

const { PORT, HOST } = process.env;

if (!PORT) {
  throw new Error('Port is required');
} else if (!HOST) {
  throw new Error('Host is required');
}

module.exports = {
  PORT,
  HOST,
};
