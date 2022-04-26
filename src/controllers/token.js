import { Router } from 'express'
import { authHandler } from '../middlewares/auth_handler'
import { models } from '../models'
import { comparePasswords, JwtUtils } from '../utils'
import { asyncWrapper } from '../utils'

const router = Router()
const { User, RefreshToken } = models

router.post(
    '/token',
    authHandler('refreshToken'),
    asyncWrapper(async (req, res) => {
        const { jwt } = req.body

        const user = await User.findOne({
            where: { email: jwt.email },
            include: RefreshToken,
        })

        const savedRefreshToken = user.RefreshToken

        if (!savedRefreshToken || !savedRefreshToken.token) {
            return res
                .status(401)
                .send({ success: false, message: 'You are not logged in' })
        }

        const newAccessToken = JwtUtils.generateAccessToken({
            email: user.email,
        })

        return res.status(200).send({
            success: true,
            data: { accessToken: newAccessToken },
        })
    })
)

export default router
