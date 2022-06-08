import { signinSchema } from "../Schemas/signin.js";

export const checkSignin = (req, res, next) => {
    let body = req.body;
    const { error } = signinSchema.validate(body);
    if(!error){
        next();
    } else {
        res.status(422).send(error);
    }
};