import * as yup from "yup";

export const UserValidation = {
	login: yup.object({
		email: yup
			.string()
			.email("Field should be an email")
			.min(5, "Lenght should be more than 5")
			.max(50, "Lenght should be less than 50")
			.required("This field is required"),
		password: yup
			.string()
			.min(6, "Lenght should be more than 6")
			.max(50, "Lenght should be less than 50")
			.required("Field is required"),
	}),
	register: yup.object({
		username: yup
			.string()
			.max(50, "This field should be less than 50")
			.required("This field is required"),
		email: yup
			.string()
			.email("This field should be contain @ and .")
			.required("This field is required"),
		password: yup
			.string()
			.min(5, "This field should be more than 5")
			.max(50, "This field should be less than 50")
			.required("This field is required"),
		name: yup
			.string()
			.max(50, "This field should be less than 50")
			.required("This field is required"),
		surname: yup
			.string()
			.max(50, "This field should be less than 50")
			.required("This field is required"),
	}),
};
