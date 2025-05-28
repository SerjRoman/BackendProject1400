import { PrismaClient, PrismaErrorCodes } from "../client/client";
import { Prisma } from "../generated/prisma";
import { Result, error, success } from "../tools/result";
import { ErrorCodes } from "../types/error-codes";
import { ContactWhereUnique, Contact, CreateContact } from "./contact.types";

export const ContactRepository = {
    getContact: async function (where: ContactWhereUnique): Promise<Result<Contact>> {
        try {
            const contacts = await PrismaClient.contact.findUniqueOrThrow({
                where: where
            })
            return success(contacts)
        } catch (err) {
            if (err instanceof Prisma.PrismaClientKnownRequestError) {
				switch (err.code) {
					case PrismaErrorCodes.NOT_FOUND:
						return error(ErrorCodes.NOT_FOUND);

					default:
						return error(ErrorCodes.UNHANDLED);
				}
			}
			return error(ErrorCodes.UNHANDLED);
        }
    },
    getAllContacts: async function (): Promise<Result<Contact[]>> {
        try {
            const contacts = await PrismaClient.contact.findMany()
            return success(contacts)
        } catch (err) {
            if (err instanceof Prisma.PrismaClientKnownRequestError) {
				switch (err.code) {
					default:
						return error(ErrorCodes.UNHANDLED);
				}
			}
			return error(ErrorCodes.UNHANDLED);
        }
    },
    createContact: async function (data: CreateContact): Promise<Result<Contact>> {
        try {
            const contact = await PrismaClient.contact.create({
                data: data
            })
            return success(contact)
        } catch (err) {
            if (err instanceof Prisma.PrismaClientKnownRequestError) {
				switch (err.code) {
					case PrismaErrorCodes.NOT_FOUND:
						return error(ErrorCodes.NOT_FOUND);

					default:
						return error(ErrorCodes.UNHANDLED);
				}
			}
			return error(ErrorCodes.UNHANDLED);
        }
    }
}