import { Router } from "express";
import { MessageController } from "./message.controller";
import { authTokenMiddleware } from "../middleware/authTokenMiddleware"
import { validateMiddleware } from "../middleware/validate"


const router = Router();

router.use(authTokenMiddleware)
router.get("/:id", MessageController.getMessage);
router.post("/create", MessageController.createMessage);

export {router as messageRouter}