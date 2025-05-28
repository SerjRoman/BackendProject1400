import express, { Express } from "express";
import cors from "cors";
import { UserRouter } from "./User/user.router";
import { ContactRouter } from "./Contacts/contact.router"
import { errorHandlerMiddleware } from "./middleware/errorHandler";
import { config } from "dotenv";

config();

const app: Express = express();
const HOST: string = "localhost";
const PORT: number = 8000;

app.use(express.json());

app.use(cors());

app.use("/users", UserRouter);
app.use("/contact", ContactRouter)

app.use(errorHandlerMiddleware);

app.listen(PORT, HOST, () => {
	console.log(`server is running at http://${HOST}:${PORT}`);
});

// При создании API, для проверки эндпоинтов используем Postman
