import { Algorithm } from 'jsonwebtoken'

export const secret = process.env.JWT_SECRET || 'here_is_the_secret'
export const algorithm: Algorithm = 'HS256'
export const algorithms = [algorithm]
export const expiresIn: string = '16h'
