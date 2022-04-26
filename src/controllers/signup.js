import { Router } from 'express'
import { models } from '../models'
import { JwtUtils } from '../utils'
import { asyncWrapper } from '../utils'

const router = Router()
const { User, Role, sequelize } = models

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

        try {
            const result = await sequelize.transaction(async () => {
                const newUser = await User.create({ email, password })
                const jwtPayload = { email }
                const accessToken = JwtUtils.generateAccessToken(jwtPayload)
                const refreshToken = JwtUtils.generateRefreshToken(jwtPayload)
                await newUser.createRefreshToken({ token: refreshToken })

                if (roles && Array.isArray(roles)) {
                    const rolesToSave = []
                    for (const role of roles) {
                        const newRole = await Role.create({ role })
                        rolesToSave.push(newRole)
                    }
                    await newUser.addRoles(rolesToSave)
                }

                return { accessToken, refreshToken }
            })

            const { accessToken, refreshToken } = result

            return res.send({
                success: true,
                message: 'User successfully created',
                data: { accessToken, refreshToken }
            })
        } catch (error) {
            console.error('Error registering the user: \n', error.stack)
            res.status(500).send({ success: false, message: error.message })
        }
    })
)

export default router
