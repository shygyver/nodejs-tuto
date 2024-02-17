import { expressjwt } from 'express-jwt'
import { secret, algorithms } from '../config/jwt'
import { cachedUsers } from '../services/users'
import { RequestHandler } from 'express'

const decodedJWTProperty = 'auth'

/**
 * retrieve jwt
 */
export const getTokenMiddleware = expressjwt({
    secret,
    algorithms,
    requestProperty: decodedJWTProperty,
    credentialsRequired: false,
    getToken: function fromHeader(req): string | undefined {
        let token: string | undefined;

        // check authorization header
        const authHeaderValue = req.headers.authorization?.split(' ')
        if (authHeaderValue?.[0] === 'Bearer' || authHeaderValue?.[0] === 'bearer') {
            token = authHeaderValue?.[1]
            if (token) {
                // keep token in session
                req.session = req.session || {}
                req.session.token = token
            }
        }

        return token
    }
})


/**
 * retrieve user from decoded jwt
 */
export const getUserMiddleware: RequestHandler = (req, _, next) => {
    const session = req.session || {}
    try {
        if (typeof req[decodedJWTProperty] == 'object') {
            const auth: Record<string, unknown> = { ...req[decodedJWTProperty] }
            if(typeof auth.username == 'string') {
                const user = cachedUsers.findUser(auth.username)
                if (user) {
                    // add user info to session
                    req.session = { ...session, user }
                }
            }
        }
        next()
    } catch(err) {
        next(err)
    }
}

/**
 * authorization middlaware
 */
export const authMiddleware: RequestHandler = (req, res, next) => {
    if (req.session?.user) {
        next()
    } else {
        res.status(403).json({message: 'Authorization required'})
    }
} 