import { Prisma } from '../generated/prisma'
import { Result } from '../tools/result';
export type Chat = Prisma.ChatGetPayload<{}>;
export type CreateChat = Prisma.ChatCreateInput;
export type WhereChat = Prisma.ChatWhereUniqueInput;

export interface IChatServerEvents {
    chatUpdate: (
        data: Chat
    ) => void
}
export interface IChatClientEvents {
    joinChat: (
        data:  {chatId: number},
        callback: (response: Result<string>) => void
    ) => void,
    leaveChat: (
        data:  {chatId: number}
    ) => void
}