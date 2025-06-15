import { repository } from './chat.repository';
import { Chat } from './chat.types';
import { Result } from '../tools/result'

export const service = {
    getChat: async (id: number): Promise<Result<Chat>> => {
        return await repository.getChat({id});
    },
    createChat: async (data: CreateChat): Promise<Result<Chat>> => {
        return await repository.createChat(data);
    }
}