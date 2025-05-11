import * as yup from "yup";

export const UserValidation = {
	login: yup.object({
		email: yup
			.string()
			.email("Field should be an email")
			.min(5, "Length should be more than 5")
			.max(50, "Length should be less than 50")
			.required(),
		password: yup
			.string()
			.min(6, "Length should be more than 6")
			.max(50, "Length should be less than 50")
			.required("Field is required"),
	}),
	register: yup.object({
		email: yup
			.string()
			.email("Field should be an email")
			.min(5, "Length should be more than 5")
			.max(50, "Length should be less than 50")
			.required(),
		password: yup
			.string()
			.min(6, "Length should be more than 6")
			.max(50, "Length should be less than 50")
			.required("Field is required"),
		username: yup
			.string()
			.min(6, "Length should be more than 6")
			.max(50, "Length should be less than 50")
			.required("Field is required"),
		name: yup
			.string()
			.min(6, "Length should be more than 6")
			.max(50, "Length should be less than 50")
			.required("Field is required"),
		surname: yup
			.string()
			.min(6, "Length should be more than 6")
			.max(50, "Length should be less than 50")
			.required("Field is required"),
		avatar: yup
			.string()
			.required("Field is required"),
	}),
};
