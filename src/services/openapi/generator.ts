import { BearerUtil, OpenAPI } from '@novice1/api-doc-generator';
import { EXTERNAL_PORT, EXTERNAL_PROTOCOL, HOSTNAME } from '../../config/server';

const bearerAuth = new BearerUtil('bearerAuth')

export const openAPIGenerator = new OpenAPI()
    .setTitle('API DOC')
    .setHost(`${EXTERNAL_PROTOCOL}://${HOSTNAME}${EXTERNAL_PORT ? ':'+EXTERNAL_PORT : ''}`)
    .setConsumes(['application/json'])
    .setTags([
        {
            name: 'default',
            externalDocs: { description: 'Find more info here', url: 'https://swagger.io/specification/' }
        }
    ])
    .addSecurityScheme(bearerAuth)
    .setDefaultSecurity(bearerAuth)