import { Request, Response, NextFunction } from "express";
import { UserRepository } from "./user.repository";
import { Result } from "../tools/result";
import { User } from "./user.types";

export const UserService = {
	login: async function(email: string, password: string): Promise<Result<User>> {
		const user = await UserRepository.findUserByEmail(email);

		if (!user) {
			return { status: "error", message: "User not found." };
		}

		if (typeof user === "string") {
			return { status: "error", message: "Something wrong." };
		}

		return { status: "success", data: user };
	},

	register: async function(userData: User): Promise<Result<User>> {
		const user = await UserRepository.findUserByEmail(userData.email);

		if (user) {
			return { status: "error", message: "User exists" };
		}

		if (typeof user === "string") {
			return { status: "error", message: "Something wrong" };
		}

		if (!user) {
			return {
				status: "error",
				message: "User wasn`t created successfully",
			};
		}

		return { status: "success", data: user };
	},

	user: async function(id: number): Promise<Result<User>> {
		const user = await UserRepository.findUserById(id);

		if (!user) {
			return { status: "error", message: "User wasn't found" };
		}
		if (typeof user === "string") {
			return { status: "error", message: user };
		}
		return { status: "success", data: user };
	},
};
