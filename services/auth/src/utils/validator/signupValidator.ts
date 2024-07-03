import * as Joi from 'joi'

export const signupValidation = Joi.object({
    name: Joi
        .string()
        .required()
        .alphanum()
        .min(4),
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
        .required()
})