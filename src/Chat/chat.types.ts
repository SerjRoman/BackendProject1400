import { Prisma } from "../generated/prisma";
import { Result } from "../tools/result";
import { AuthenticatedSocket } from "../types/socket";

export type Chat = Prisma.ChatGetPayload<{}>;
export type ChatWithArgs<T extends ChatInclude> = Prisma.ChatGetPayload<{
	include: T;
}>;
export type ChatInclude = Prisma.ChatInclude;
export type CreateChat = Prisma.ChatCreateInput;
export type WhereChat = Prisma.ChatWhereUniqueInput;

export interface IChatServerEvents {
	chatUpdate: (data: IChatUpdatePayload) => void;
}
export interface IChatClientEvents {
	joinChat: (data: IJoinChatPayload, callback: IJoinChatCallback) => void;
	leaveChat: (data: ILeaveChatPayload) => void;
}

export interface IJoinChatPayload {
	chatId: number;
}

export interface ILeaveChatPayload {
	chatId: number;
}

export type IJoinChatCallback = (
	response: Result<ChatWithArgs<{ messages: true; participants: true }>>
) => void;

export interface IChatUpdatePayload {
	chat: Chat;
}

export interface IChatSocketController {
	joinChat: (
		socket: AuthenticatedSocket,
		data: IJoinChatPayload,
		callback: IJoinChatCallback
	) => void;
	leaveChat: (socket: AuthenticatedSocket, data: ILeaveChatPayload) => void;
	chatUpdate: (socket: AuthenticatedSocket, data: IChatUpdatePayload) => void;
	registerControllers: (socket: AuthenticatedSocket) => void;
}

export interface IChatService {
	joinChat: (
		id: number
	) => Promise<Result<ChatWithArgs<{ messages: true; participants: true }>>>;
}
// acknowledgment
// В Socket.io acknowledgment (callback) це функція, яка відправляє повідомлення в
// результаті якоїсь події (аналог http)
