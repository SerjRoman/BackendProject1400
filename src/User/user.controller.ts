import { Request, Response, NextFunction } from "express";
import { UserService } from "./user.service";

export const UserController = {
	login: async function (req: Request, res: Response, next: NextFunction) {
		const result = await UserService.login(req.body);
		if (result.status == "error") {
			next(result);
			return;
		}
		res.json(result);
	},
	register: async function (req: Request, res: Response, next: NextFunction) {
		const result = await UserService.register(req.body);
		if (result.status == "error") {
			next(result);
            return;
		}
		res.json(result);
	},
	getMe: async function (req: Request, res: Response, next: NextFunction) {
		const result = await UserService.getMe(res.locals.userId);
		if (result.status == "error") {
			next(result);
            return;
		}
		res.json(result);
	},
	getUserByUsername: async function (req: Request,  res: Response, next: NextFunction) {
		const result = await UserService.getUserByUsername(req.params.username)
		if (result.status == "error") {
			next(result);
            return;
		}
		res.json(result);
	}
};
