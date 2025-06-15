import {Server as HttpServer} from "http"
import {Server as SocketServer} from "socket.io"
import { AppClientEvents, AppServerEvents, SocketData } from "./types/socket"
import { socketAuthMiddleware } from "./middleware/authTokenMiddleware"



export function initSocketServer(httpServer: HttpServer){
    const ioServer = new SocketServer<AppClientEvents, AppServerEvents, {}, SocketData>(httpServer)
    ioServer.use(socketAuthMiddleware)


}