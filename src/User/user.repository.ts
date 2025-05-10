import { PrismaErrorCodes } from "../client/client";
import { Prisma } from "../generated/prisma";
import { errors, IErrors } from "../tools/error.codes";
import { error, Result, success } from '../tools/result'
import { ErrorCodes } from "../types/error-codes";
import { User, UserWhereUnique, UserWithPassword } from "./user.types";
import { PrismaClient } from "@prisma/client";


export const UserRepository = {
    createUser: async function (data: UserWithPassword): Promise<Result<UserWithPassword>> {
        try {
            const user = await PrismaClient.user.create({
                data: data
            })
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

    getUser: async function (where: UserWhereUnique): Promise<Result<UserWithPassword>> {
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
}