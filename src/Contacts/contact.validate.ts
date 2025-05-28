import * as yup from "yup";

export const ContactValidation = {
    contact: yup.object({
        localName: yup
            .string()
            .min(5, "Length should be more than 5")
            .max(50, "Length should be less than 50")
            .required(),
        name: yup
            .string()
            .required()
            .min(5, "Length should be more than 5")
            .max(50, "Length should be less than 50"),
        surname: yup
            .string()
            .min(5, "Length should be more than 5")
            .max(50, "Length should be less than 50")
            .optional(),
        avatar: yup
            .string()
            .url()
            .optional()
            .nullable(),
    })
}