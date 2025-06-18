import { PrismaClient, PrismaErrorCodes } from "../client/client";
import {
	Chat,
	ChatInclude,
	ChatWithArgs,
	CreateChat,
	WhereChat,
} from "./chat.types";
import { success, error, Result } from "../tools/result";
import { Prisma } from "../generated/prisma";
import { ErrorCodes } from "../types/error-codes";

export const ChatRepository = {
	getChat: async <TIncl extends ChatInclude>(
		where: WhereChat,
		include?: TIncl
	): Promise<Result<ChatWithArgs<TIncl>>> => {
		try {
			const chat = await PrismaClient.chat.findUniqueOrThrow({
				where: where,
				include: include,
			});
			return success(chat as ChatWithArgs<TIncl>);
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

	createChat: async (data: CreateChat): Promise<Result<Chat>> => {
		try {
			const chat = await PrismaClient.chat.create({
				data: data,
			});
			return success(chat);
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
};
