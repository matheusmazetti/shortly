import { connection } from "../database.js";
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';

export const signin = async (req, res) => {
    let body = req.body;
    try{
        let user = await connection.query("select * from users where email = $1", [body.email]);
        if(user.rows.length !== 0 && bcrypt.compareSync(body.password, user.rows[0].password)){
            let token = v4();
            await connection.query('INSERT INTO sessions ("userId", token) VALUES ($1, $2)', [user.rows[0].id, token]);
            res.status(200).send(token);
        } else {
            res.sendStatus(401);
        }
    } catch(e){
        res.sendStatus(500);
        console.log(e);
    }
};