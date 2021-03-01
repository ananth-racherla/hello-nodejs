import bodyParser from 'body-parser';
import cors from 'cors';
import routes from '../api/index.js';
import {errors} from 'celebrate';
import promBundle from 'express-prom-bundle';

export default app => {
    // Body parser middleware transforms req.body string to json
    app.use(bodyParser.json());

    // Default cors config allows all origins
    app.use(cors());

    // Configure prometheus metrics
    const metricsMiddleware = promBundle({includeMethod: true});
    app.use(metricsMiddleware);

    // Use application routes
    app.use('/', routes());

    // 404 Error Handler
    app.use((req, res, next) => { // matches all routes & methods
        res.status(404).send({
            error: 'Not Found'
        });
    });

    // Handle input validation errors from celebrate middlware function
    app.use(errors());

    // Generic error handler for all errors
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.json({
            errors: {
                message: err.message
            }
        });
    });
};
