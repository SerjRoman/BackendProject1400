import { ChatService } from "./chat.service";
import { IChatSocketController } from "./chat.types";

export const ChatSocketController: IChatSocketController = {
	leaveChat: (socket, data) => {
		const chatRoomName = `chat_${data.chatId}`;
		socket.leave(chatRoomName);
	},
	joinChat: async (socket, data, callback) => {
		const chatRoomName = `chat_${data.chatId}`;
		socket.join(chatRoomName);
		const chat = await ChatService.joinChat(data.chatId);
		if (typeof callback == "function") {
			callback(chat);
		}
	},
	chatUpdate: (socket, data) => {},
	registerControllers: (socket) => {
		socket.on("joinChat", (data, callback) => {
			ChatSocketController.joinChat(socket, data, callback);
		});
		socket.on("leaveChat", (data) => {
			ChatSocketController.leaveChat(socket, data);
		});
	},
};

// Принимаем chatId, подключаем к каналу
// Отправляем Chat(сущность)
