import { Router } from 'express'
import authRoutes from './authRoutes.js'
import planRoutes from './planRoutes.js'
import clientRoutes from './clientRoutes.js'

const router = Router()

router.use('/auth', authRoutes)
router.use('/plan', planRoutes)
router.use('/client', clientRoutes)

export default router
