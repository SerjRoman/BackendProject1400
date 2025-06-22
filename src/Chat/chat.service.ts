import { ChatRepository } from "./chat.repository";
import { IChatService, ChatWithArgs, Chat, CreateChat } from "./chat.types";
import { Result } from "../tools/result";

export const ChatService: IChatService = {
	getChat: async (id: number): Promise<Result<ChatWithArgs<{messages: true, participants: true}>>> => {
	    return await ChatRepository.getChat({id});
	},
	createChat: async (data: CreateChat): Promise<Result<Chat>> => {
	    return await ChatRepository.createChat(data);
	},
	joinChat: async function (id) {
		return await ChatRepository.getChat<{
			messages: true;
			participants: true;
		}>({ id: id }, { messages: true, participants: true });
	},
};
