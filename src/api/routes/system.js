import { Router } from 'express';

const route = Router();

export default app => {
    app.use('/', route);

    route.get('/', (req, res) => {
        res.send({ message: 'Hello world' });
    });

    route.get('/healthz', (req, res) => {
        res.json({ message: 'Alright Alright Alright !!!' });
    });
};
