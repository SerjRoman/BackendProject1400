import * as yup from "yup";

export const UserValidation = {
	login: yup.object({
		email: yup
			.string()
			.email("Field should be an email")
			.min(5, "Lenght should be more than 5")
			.max(50, "Lenght should be less than 50")
			.required(),
		password: yup
			.string()
			.min(6, "Lenght should be more than 6")
			.max(50, "Lenght should be less than 50")
			.required("Field is required"),
	}),
};
