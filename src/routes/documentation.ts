import routing, { RequestHandler } from '@novice1/routing';
import Joi from 'joi';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';
import { openAPIGenerator } from '../services/openapi/generator';

const swaggerUIController: RequestHandler = (req, res, next) => {
    const swaggerDocument = openAPIGenerator.result()
    return swaggerUi.setup(swaggerDocument)(req, res, next)
  }
  
  const swaggerRouter = routing()
    .get({
      path: '/',
      parameters: {
        undoc: true
      },
    },
    swaggerUIController)
    .get({
      path: '/schema',
      parameters: {
        query: Joi.object().keys({
          json: Joi.boolean().default(false),
        }).options({ allowUnknown: true, stripUnknown: false }),
  
        undoc: true
      }
    }, (req, res) => {
      const result = openAPIGenerator.result();
  
      if (!req.query.json) {
        res.set('Content-Type', 'text/plain');
        res.send(YAML.stringify(result, 10, 2));
      } else {
        res.json(result);
      }
    });
  
  export default routing().use('/documentation', 
    swaggerUi.serve, 
    swaggerRouter
  );

