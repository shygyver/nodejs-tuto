/**
 * internal port
 */
export const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8000;

export const HOSTNAME = process.env.HOSTNAME || 'localhost';

export const EXTERNAL_PROTOCOL = process.env.EXTERNAL_PROTOCOL || 'http';

export const EXTERNAL_PORT = process.env.EXTERNAL_PORT;