import { InferType } from "yup";
import { Prisma } from "../generated/prisma";
import { UserValidation } from './user.validate'

export type User = Prisma.UserGetPayload<{
    omit: {
        password: true
    }
}>
export type UserWhereUnique = Prisma.UserWhereUniqueInput
// InferType - специальный generic тип из yup, который используется для преобразования схемы yup в тип
// Нужно передать вашу схему и перед схемой использовать typeof
export type UserLogin = InferType<typeof UserValidation.login>