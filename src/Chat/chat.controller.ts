import {Request, Response, NextFunction} from 'express';
import {service} from './chat.service';

export const controller = {
    getChat: async (req: Request, res: Response, next: NextFunction) => {
        const chat = service.getChat(+req.params.id);
        if (chat.status == "error"){
            next(chat);
            return;
        }

        res.json(chat);
    },
    createChat: async (req: Request, res: Response, next: NextFunction) => {
        const chat = service.createChat(req.body);
        if (chat.status == "error"){
            next(chat);
            return;
        }

        res.json(chat);
    }
}