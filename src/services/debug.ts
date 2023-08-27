import logger from '@novice1/logger';

logger.Debug.enable([
    'route*'
].join('|'));

export const debugRoute = logger.debugger('route');