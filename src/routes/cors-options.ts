import cors from 'cors';
import routing from '@novice1/routing';

// enable CORS (Cross-origin resource sharing) options request
export default routing().options({
    path: '*'
}, cors());