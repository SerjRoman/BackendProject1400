import { NextFunction, Request, Response } from 'express'
import { UserService } from './user.service'

export const UserController = {
    login: async function (req: Request, res: Response, next: NextFunction) {
        const data = req.body
        const result = await UserService.login({email: data.email,  password: data.password})
        if (result.status === 'error') {
            return next({ status: "error", message: "Could not log in!" });
        }
        res.json(result)
    },
    register: async function (req: Request, res: Response, next: NextFunction) {
        const data = req.body
        const result = await UserService.register(data)
        if (result.status === 'error') {
            return next({ status: "error", message: "Could not registration!" });
        }
        res.json(result)
    },
    getUserById: async function (req: Request, res: Response, next: NextFunction) {
        const id = res.locals.userId
        const result = await UserService.getUserById(id)
        if (result.status === 'error') {
            return next({ status: "error", message: "Could not find user!" });
        }
        res.json(result)
    }

}