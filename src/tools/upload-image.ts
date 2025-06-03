import { writeFile } from "fs/promises";
import { join } from "path";

interface IUploadImageResult {
	fileName: string;
}

export async function uploadImage(base64: string): Promise<IUploadImageResult> {
	const fileName = `avatar-${Date.now()}.jpeg`;

	const buffer = Buffer.from(base64.replace("data:image/jpeg;base64,", ""), "base64");

	try {
		await writeFile(
			join(__dirname, "../", "../", "./media", `/${fileName}`),
			buffer
		);
	} catch (error) {
		console.log(error);
	}

	return { fileName };
}
