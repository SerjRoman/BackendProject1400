import { Result } from "../tools/result";
import { Message, CreateMessage, IMessageService } from "./message.types"
import { MessageRepository } from "./message.repository"

export const MessageService: IMessageService = {
    createMessage: async function (data: CreateMessage): Promise<Result<Message>> {
        return await MessageRepository.createMessage(data)
    },
    getMessage: async function (id: number): Promise<Result<Message>> {
		return await MessageRepository.getMessage({ id });
	},
}