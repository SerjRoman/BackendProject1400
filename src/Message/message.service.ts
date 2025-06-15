import { Result } from "../tools/result";
import { Message, CreateMessage } from "./message.types"
import { MessageRepository } from "./message.repository"

export const MessageService = {
    createMessage: async function (data: CreateMessage): Promise<Result<Message>> {
        return await MessageRepository.createMessage(data)
    },
    getMessageById: async function (id: number): Promise<Result<Message>> {
		return await MessageRepository.getMessage({ id });
	},
}