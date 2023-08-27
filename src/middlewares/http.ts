import { ErrorRequestHandler, RequestHandler } from 'express'
import { debugMiddleware } from '../services/debug'

export const httpError: ErrorRequestHandler = (err, _req, res, _) => {
    const logger = debugMiddleware.extend('httpError');
    logger.error(err);
    res.status(500).json({message: 'Something went wrong'})
}

export const httpNotFound: RequestHandler = (_req, res) => {
    res.status(404).json({message: 'Not found'});
}