import jwt from 'jsonwebtoken'
import { SignOptions, JwtPayload } from 'jsonwebtoken'

export class JWTUtils {
    static secret = process.env.JWT_SECRET_AUTH_TOKEN
    static anotherSecret = process.env.JWT_SECRET_REFRESH_TOKEN

    static generateAuthToken(
        payload,
        options = { expiresIn: process.env.JWT_EXPIRES_IN }
    ) {
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
