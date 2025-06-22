// ayo
import { Prisma } from "../generated/prisma";
import { Result } from "../tools/result";

export type Message = Prisma.MessageGetPayload<{}>
export type MessageWhereUnique = Prisma.MessageWhereUniqueInput
export type CreateMessage = Prisma.MessageUncheckedCreateInput
export type MessageInclude = Prisma.MessageInclude

type MessagePayload = Omit<Message, "id" | "chatAsLastMessageId">


export interface IMessageServerEvents {
    newMessage: (
        data: NewMessagePayload
    ) => void
}
export interface IMessageClientEvents {
    sendMessage: (
        data: SendMessagePayload
    ) => void
}

type NewMessagePayload = CreateMessage;
type SendMessagePayload = MessagePayload;


export interface IMessageService{ 
    getMessage: (
        id: number
    ) => Promise<Result<Message>>,
    createMessage: (
        data: CreateMessage
    ) => Promise<Result<Message>>
}