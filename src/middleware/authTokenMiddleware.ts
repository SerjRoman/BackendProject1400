import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { SECRET_KEY } from "../tools/token";


interface IToken{
    iat: number
    exp: number
    id: number
}

export function authTokenMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.json({status: 'error', message: 'authorization required'})
        return
    }

    const [bearer, token] = authHeader.split(" ");

    if (bearer !== "Bearer" || !token) {
        res.json({status: 'error', message: 'authorization is invalid'})
        return
    }

    try {
        const decoded = verify(token, SECRET_KEY) as IToken
        res.locals.userId = decoded.id
        next();

    } catch (error) {
        console.log(error)
        res.json({status: 'error', message: 'token is invalid'})
    }
}