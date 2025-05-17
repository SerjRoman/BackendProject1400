import { PrismaClient, PrismaErrorCodes } from "../client/client";
import { Prisma } from "../generated/prisma";
import { Result, error, success } from "../tools/result";
import { ErrorCodes } from "../types/error-codes";
import { User, UserWhereUnique, CreateUser, UserOmit} from "./user.types";

export const UserRepository = {
	getUser: async function (where: UserWhereUnique, omit?: UserOmit): Promise<Result<User>> {
		try {
			const user = await PrismaClient.user.findUniqueOrThrow({
				where: where,
				omit: omit
			});
			return success(user);
		} catch (err) {
			if (err instanceof Prisma.PrismaClientKnownRequestError) {
				switch (err.code) {
					case PrismaErrorCodes.NOT_FOUND:
						return error(ErrorCodes.NOT_FOUND);

					default:
						return error(ErrorCodes.UNHANDLED);
				}
			}
			return error(ErrorCodes.UNHANDLED);
		}
	},
	createUser: async function (data: CreateUser): Promise<Result<User>> {
		try {
			const user = await PrismaClient.user.create({
				data: data
			}) 
			return success(user)
		} catch (err) {
			if (err instanceof Prisma.PrismaClientKnownRequestError) {
				switch (err.code) {
					case PrismaErrorCodes.UNIQUE:
						return error(ErrorCodes.EXISTS);
					default:
						return error(ErrorCodes.UNHANDLED);
				}
			}
			return error(ErrorCodes.UNHANDLED);
		}	
	}
};