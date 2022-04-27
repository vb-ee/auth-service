import { Router } from 'express'
import { models } from '../models'
import { comparePasswords, JwtUtils } from '../utils'
import { asyncWrapper } from '../utils'

const router = Router()
const { User } = models

router.post(
    '/login',
    asyncWrapper(async (req, res) => {
        const { email, password } = req.body
        const user = await User.findOne({ where: { email } })

        if (!user || !(await comparePasswords(password, user.password))) {
            return res
                .status(401)
                .send({ success: false, message: 'Invalid credentials' })
        }

        const payload = { email }
        const accessToken = JwtUtils.generateAccessToken(payload)
        const savedRefreshToken = await user.getRefreshToken()
        let refreshToken

        if (!savedRefreshToken || !savedRefreshToken.token) {
            refreshToken = JwtUtils.generateRefreshToken(payload)

            if (!savedRefreshToken) {
                await user.createRefreshToken({ token: refreshToken })
            } else {
                await user.setRefreshToken(refreshToken)
            }
        } else {
            refreshToken = savedRefreshToken.token
        }

        return res.status(200).send({
            success: true,
            message: 'User successfully logged in',
            data: { accessToken, refreshToken },
        })
    })
)

export default router
