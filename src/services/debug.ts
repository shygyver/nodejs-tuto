import logger from '@novice1/logger';
import { enabled } from '../config/debug';

logger.Debug.enable(enabled.join('|'));

export const debugRoute = logger.debugger('route');
export const debugMiddleware = logger.debugger('middleware');