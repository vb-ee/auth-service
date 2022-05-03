import { Router } from 'express'
import { models } from '../models'
import { asyncWrapper } from '../utils'

const router = Router()
const { User } = models

router.post(
    '/signup',
    asyncWrapper(async (req, res) => {
        const { email } = req.body
        const user = await User.findOne({ where: { email } })

        if (user) {
            return res
                .status(200)
                .send({ success: false, message: 'User already exists' })
        }

        const result = await User.createUser(req.body)

        const { accessToken, refreshToken } = result

        return res.send({
            success: true,
            message: 'User successfully created',
            data: { accessToken, refreshToken }
        })
    })
)

export default router
