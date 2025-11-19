import { Router } from 'express'
import { login, cadastro } from '../controllers/authController.js'

const router = Router()

router.post('/login', login)
router.post('/register', cadastro)

export default router
