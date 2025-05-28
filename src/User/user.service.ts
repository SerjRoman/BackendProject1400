import {
	UserLogin,
	UserRegister,
	UserWhereUnique,
	UserOmit,
	UserWithoutPassword,
} from "./user.types";
import { UserRepository } from "./user.repository";
import { error, Result, success } from "../tools/result";
import { compare, hash } from "bcryptjs";
import { ErrorCodes } from "../types/error-codes";
import { SECRET_KEY } from "../config/config";
import { sign } from "jsonwebtoken";

export const UserService = {
	login: async function (data: UserLogin): Promise<Result<string>> {
		const result = await UserRepository.getUser({ email: data.email });
		if (result.status === "error") {
			return result;
		}

		const isMatch = await compare(data.password, result.data.password);
		if (!isMatch) {
			return error(ErrorCodes.UNAUTHORIZED);
		}
		const token = sign({ id: result.data.id }, SECRET_KEY, {
			expiresIn: "7d",
		});
		return success(token);
	},
	register: async function (data: UserRegister): Promise<Result<string>> {
		const resultByEmail = await UserRepository.getUser({
			email: data.email,
		});
		if (resultByEmail.status === "success") {
			return error(ErrorCodes.EXISTS);
		}

		const hashedPassword = await hash(data.password, 10);
		const hashedData = {
			...data,
			password: hashedPassword,
		};

		const user = await UserRepository.createUser(hashedData);
		if (user.status === "error") {
			return user;
		}

		const token = sign({ id: user.data.id }, SECRET_KEY, {
			expiresIn: "7d",
		});
		return success(token);
	},
	getMe: async function (id: number): Promise<Result<UserWithoutPassword>> {
		const result = await UserRepository.getUser(
			{ id: id },
			{ password: true }
		);
		return result;
	},
	getUserByUsername: async function (username: string): Promise<Result<UserWithoutPassword>> {
		const result = await UserRepository.getUser({username},
			{ password: true }
		)
		return result;
	}
};
