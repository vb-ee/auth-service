import { Router } from 'express'
import { authHandler } from '../middlewares/auth_handler'
import { models } from '../models'
import { asyncWrapper } from '../utils'

const router = Router()
const { User, RefreshToken } = models

router.post(
    '/logout',
    authHandler(),
    asyncWrapper(async (req, res) => {
        const { email } = req.body.jwt
        const user = await User.findOne({
            where: { email },
        })

        await user.setRefreshToken(null)

        return res
            .status(200)
            .send({ success: true, message: 'Successfully logged out' })
    })
)

export default router
