import { IChatClientEvents, IChatServerEvents } from "../Chat/chat.types"
import { IMessageClientEvents, IMessageServerEvents } from "../Message/message.types"

export type AppServerEvents = IMessageServerEvents & IChatServerEvents
export type AppClientEvents = IMessageClientEvents & IChatClientEvents
export interface SocketData {
    userId: number
}