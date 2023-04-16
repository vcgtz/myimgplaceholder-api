/* eslint-disable import/first */
import * as dotenv from 'dotenv';
dotenv.config();
import Server from './Server';

(() => {
  const server = new Server();

  server.run()
    .then(() => {
      console.log('Server started');
    })
    .catch((error) => {
      console.error(error);
    });
})();
