import auth from './auth';
import corsOptions from './cors-options';
import documentation from './documentation';
import helloWorld from './hello-world';
import items from './items';

// all routers
export default [
    corsOptions,
    documentation,
    auth,
    helloWorld,
    items
]