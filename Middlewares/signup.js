import { signupSchema } from "../Schemas/signup.js";

export const checkSignup = (req, res, next) => {
    let body = req.body;
    const { error } = signupSchema.validate(body);
    if(!error){
        next();
    } else {
        res.status(422).send(error);
    }
};