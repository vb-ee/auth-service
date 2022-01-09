import jwt from 'jsonwebtoken'
import { config } from '../config/config'

const { jwt_auth_token, jwt_refresh_token, jwt_expires_in } = config.environment

export class JwtUtils {
    static secret = jwt_auth_token
    static anotherSecret = jwt_refresh_token

    static generateAccessToken(
        payload,
        options = { expiresIn: jwt_expires_in }
    ) {
        return jwt.sign(payload, this.secret, options)
    }

    static generateRefreshToken(payload) {
        return jwt.sign(payload, this.anotherSecret)
    }

    static verifyAccessToken(authToken) {
        return jwt.verify(authToken, this.secret)
    }

    static verifyRefreshToken(refreshToken) {
        return jwt.verify(refreshToken, this.anotherSecret)
    }
}
