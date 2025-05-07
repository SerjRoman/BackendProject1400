import express, { Express } from "express"
import path from "path";
import cors from "cors";
import userRouter from "./User/user.router";

const app: Express = express();
const HOST: string = 'localhost';
const PORT: number = 8000;

app.use(express.json())

app.use('/api/user', userRouter)

app.use(cors({
    origin: ['http://localhost:3000']
}))