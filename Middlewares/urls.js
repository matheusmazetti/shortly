import { urlsSchema } from "../Schemas/urls.js";

export const checkShort = (req, res, next) => {
    let body = req.body;
    const { error } = urlsSchema.validate(body);
    if(!error){
        next();
    } else {
        res.status(422).send(error);
    }
};
