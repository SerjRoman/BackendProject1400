import { verify } from "jsonwebtoken";
import { SECRET_KEY } from "../config/config";
import { Request, Response, NextFunction } from "express";
import { error } from "../tools/result";
import { ErrorCodes } from "../types/error-codes";
import { Socket } from "socket.io";

interface IToken {
	iat: number;
	exp: number;
	id: number;
}

export function authTokenMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const authorization = req.headers.authorization;

	if (!authorization) {
		res.json(error(ErrorCodes.UNAUTHORIZED));
		return;
	}

	const [type, token] = authorization.split(" ");
	if (type !== "Bearer" || !token) {
		res.json(error(ErrorCodes.UNHANDLED));
		return;
	}
	try {
		const decodedToken = verify(token, SECRET_KEY) as IToken;
		res.locals.userId = decodedToken.id;
		next();
	} catch (error) {
		res.json(error);
	}
}

export function socketAuthMiddleware(
	socket: Socket,
	next: (error?: any) => void
) {
	const token = socket.handshake.auth.token;

	if (!token) {
		next(new Error("no token"));
		return;
	}
	try {
		const decodedToken = verify(token, SECRET_KEY) as IToken;
		socket.data.userId = decodedToken.id;
		next();
	} catch (error) {
		next(error);
	}
}
