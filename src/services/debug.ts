import logger from '@novice1/logger';

logger.Debug.enable([
    'route*',
    'middleware*'
].join('|'));

export const debugRoute = logger.debugger('route');
export const debugMiddleware = logger.debugger('middleware');