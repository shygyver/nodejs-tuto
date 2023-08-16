import logger from '@novice1/logger';

logger.Debug.enable([
    'route*'
].join('|'));

export default {};