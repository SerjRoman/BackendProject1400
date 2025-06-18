import { Server as HttpServer } from "http";
import { Server as SocketServer } from "socket.io";
import {
	AppClientEvents,
	AppServerEvents,
	AuthenticatedSocket,
	SocketData,
} from "./types/socket";
import { socketAuthMiddleware } from "./middleware/authTokenMiddleware";
import { ChatSocketController } from "./Chat/chat.socket.controller";

export function initSocketServer(httpServer: HttpServer) {
	const ioServer = new SocketServer<
		AppClientEvents,
		AppServerEvents,
		{},
		SocketData
	>(httpServer);
	ioServer.use(socketAuthMiddleware);

	ioServer.on("connection", (socket: AuthenticatedSocket) => {
		ChatSocketController.registerControllers(socket);
	});
}
