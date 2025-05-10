import { PrismaClient as PC } from "../generated/prisma";

export const PrismaClient = new PC()

export enum PrismaErrorCodes {
    UNIQUE = "P2002",
    NOT_FOUND = "P2025"
}
