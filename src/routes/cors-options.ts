import cors from 'cors';
import routing from '@novice1/routing';

// enable CORS (Cross-origin resource sharing) pre-flight request
export default routing().options({
    path: '*'
}, cors());