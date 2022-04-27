import { Router } from 'express'
import signup from './signup'
import login from './login'
import token from './token'
import logout from './logout'

const router = Router()

router.use(signup)
router.use(login)
router.use(token)
router.use(logout)

export { router }
