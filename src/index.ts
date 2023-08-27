import logger from '@novice1/logger';
import { app } from './app';

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8000;

// start server
app.listen(PORT, () => {
    logger.info('Application running on port', PORT)
})