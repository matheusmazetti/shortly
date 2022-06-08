import { connection } from '../database.js';
import bcrypt from 'bcrypt';

export const signup = async (req, res) => {
    let body = req.body;
    try{
        let verify = await connection.query("SELECT * FROM users WHERE email = $1", [body.email]);
        if(verify.rows.length === 0){
            let password = bcrypt.hashSync(body.password, 10);
            await connection.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3)", [body.name, body.email, password]);
            res.sendStatus(201);
        } else {
            res.sendStatus(409);
        }
    } catch(e){
        res.sendStatus(400);
        console.log(e);
    }
}; 