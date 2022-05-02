import { Router } from 'express'
import { models } from '../models'
import { JwtUtils } from '../utils'
import { asyncWrapper } from '../utils'

const router = Router()
const { User, sequelize } = models

router.post(
    '/signup',
    asyncWrapper(async (req, res) => {
        const { email, password, roles } = req.body
        const user = await User.findOne({ where: { email } })

        if (user) {
            return res
                .status(200)
                .send({ success: false, message: 'User already exists' })
        }

        const result = await sequelize.transaction(async () => {
            const newUser = await User.create({ email, password })
            const jwtPayload = { email }
            const accessToken = JwtUtils.generateAccessToken(jwtPayload)
            const refreshToken = JwtUtils.generateRefreshToken(jwtPayload)
            await newUser.createRefreshToken({ token: refreshToken })

            if (roles && Array.isArray(roles)) {
                for (const role of roles) {
                    await newUser.createRole({ role })
                }
            }

            return { accessToken, refreshToken }
        })

        const { accessToken, refreshToken } = result

        return res.send({
            success: true,
            message: 'User successfully created',
            data: { accessToken, refreshToken }
        })
    })
)

export default router
