import { Router } from 'express'
import { validateMiddleware } from '../middleware/validate'
import { UserValidation } from './user.validate'
import { UserController } from './user.controller'
import { errorHandlerMiddleware } from '../middleware/errorHandler'

const router = Router()

router.post('/login', errorHandlerMiddleware, validateMiddleware(UserValidation.login), UserController.login)
router.post("/register", errorHandlerMiddleware, validateMiddleware(UserValidation.register), UserController.register)
router.get("/me", errorHandlerMiddleware, UserController.getUserById)

export default router;