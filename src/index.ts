import logger from '@novice1/logger';
import { app } from './app';
import { httpError, httpNotFound } from './middlewares/http';
import { PORT } from './config/server';
import { openAPIGenerator } from './services/openapi/generator';

// 404
app.use(httpNotFound);

// error
app.useError(httpError);

// start server
app.listen(PORT, () => {
    logger.info('Application running on port', PORT)

    /**
     * Add app metadata to API documentation generator
     */
    openAPIGenerator.add(app.meta)
})