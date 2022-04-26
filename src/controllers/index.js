import { Router } from 'express'
import signup from './signup'
import login from './login'
import token from './token'

const router = Router()

router.use(signup)
router.use(login)
router.use(token)

export { router }
