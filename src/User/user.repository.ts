import { PrismaClient, PrismaErrorCodes } from "../client/client";
import { Prisma } from "../generated/prisma";
import { Result, error, success } from "../tools/result";
import { ErrorCodes } from "../types/error-codes";
import { User, UserWhereUnique } from "./user.types";

export const UserRepository = {
	getUser: async function (where: UserWhereUnique): Promise<Result<User>> {
		try {
			const user = await PrismaClient.user.findUniqueOrThrow({
				where: where,
				omit: {
					password: true,
				},
			});
			return success(user);
		} catch (err) {
			if (err instanceof Prisma.PrismaClientKnownRequestError) {
				switch (err.code) {
					case PrismaErrorCodes.UNIQUE:
						return error(ErrorCodes.EXISTS);
					case PrismaErrorCodes.NOT_FOUND:
						return error(ErrorCodes.NOT_FOUND);
					default:
						return error(ErrorCodes.UNHANDLED);
				}
			}
			return error(ErrorCodes.UNHANDLED);
		}
	},
};