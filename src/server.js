import {
  PORT,
  HOST,
} from '../configs/serverConfig.js';

import app from './app.js';

const server = app.listen(PORT, () => {
  console.log(
    `Local is runnig : http://${HOST}:${PORT}`
  );
});

export default server;
