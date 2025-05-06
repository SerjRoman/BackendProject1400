import { NextFunction, Request, Response } from 'express'
import { UserService } from "./user.service"

export const UserController = {
    login: async function(req: Request, res: Response, next: NextFunction){
        const data = req.body
        const user = await UserService.login(data.email ,data.password)
        if (user.status === "error"){
            next()
        }
    },

    register: async (req: Request, res: Response, next: NextFunction) => {
        const data = req.body
        const user = await UserService.register(data)
        if (user.status === "error"){
            next()
        }
    },

    user: async (req: Request, res: Response, next: NextFunction) => {
        // ya ustal boss u menya eshe proekt on nikolaya😭
    }
}
