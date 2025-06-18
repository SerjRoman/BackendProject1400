import { Request, Response, NextFunction } from "express";
import { ChatService } from "./chat.service";

export const controller = {
	getChat: async (req: Request, res: Response, next: NextFunction) => {
		const chat = await ChatService.getChat(+req.params.id);
		if (chat.status == "error") {
			next(chat);
			return;
		}

		res.json(chat);
	},
	createChat: async (req: Request, res: Response, next: NextFunction) => {
		const chat = await ChatService.createChat(req.body);
		if (chat.status == "error") {
			next(chat);
			return;
		}

		res.json(chat);
	},
};

