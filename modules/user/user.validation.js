import Joi from "joi";

export const updateSchema  = Joi.object({
    name:Joi.string().required(),
    email:Joi.string().email().required(),
})


export const changePassSchema = Joi.object({
    currentPassword:Joi.string().required(),
    newPassword:Joi.string().required(),
})