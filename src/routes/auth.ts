import routing from '@novice1/routing';
import Joi from 'joi';
import { debugRoute } from '../services/debug';
import { cachedUsers, createSessionToken } from '../services/users';
import { badRequestWithoutOriginalData } from '../middlewares/validator';

const logger = debugRoute.extend('auth')

const authRouter = routing()
    .post({
        path: '/',
        parameters: {
            body: Joi.object().keys({
                username: Joi.string().required(),
                password: Joi.string().tag('password').required()
            }),
            // remove sensitive data
            onerror: badRequestWithoutOriginalData
        },
        description: 'Log in',
        tags: ['auth']
    }, async (req, res) => {
        const user = await cachedUsers.findUserAndPassword(req.body.username, req.body.password)

        // if user not found
        if(!user) {
            return res.status(401).json({message: 'Wrong username or password'})
        }

        // remove sensitive data
        const {password: _, ...partialUser} = user

        // create a session token
        const token = createSessionToken(partialUser)

        return res.json({
            token,
            user: partialUser
        })
    })
    .get({
        path: '/',
        auth: true,
        description: 'Get my session',
        tags: 'auth'
    }, (req, res) => {
        // get user data from session
        const session = {...req.session}
        if (session.user) {
            // remove sensitive data
            const {password, ...user} = {...session.user}
            session.user = user
        }
        res.json(session)
    })
    .post({
        path: '/register',
        parameters: {
            body: Joi.object().keys({
                email: Joi.string().email().required(),
                username: Joi.string().required(),
                password: Joi.string().tag('password').required(),
                passwordConfirm: Joi.string().tag('password').required()
            }),
            // remove sensitive data
            onerror: badRequestWithoutOriginalData
        },
        description: 'Register',
        tags: 'auth'
    }, async (req, res) => {

        // check request
        if(req.body.password != req.body.passwordConfirm) {
            return res.status(400).json({message: 'Passwords are not identical'})
        }

        let saved = false;

        try {
            saved = await cachedUsers.create(req.body.email, req.body.username, req.body.password)
        } catch (err) {
            logger.error(err)
            if (err instanceof Error) {
                return res.status(400).json({message: err.message})
            } else {
                res.status(400)
            }
        }

        return res.json({saved})
    })

export default routing().use('/auth',
    (req, _res, next) => {
        logger.debug(`${req.method} ${req.originalUrl}`)
        next()
    },
    authRouter
)