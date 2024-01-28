import routing from '@novice1/routing';
import Joi from 'joi';
import { openAPIGenerator } from '../services/openapi/generator';
import YAML from 'yamljs';

export default routing().get({
    path: '/documentation',
    parameters: {
        query: Joi.object().keys({
            json: Joi.boolean().default(false)
        }),
        undoc: true
    }
}, (req, res) => {
    const result = openAPIGenerator.result()

    if (!req.query.json) {
        res.set('Content-Type', 'text/plain')
        res.send(YAML.stringify(result, 10, 2))
    } else {
        res.json(result)
    }
})

