import { FrameworkApp } from '@novice1/app';
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import validatorJoi from '@novice1/validator-joi'
import { debugMiddleware } from './services/debug';

// init app
export const app = new FrameworkApp({
    framework: {
        // middlewares for all requests
        middlewares: [
            cookieParser(),
            express.json(),
            express.urlencoded({ extended: true }),
            cors()
        ],
        validators: [validatorJoi(undefined, (err, _req, res) => {
            debugMiddleware.extend('validator-joi').error(err)
            res.status(400).json({message: "bad request"})
        })]
    },
    routers: routes
})