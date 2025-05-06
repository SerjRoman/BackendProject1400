import { PrismaClient } from "./generated/prisma";

export const prisma = new PrismaClient();

enum PrismaCodes {
	Unique = "P2002", 
	NotExists = "P2017",
}

export function getErrorMessage(errorCode: string) {
	switch (errorCode) {
		case PrismaCodes.Unique:
			return "Don't unique value.";
		case PrismaCodes.NotExists:
			return "User doesn`t exist.";
	}
}
