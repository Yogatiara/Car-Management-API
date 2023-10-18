const {
  PORT,
  HOST,
} = require('../configs/serverConfig.js');

const app = require('./app.js');

const server = app.listen(PORT, () => {
  console.log(
    `Local is runnig : http://${HOST}:${PORT}`
  );
});

module.exports = server;
