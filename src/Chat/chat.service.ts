import { ChatRepository } from "./chat.repository";
import { IChatService } from "./chat.types";

export const ChatService: IChatService = {
	// getChat: async (id: number): Promise<Result<Chat>> => {
	//     return await repository.getChat({id});
	// },
	// createChat: async (data: CreateChat): Promise<Result<Chat>> => {
	//     return await repository.createChat(data);
	// }
	joinChat: async function (id) {
		return await ChatRepository.getChat<{
			messages: true;
			participants: true;
		}>({ id: id }, { messages: true, participants: true });
	},
};
