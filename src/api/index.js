import { Router } from 'express';
import beta from './routes/beta.js';
import system from './routes/system.js';

export default () => {
    const app = Router();
    system(app);
    beta(app);

    return app;
};
