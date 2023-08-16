import routing from '@novice1/routing';
import { debugRoute } from '../debug/loggers';

// hello-world
export default routing().get({
    path: '/hello-world'
}, (req, res) => {
    debugRoute.extend('hello-world').debug(req.path);
    res.json(`Hello ${req.query.name || 'World'}!`);
})