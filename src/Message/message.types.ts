// ayo
import { Prisma } from "../generated/prisma";

export type Message = Prisma.MessageGetPayload<{}>
export type MessageWhereUnique = Prisma.MessageWhereUniqueInput
export type CreateMessage = Prisma.MessageUncheckedCreateInput


type MessagePayload = Omit<Message, "id" | "chatAsLastMessageId">

export interface IMessageServerEvents {
    newMessage: (
        data: Message
    ) => void
}
export interface IMessageClientEvents {
    sendMessage: (
        data:  MessagePayload
    ) => void
}