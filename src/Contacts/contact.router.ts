import { Router } from "express";
import { ContactController } from "./contact.controller";
import { validateMiddleware } from "../middleware/validate";
import { ContactValidation } from "./contact.validate";
import { authTokenMiddleware } from "../middleware/authTokenMiddleware"

const router = Router();

router.use(authTokenMiddleware)
router.get("/", ContactController.getAllContacts);
router.get("/:id", ContactController.getContactById);
router.post(
	"/create",
	validateMiddleware(ContactValidation.contact),
	ContactController.createContact
);

export { router as ContactRouter };
