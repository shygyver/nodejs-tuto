import { FrameworkApp } from '@novice1/app';
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import routes from './routes';

// init app
export const app = new FrameworkApp({
    framework: {
        // middlewares for all requests
        middlewares: [
            cookieParser(),
            express.json(),
            express.urlencoded({ extended: true }),
            cors()
        ]
    },
    routers: routes
})