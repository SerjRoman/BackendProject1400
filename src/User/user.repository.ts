import { Prisma, PrismaClient } from "../generated/prisma";
import { errors, IErrors } from "../tools/error.codes";
import { Result } from '../tools/result'
import { CreateUser, User } from "./user.types";

const client = new PrismaClient();

export const UserRepository = {
    createUser: async function (data: CreateUser): Promise<Result<User>> {
        try {
            const user = await client.user.create({
                data: data
            })
            return { status: 'success', data: user };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code in Object.keys(errors)) {
                    const errorKey: keyof IErrors = error.code;
                    return { status: "error", message: errors[errorKey] };
                }
            }
            return { status: "error", message: 'An unexpected error occurred' };
        }
    },
    findUserById: async function (id: number): Promise<Result<User>> {
        try {
            let user = await client.user.findUnique({
                where: {
                    id: id
                }
            })
            if (user) {
                return { status: 'success', data: user };
            } else {
                return { status: 'error', message: 'User not found' };
            }
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code in Object.keys(errors)) {
                    const errorKey: keyof IErrors = error.code
                    return { status: "error", message: errors[errorKey] };
                }
            }
            return { status: "error", message: 'Failed to fetch user' };
        }
    },
    findUserByEmail: async function (email: string): Promise<Result<User>> {
        try {
            let user = await client.user.findUnique({
                where: {
                    email: email
                }
            })
            if (user) {
                return { status: 'success', data: user };
            } else {
                return { status: 'error', message: 'User not found' };
            }
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code in Object.keys(errors)) {
                    const errorKey: keyof IErrors = error.code
                    return { status: "error", message: errors[errorKey] };
                }
            }
            return { status: "error", message: 'Failed to fetch user' };
        }
    }
}