import { ErrorRequestHandler } from 'express'
import { debugMiddleware } from '../services/debug';

/**
 * 
 * Responds 400. Removes sensitive data from message.
 */
export const badRequestWithoutOriginalData: ErrorRequestHandler = (err, _req, res) => {

    debugMiddleware.extend('badRequestWithoutOriginalData').debug(err._original);

    // avoid sending sensitive data (e.g: '_original' from joi validator)
    const {_original: _, ...response} = err
    res.status(400).json(response)
}