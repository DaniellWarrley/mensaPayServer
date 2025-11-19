import { Router } from "express"
import { newPlan, getUserPlans, editPlan, deleteUserPlan } from "../controllers/planController.js"
import checkToken from "../middlewares/checkToken.js"

const router = Router()

router.post('/newPlan', checkToken, newPlan)
router.get('/getUserPlans', checkToken, getUserPlans)
router.post('/editPlan', checkToken, editPlan)
router.delete('/deleteUserPlan/:planId', checkToken, deleteUserPlan)

export default router