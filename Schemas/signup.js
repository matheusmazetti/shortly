import joi from 'joi';

export const signupSchema = joi.object({
    name: joi.string().min(1).required(),
    email: joi.string().pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/).required(),
    password: joi.string().min(1).required(),
    confirmPassword: joi.string().min(1).required()
});