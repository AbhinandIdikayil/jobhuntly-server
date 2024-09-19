import * as Joi from 'joi'

export const signupValidation = Joi.object({
    name: Joi
        .string()
        .required()
        .pattern(/^[a-zA-Z\s]+$/, 'letters and spaces only')
        .min(3)
        .messages({
            'string.pattern.name': 'Name can only contain letters and spaces.',
            'string.empty': 'Name is required.',
            'string.min': 'Name should have at least 3 characters.'
        }),
    email: Joi
        .string()
        .required()
        .email(),
    password: Joi
        .string()
        .required()
        .min(4),
    role:Joi
        .string()
})