import jwt from 'jsonwebtoken'
import { environment } from '../config'

const { jwt_auth_token, jwt_refresh_token, jwt_expires_in } = environment

export class JWTUtils {
    static secret = jwt_auth_token
    static anotherSecret = jwt_refresh_token

    static generateAuthToken(payload, options = { expiresIn: jwt_expires_in }) {
        return jwt.sign(payload, this.secret, options)
    }

    static generateRefreshToken(payload) {
        return jwt.sign(payload, this.anotherSecret)
    }

    static verifyAuthToken(authToken) {
        return jwt.verify(authToken, this.secret)
    }

    static verifyRefreshToken(refreshToken) {
        return jwt.verify(refreshToken, this.anotherSecret)
    }
}
