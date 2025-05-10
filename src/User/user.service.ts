import { Result, success } from '../tools/result'
import { compare, hash } from 'bcryptjs';
import { sign } from "jsonwebtoken";
import { SECRET_KEY } from "../tools/token";
import { User, UserLogin, UserRegister, UserWithPassword } from './user.types';
import { UserRepository } from './user.repository';

export const UserService = {
    login: async function (data: UserLogin): Promise<Result<string>> {
        const result = await UserRepository.getUser({email: data.email});

        if (result.status === 'error') {
            return result;
        }

        const user = result.data;
        const isMatch = await compare(data.password, user.password);

        if (!isMatch) {
            return { status: 'error', message: 'Password is incorrect!' };
        }

        const token = sign({ id: user.id }, SECRET_KEY, { expiresIn: '1d' });
        return success(token)
    },

    register: async function (data: UserWithPassword): Promise<Result<string>> {
        const userResult = await UserRepository.getUser({email: data.email});

        if (userResult) {
            return { status: "error", message: "User exists!"};
        }

        const hashedPassword = await hash(data.password, 10);
        const newUserResult = await UserRepository.createUser({
            ...data,
            password: hashedPassword,
        });

        if (newUserResult.status === 'error') {
            return newUserResult
        }

        const token = sign({ id: newUserResult.data.id }, SECRET_KEY, { expiresIn: '7d' });
        return success(token)
    },

    getUserById: async function (data: User): Promise<Result<User>> {
        const userResult = await UserRepository.getUser({id: data.id});

        if (userResult.status === 'error') {
            return userResult;
        }

        return success(userResult.data)
    }
}

