import { Router } from 'express'
import { validateMiddleware } from '../middleware/validate'
import { UserValidation } from './user.validate'

const router = Router()

router.post('/login', validateMiddleware(UserValidation.login))
router.post("/register", validateMiddleware(UserValidation.register))
router.get("/me")