import { Error } from "../tools/result";
import { Request, Response, NextFunction } from "express";

export function errorHandlerMiddleware(
	error: Error,
	req: Request,
	res: Response,
	next: NextFunction
) {
    if (error.message === 'USER_EXISTS' ) {
        res.status(409).json(error)
    }
	if (error.message === 'P2002' ) {
        res.status(2002).json(error)
    }
	if (error.message === 'P2017' ) {
        res.status(2017).json(error)
    }
}
