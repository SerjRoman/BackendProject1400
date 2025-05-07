import { Result } from '../tools/result'
import { compare, hash } from 'bcryptjs';
import { sign } from "jsonwebtoken";
import { SECRET_KEY } from "../tools/token";
import { CreateUser, User } from './user.types';
import { UserRepository } from './user.repository';

export const UserService = {
    login: async function (email: string, password: string): Promise<Result<string>> {
        const result = await UserRepository.findUserByEmail(email);

        if (result.status === 'error') {
            return result;
        }

        const user = result.data;
        const isMatch = await compare(password, user.password);

        if (!isMatch) {
            return { status: 'error', message: 'Password is incorrect!' };
        }

        const token = sign({ id: user.id }, SECRET_KEY, { expiresIn: '1d' });
        return { status: 'success', data: token };
    },

    register: async function (data: CreateUser): Promise<Result<string>> {
        const userResult = await UserRepository.findUserByEmail(data.email);

        if (userResult.status === 'success') {
            return { status: 'error', message: 'User already exists' };
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
        return { status: 'success', data: token };
    },

    getUserById: async function (id: number): Promise<Result<User>> {
        const userResult = await UserRepository.findUserById(id);

        if (userResult.status === 'error') {
            return userResult;
        }

        return { status: 'success', data: userResult.data };
    }
}

