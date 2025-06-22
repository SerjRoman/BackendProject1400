import { NextFunction, Request, Response } from "express";
import { MessageService } from "./message.service"

export const MessageController ={
    createMessage: async function(req: Request, res: Response, next: NextFunction) {
        const body = req.body;
		body.ownerId = res.locals.userId
		const result = await MessageService.createMessage(body)
		if (result.status == "error") {
			next(result);
            return;
		}
		res.json(result);
    },
    getMessage: async function(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
		const result = await MessageService.getMessage(+id)
		if (result.status == "error") {
			next(result);
			return;
		}
		res.json(result);
    }
}