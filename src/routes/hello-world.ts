import routing from '@novice1/routing';
import { debugRoute } from '../services/debug';
import Joi from 'joi';

// hello-world
export default routing().get({
    path: '/hello-world',
    description: 'Hello World!',
    parameters: {
        query: {
            name: Joi.string()
        }
    }
}, (req, res) => {
    debugRoute.extend('hello-world').debug(req.path);
    res.json(`Hello ${req.query.name || 'World'}!`);
})