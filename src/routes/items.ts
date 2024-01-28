import routing from '@novice1/routing'
import { debugRoute, debugMiddleware } from '../services/debug'
import Joi from 'joi';
import { ErrorRequestHandler } from 'express';

const logger = debugRoute.extend('items')

const updateItem401: ErrorRequestHandler = (err, _req, res) => {
    const log = debugMiddleware.extend('updateItem401');
    log.error(err);
    res.status(401).json({message: 'Bad request: could not update item'})
}

const itemsRouter = routing()
    .get({
        path: '/',
        description: 'List items',
        tags: ['Items']
    }, (_, res) => {
        res.json([])
    })
    .post({
        path: '/',
        parameters: {
            body: Joi.object().keys({
                title: Joi.string().required().min(1).max(128),
                description: Joi.string().max(2560).allow(''),
                text: Joi.string().max(5120).allow(''),
                published: Joi.boolean().default(false)
            })
        },
        description: 'Create an item',
        tags: ['Items']
    }, (req, res) => {
        const item = req.body;
        res.json(item);
    });

const itemsIdRouter = routing()
    .get({
        path: '/:id',
        parameters: {
            params: {
                id: Joi.string().required()
            },
        },
        description: 'Get an item',
        tags: ['Items']
    }, (req, res) => {
        res.json({ message: `Got "${req.params.id}"` });
    })
    .put({ 
        path: '/:id',
        parameters: {
            params: {
                id: Joi.string().required()
            },
            body: Joi.object().keys({
                title: Joi.string().min(1).max(128),
                description: Joi.string().max(2560).allow(''),
                text: Joi.string().max(5120).allow(''),
                published: Joi.boolean()
            }).min(1),
            onerror: updateItem401
        },
        description: 'Update an item',
        tags: ['Items']
    }, (req, res) => {
        const item = req.body;
        item.id = req.params.id;
        res.json(item);
    })
    .delete({
        path: '/:id',
        parameters: {
            params: {
                id: Joi.string().required()
            },
        },
        description: 'Delete an item',
        tags: ['Items']
    }, (req, res) => {
        res.json({ id: req.params.id });
    })

export default routing().use('/items', (req, _res, next) => {
    logger.debug(`${req.method} ${req.originalUrl}`)
    next()
}, itemsRouter, itemsIdRouter);