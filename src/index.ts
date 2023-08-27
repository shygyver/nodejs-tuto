import logger from '@novice1/logger';
import { app } from './app';
import { httpError, httpNotFound } from './middlewares/http';

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8000;

// 404
app.use(httpNotFound);

// error
app.useError(httpError);

// start server
app.listen(PORT, () => {
    logger.info('Application running on port', PORT)
})