import express, { Express } from "express";
import cors from "cors";
import { UserRouter } from "./User/user.router";
import { errorHandlerMiddleware } from "./middleware/errorHandler";
import { config } from "dotenv";
import { join } from "path";
import { createServer } from "http";
import { initSocketServer } from "./socket";
import { ContactRouter } from "./Contacts/contact.router";

config();

const app: Express = express();
const httpServer = createServer(app)

initSocketServer(httpServer)

const HOST: string = "localhost";
const PORT: number = 8001;

app.use(express.json({limit: '20mb'}));

app.use(cors());

app.use("/media/", express.static((join(__dirname, '../', '/media'))))

app.use("/api/users", UserRouter);
app.use("/api/contacts", ContactRouter);

app.use(errorHandlerMiddleware);

httpServer.listen(PORT, HOST, () => {
	console.log(`server is running at http://${HOST}:${PORT}`);
});

// При создании API, для проверки эндпоинтов используем Postman
