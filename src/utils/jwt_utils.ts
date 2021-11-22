import jwt from 'jsonwebtoken'
import { SignOptions, JwtPayload } from 'jsonwebtoken'

export class JWTUtils {
    private static secret: any = process.env.JWT_SECRET_AUTH_TOKEN
    private static anotherSecret: any = process.env.JWT_SECRET_REFRESH_TOKEN

    static generateAuthToken(
        payload: JwtPayload,
        options: SignOptions = { expiresIn: process.env.JWT_EXPIRES_IN }
    ) {
        return jwt.sign(payload, this.secret, options)
    }

    static generateRefreshToken(payload: JwtPayload) {
        return jwt.sign(payload, this.anotherSecret)
    }

    static verifyAuthToken(authToken: string) {
        return jwt.verify(authToken, this.secret)
    }

    static verifyRefreshToken(refreshToken: string) {
        return jwt.verify(refreshToken, this.anotherSecret)
    }
}
