import NodeCache from 'node-cache'
import bcrypt from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { algorithm, expiresIn, secret } from '../config/jwt'

export interface User extends AppTypes.User { }

const saltRounds = 10

const passwordHasher = {
    hash(plainTextPassword: string) {
        return bcrypt.hash(plainTextPassword, saltRounds)
    },

    compare(plainTextPassword: string, hash: string) {
        return bcrypt.compare(plainTextPassword, hash)
    }

}

class CachedUsers {

    #cache = new NodeCache({ stdTTL: 0, checkperiod: 0 });

    async create(email: string, username: string, password: string) {

        // check unicity
        const exists = this.findUser(username)
        if (exists) {
            throw new Error(`User ${username} already exists`)
        }

        // hash password
        const hash = await passwordHasher.hash(password)

        const user: User = {email, username, password: hash}

        // save user
        return this.#cache.set(username, user)
    }

    findUser(username: string) {
        return this.#cache.get<User>(username)
    }

    async findUserAndPassword(username: string, password: string): Promise<User | undefined> {
        const user = this.#cache.get<User>(username)

        // if user not found
        if(!user) return undefined

        // password validity
        if(!(await passwordHasher.compare(password, user.password))) {
            return undefined
        }

        return user
    }

}

export function createSessionToken(userInfo: Partial<User> & { username: string }) {
    return sign(
        userInfo,
        secret,
        { expiresIn, algorithm }
    )
}

export const cachedUsers = new CachedUsers()