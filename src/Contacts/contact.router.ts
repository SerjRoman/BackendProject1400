import express from 'express';
import { ContactController } from './contact.controller';
import { validateMiddleware } from '../middleware/validate';
import { ContactValidation } from './contact.validate';

const router = express.Router()

router.get('/', ContactController.getAllContacts)
router.get('/:id', ContactController.getContactById)
router.post("/create", ContactController.createContact, validateMiddleware(ContactValidation.contact))

export { router as ContactRouter }