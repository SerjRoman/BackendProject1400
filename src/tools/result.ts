import { ErrorCodes } from "../types/error-codes";

export interface Success<T> {
	status: "success";
	data: T;
}

export interface Error {
	status: "error";
	message?: string;
	code?: ErrorCodes;
}

export type Result<S> = Success<S> | Error;

export function success<T>(data: T): Success<T> {
	return { status: "success", data: data };
}

export function error(code?: ErrorCodes, message?: string): Error {
	return { code: code, status: "error", message: message };
}
