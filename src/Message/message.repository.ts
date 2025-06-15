import { PrismaClient, PrismaErrorCodes } from "../client/client"
import { CreateMessage, MessageWhereUnique, Message } from "./message.types"
import { Result, error, success } from "../tools/result";
import { ErrorCodes } from "../types/error-codes";
import { Prisma } from "../generated/prisma";

export const MessageRepository = {
    createMessage: async function (data: CreateMessage): Promise<Result<Message>> {
        try {
            const message = PrismaClient.message.create({
                data: data
            })
            return success(message)
        } catch(err) {
            if (err instanceof Prisma.PrismaClientKnownRequestError) {
				switch (err.code) {
					default:
						return error(ErrorCodes.UNHANDLED);
				}
			}
			return error(ErrorCodes.UNHANDLED);
        }
    },
    getMessage: async function (where: MessageWhereUnique): Promise<Result<Message>> {
        try {
            const messages = await PrismaClient.message.findUniqueOrThrow({
                where: where
            })
            return success(messages)
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
    }
}