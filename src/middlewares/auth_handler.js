import { JwtUtils } from '../utils/'

export const authHandler = (tokenType = 'accessToken') => {
    return (req, res, next) => {
        const authHeader = req.headers.authorization

        if (authHeader) {
            const token = authHeader.split(' ')[1]
            try {
                let jwt
                switch (tokenType) {
                    case 'accessToken':
                    default:
                        jwt = JwtUtils.verifyAccessToken(token)
                    case 'refreshToken':
                        jwt = JwtUtils.verifyRefreshToken(token)
                }
                req.body.jwt = jwt
                next()
            } catch (error) {
                res.status(401).send({
                    success: false,
                    message: 'Invalid token',
                })
            }
        } else {
            return res.status(401).send({
                success: false,
                message: 'Authorization header not found',
            })
        }
    }
}
