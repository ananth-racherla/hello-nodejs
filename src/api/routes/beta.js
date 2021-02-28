import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { asyncErrorHandler } from '../middleware/asyncErrorHandler.js';
import * as betaService from '../../services/beta.js'

const route = Router();

export default app => {
    // Path prefix for all routes in this module is /beta
    app.use('/beta', route);

    /**
     * POST /beta/register
     * Allow developers to register for product betas. The API can be invoked anonymously.
     * Required fields: firstName, email
     */
    route.post('/register', celebrate({
        body: Joi.object({
            firstName: Joi.string().required(),
            lastName: Joi.string().optional(),
            email: Joi.string().required(),
            twitter: Joi.string().optional(),
            instagram: Joi.string().optional(),
            location: Joi.string().optional(),
            devEnvironment: Joi.string().optional()
        }),
    }), asyncErrorHandler(async (req, res) => {
        const user = req.body;
        await betaService.register(user);
        res.json({});
    }));

    /**
     * GET /beta/getUserList
     * Allow authenticated users to retrieve a list of beta registrants
     * Optional parameters: offset, limit
     */
    route.get('/getUserList', celebrate({
        query: {
            offset: Joi.number().min(0).default(0),
            limit: Joi.number().min(1).max(100).default(20)
        }
    }), asyncErrorHandler(async (req, res) => {
        const users = await betaService.getUserList(req.query.offset, req.query.limit);
        res.json(users);
    }));
};
