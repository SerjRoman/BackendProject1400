import { Router } from "express";
import { validateMiddleware } from "../middleware/validate";
import { UserValidation } from "./user.validate";
import { UserController } from "./user.controller";
import { authTokenMiddleware } from "../middleware/authTokenMiddleware";

const router = Router();

router.post(
	"/login",
	validateMiddleware(UserValidation.login),
	UserController.login
);
router.post(
	"/register",
	validateMiddleware(UserValidation.register),
	UserController.register
);

router.get("/me", authTokenMiddleware, UserController.getMe);
export { router as UserRouter };
