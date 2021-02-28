import express from 'express';

import config from './config/index.js';
import mongoose from './bootstrap/mongoose.js';
import expressApp from './bootstrap/express.js';


async function init() {
  await mongoose();

  const app = express();
  expressApp(app);

  app.listen(config.port, () => {
    console.log(`Server listening on port ${config.port}`);
  });
}

init();
