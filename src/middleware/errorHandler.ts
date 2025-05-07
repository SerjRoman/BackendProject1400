import { Error } from "../tools/result";
import { Request, Response, NextFunction } from "express";
import { ErrorCodes } from "../types/error-codes";
// case - случай
export function errorHandlerMiddleware(
	error: Error,
	req: Request,
	res: Response,
	next: NextFunction
) {
	// if (error.code === ErrorCodes.EXISTS ) {
	//     res.status(409).json(error)
	// }
	// if (error.code === ErrorCodes.NOT_FOUND ) {
	//     res.status(409).json(error)
	// }

	let message: string;
	let httpCode: number;

	switch (error.code) {
		case ErrorCodes.EXISTS:
			message = "Resource already exists!";
			httpCode = 409;
			break;
		case ErrorCodes.NOT_FOUND:
			message = "Not found!";
			httpCode = 404;
			break;
		default:
			message = "Internal server error!";
			httpCode = 500;
	}
	res.status(httpCode).json({
		status: "error",
		message: error.message ? error.message : message,
	});
}
