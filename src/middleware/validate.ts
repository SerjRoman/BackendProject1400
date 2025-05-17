import { AnyObjectSchema, ValidationError } from "yup";
import { Request, Response, NextFunction } from "express";
import { error } from "../tools/result";
import { ErrorCodes } from "../types/error-codes";

export function validateMiddleware(schema: AnyObjectSchema) {
	return async function (req: Request, res: Response, next: NextFunction) {
		try {
			// abort - позволит собрать все ошибки валидации, а не остановится только на первой.
			// stripUnknown - удаляет из объекта все, что не указано в валидации.
			req.body = await schema.validate(req.body, {
				abortEarly: false,
				stripUnknown: true,
			});
			next();
		} catch (err) {
			console.log(err);
			next(error(ErrorCodes.VALIDATION));
		}
	};
}
