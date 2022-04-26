import { Router } from 'express'
import signup from './signup'
import login from './login'

const router = Router()

router.use(signup)
router.use(login)

export { router }
