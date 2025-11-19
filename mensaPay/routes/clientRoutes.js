import { Router } from "express"
import { newClient, getClients, editClient, deleteClient, efetuarPagamento } from "../controllers/clientController.js"
import checkToken from "../middlewares/checkToken.js"

const router = Router()

router.post('/newClient',checkToken, newClient)
router.get('/getClients', checkToken, getClients)
router.post('/editClient', checkToken, editClient)
router.delete('/deleteClient/:clientId', checkToken, deleteClient)
router.post('/efetuarPagamento', checkToken, efetuarPagamento)
export default router
